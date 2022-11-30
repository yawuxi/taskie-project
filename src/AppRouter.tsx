//react
import React, { useEffect } from 'react';
//rtk
import { iUserSlice, setAllData } from "./app/user-slice";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
//firebase
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import FirebaseConfig from "./firebase/firebase.config";
//router
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes";
import { Navigate, Route, Routes } from "react-router-dom";
//components
import Layout from "./layout";

const AppRouter = ({user}: { user: any }) => {
  const {uuid} = useAppSelector(state => state.userSlice)
  const dispatch = useAppDispatch()
  const [userData] = useDocumentData(doc(FirebaseConfig.firestoreDB, 'users', uuid))

  //posting data from firestore to local global storage
  useEffect(() => {
    if (userData) {
      dispatch(setAllData(userData as iUserSlice))
    }
  }, [userData])

  if (user) {
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
