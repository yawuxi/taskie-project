//react
import React from 'react';
//rtk
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { setIsRegistered } from "../../slices/auth-methods-slice";
//formik+yup
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
//components
import Components from "../../../../components";
//styles
import './RegistrationForm.scss'

const RegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const {registrationMethod} = useAppSelector(state => state.authMethodsSlice)

  return (
    <div className="registration-form">
      <h1 className="authentication-page__title">Registration</h1>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().min(2, 'Please enter minimum 2 characters').required('name is required'),
          email: Yup.string().email('Please enter a correct email').required('email is required'),
          password: Yup.string().min(6, 'Please enter minimum 6 characters').required('password is required'),
        })}
        onSubmit={({email, name, password}) => {
          registrationMethod(email, password, name)
        }}>
        {({errors, touched, resetForm}) => (
          <Form>
            {errors.name && touched.name ? <div className="authentication-page__error">{errors.name}</div> : null}
            <Field type="text" placeholder="Your name" name="name" />
            {errors.email && touched.email ?
              <div className="authentication-page__error">{errors.email}</div> : null}
            <Field type="email" placeholder="Your email" name="email" />
            {errors.password && touched.password ?
              <div className="authentication-page__error">{errors.password}</div> : null}
            <Field type="password" placeholder="Your password" name="password" />
            <Components.Button text="Register" type="submit" styles={{'marginBottom': '1.25rem'}} />
            <div className="authentication-page__login">
              Already registered?
              <button
                type="button"
                onClick={() => {
                  dispatch(setIsRegistered())
                  resetForm()
                }}>
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export { RegistrationForm };
