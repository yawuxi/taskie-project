//react
import React, { useEffect, useState } from 'react';
//rtk
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { setAvatar } from "../../app/user-slice";
import { Dispatch } from "@reduxjs/toolkit";
//firebase
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc, setDoc } from 'firebase/firestore';
import firebaseConfig from "../../firebase/firebase.config";
import { ref, uploadBytes } from 'firebase/storage';
//formik + yup
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
//components
import Components from "../../components";
//styles
import './Settings.scss';

const loadAvatarToStorage = (
  avatar: File,
  uuid: string,
  dispatch: Dispatch,
) => {
  uploadBytes(ref(firebaseConfig.firebaseSTORAGE, `user-images/${uuid}/avatar`), avatar)
    .then((snapshot) => {
      //after uploading avatar on firebase storage,
      //updating state for update UserInfo component
      dispatch(setAvatar(avatar))
    });
}

const Settings: React.FC = () => {
  const dispatch = useAppDispatch()
  const [file, setFile] = useState<null | File>(null)
  const {uuid} = useAppSelector(state => state.userSlice)
  const {generateTestData} = useAppSelector(state => state.authMethodsSlice)
  const [data, dataLoading, dataError] = useDocumentData(doc(firebaseConfig.firestoreDB, 'users', uuid))

  //uploading avatar when user load him
  useEffect(() => {
    if (file !== null) {
      loadAvatarToStorage(file, uuid, dispatch)
    } else {
      console.log('file is null!')
    }

  }, [file])

  return (
    <div className="settings-page">
      <h2 className="settings-page__title">Settings</h2>
      <Formik
        initialValues={{
          name: '',
          position: '',
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().min(2, 'Please enter minimum 2 characters'),
          position: Yup.string().min(2, 'Please enter minimum 2 characters'),
        })}
        onSubmit={({name, position}, formikHelpers) => {
          if (name !== '') {
            setDoc(doc(firebaseConfig.firestoreDB, 'users', uuid), {
              displayName: name,
            }, {merge: true})
            formikHelpers.resetForm()
          }

          if (position !== '') {
            setDoc(doc(firebaseConfig.firestoreDB, 'users', uuid), {
              displayPosition: position,
            }, {merge: true})
            formikHelpers.resetForm()
          }
        }}>
        {({errors, touched}) => (
          <Form>
            <div>
              {errors.name && touched.name ? <div className="authentication-page__error">{errors.name}</div> : null}
              <h3 className="settings-page__input-title">Your name</h3>
              <Field name="name" type="text" placeholder={data?.displayName} />
            </div>
            <div>
              {errors.position && touched.position ?
                <div className="authentication-page__error">{errors.position}</div> : null}
              <h3 className="settings-page__input-title">Your position</h3>
              <Field name="position" type="text" placeholder={data?.displayPosition} />
            </div>
            <div>
              <h3 className="settings-page__input-title">Your avatar</h3>
              <label>
                <input type="file" onChange={e => {
                  setFile(e.target.files![0])
                }} />
                <span className="common-input__file-upload">{file?.name || 'Upload your avatar'}</span>
              </label>
            </div>
            <Components.Button
              text="Save settings"
              type="submit"
              styles={{'marginBottom': '1.25rem'}}
            />
            <button onClick={() => generateTestData(uuid)}>Generate test data</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export { Settings };
