//react
import React from 'react';
//rtk
import { useAppDispatch } from "./hooks/hooks";
import { setUUID } from "./app/user-slice";
import { AppRouter } from "./AppRouter";
//firebase
import { useAuthState } from "react-firebase-hooks/auth";
import FirebaseConfig from "./firebase/firebase.config";
import Components from "./components";
//styles
import './App.scss'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const [user, userLoading] = useAuthState(FirebaseConfig.firebaseAUTH)

  //put uuid to the redux storage
  if (user) {
    dispatch(setUUID(user.uid))
  }

  return (
    <div className="app" data-color-theme="dark">
      {userLoading ? <Components.Loader /> : <AppRouter user={user} />}
    </div>
  );
};

export { App };
