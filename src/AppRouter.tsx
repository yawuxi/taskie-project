//react
import React from 'react';
//rtk
import { useAppDispatch } from "./hooks/hooks";
import { setUUID } from "./app/user-slice";
//firebase
import FirebaseConfig from "./firebase/firebase.config";
import { useAuthState } from 'react-firebase-hooks/auth'
//router
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes";
import { Navigate, Route, Routes } from "react-router-dom";
//components
import Layout from "./layout";
import Components from "./components";

const AppRouter = () => {
  const dispatch = useAppDispatch()
  const [user, userLoading] = useAuthState(FirebaseConfig.firebaseAUTH)

  if (userLoading) {
    return <Components.Loader />
  }

  if (user) {
    //put uuid to the redux storage
    dispatch(setUUID(user.uid))

    return (
      <>
        <Layout.Sidebar />
        <main>
          <Layout.Header />
          <Layout.AddTaskModal />
          <Routes>
            {
              PRIVATE_ROUTES.map(({path, element}) => (
                <Route path={path} element={element} key={path} />
              ))
            }
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </main>
      </>
    )
  } else {
    return (
      <Routes>
        {
          PUBLIC_ROUTES.map(({path, element}) => (
            <Route path={path} element={element} key={path} />
          ))
        }
        <Route path="*" element={<Navigate to="/authentication" />} />
      </Routes>
    )
  }
};

export { AppRouter };
