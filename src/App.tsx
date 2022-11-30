//react
import React from 'react';
//rtk
import { useAppDispatch } from "./hooks/hooks";
import { setUUID } from "./app/user-slice";
//firebase
import { useAuthState } from "react-firebase-hooks/auth";
import FirebaseConfig from "./firebase/firebase.config";
//components
import { AppRouter } from "./AppRouter";
import Components from "./components";
//styles
import './App.scss'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const [user, userLoading] = useAuthState(FirebaseConfig.firebaseAUTH)

  if (userLoading) {
    return <Components.Loader />
  }

  //put uuid to the redux storage
  if (user) {
    dispatch(setUUID(user.uid))
  }

  return (
    <div className="app" data-color-theme="dark">
      <AppRouter user={user}/>
    </div>
  );
};

export { App };
