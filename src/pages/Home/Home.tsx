//react
import React, { useEffect } from 'react';
//rtk
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { iUserSlice, setAllData } from "../../app/user-slice";
//firebase
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import FirebaseConfig from "../../firebase/firebase.config";
//components
import Components from "../../components";
//styles
import './Home.scss'

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const {uuid, columns} = useAppSelector(state => state.userSlice)
  const [userData, userDataLoading] = useDocumentData(doc(FirebaseConfig.firestoreDB, 'users', uuid))

  //posting data from firestore to local global storage
  useEffect(() => {
    if (userData) {
      dispatch(setAllData(userData as iUserSlice))
    }
  }, [userData])

  if (userDataLoading) {
    return <Components.Loader />
  }

  return (
    <div className="home">
      <Components.MainInfo />
      <div className="home__charts">
        <Components.DoughnutChart columns={columns} />
        <Components.LineChart columns={columns} />
      </div>
    </div>
  );
};

export { Home };
