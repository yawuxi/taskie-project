//react
import React, { useEffect } from 'react';
//rtk
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { iUserSlice, setAllData } from "./app/user-slice";
//firebase
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import FirebaseConfig from "./firebase/firebase.config";

const AppConnector: React.FC = () => {
  const {uuid} = useAppSelector(state => state.userSlice)
  const dispatch = useAppDispatch()
  const [userData] = useDocumentData(doc(FirebaseConfig.firestoreDB, 'users', uuid))

  //posting data from firestore to local global storage
  useEffect(() => {
    if (userData) {
      dispatch(setAllData(userData as iUserSlice))
    }
  }, [userData])

  return null;
};

export { AppConnector };
