//react
import React from 'react';
//rtk
import { useAppSelector } from "../../../hooks/hooks";
//firebase
import FirebaseConfig from "../../../firebase/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
//components
import Components from "../../../components";
import { RegistrationForm } from "../components/RegistrationForm/RegistrationForm";
import { LoginForm } from "../components/LoginForm/LoginForm";
//styles
import './AuthenticationPage.scss'

const AuthenticationPage: React.FC = () => {
  const {isRegistered} = useAppSelector(state => state.authMethodsSlice)
  const [user,userLoading, userError]=useAuthState(FirebaseConfig.firebaseAUTH)

  if (userLoading) {
    return <Components.Loader />
  }

  return (
    <div className="authentication-page">
      {!isRegistered
        ?
        <RegistrationForm />
        :
        <LoginForm />
      }
    </div>
  );
};

export { AuthenticationPage };
