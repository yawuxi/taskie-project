//react
import React from 'react';
//rtk
import { iUserSlice } from "../../app/user-slice";
//firebase
import { useAppSelector } from "../../hooks/hooks";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import FirebaseConfig from "../../firebase/firebase.config";
//components
import Components from "../../components";
//styles
import './Home.scss'

const Home: React.FC = () => {
  const {uuid} = useAppSelector(state => state.userSlice)
  const [data, dataLoading] = useDocumentData(doc(FirebaseConfig.firestoreDB, 'users', uuid))

  if (dataLoading) {
    return <Components.Loader />
  }

  return (
    <div className="home">
      <Components.MainInfo />
      <div className="home__charts">
        <Components.DoughnutChart data={data!} />
        <Components.LineChart data={data! as iUserSlice} />
      </div>
    </div>
  );
};

export { Home };
