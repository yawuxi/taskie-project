//react
import React from 'react';
//rtk
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { setIsRegistered } from "../../slices/auth-methods-slice";
//formik+yup
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
//components
import Components from "../../../../components";
//styles
import './LoginForm.scss'

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const {loginMethod} = useAppSelector(state => state.authMethodsSlice)

  return (
    <div className="login-form">
      <h1 className="authentication-page__title">Login</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Please enter a correct email').required('email is required'),
          password: Yup.string().min(6, 'Please enter minimum 6 characters').required('password is required'),
        })}
        onSubmit={({email,password}) => {
          loginMethod(email, password)
        }}>
        {({errors, touched, resetForm}) => (
          <Form>
            {errors.email && touched.email ?
              <div className="authentication-page__error">{errors.email}</div> : null}
            <Field type="email" placeholder="Your email" name="email" />
            {errors.password && touched.password ?
              <div className="authentication-page__error">{errors.password}</div> : null}
            <Field type="password" placeholder="Your password" name="password" />
            <Components.Button text="Login" type="submit" styles={{'marginBottom': '1.25rem'}} />
            <div className="authentication-page__login">
              Dont have an account?
              <button
                type="button"
                onClick={() => {
                  dispatch(setIsRegistered())
                  resetForm()
                }}>
                Registration
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export { LoginForm };
