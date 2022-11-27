//react
import React from 'react';
//rtk
import { useAppSelector } from "../../hooks/hooks";
//firebase
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import firebaseConfig from "../../firebase/firebase.config";
//additional
import { setIcon } from "../../features/projects-table";
//types
import { iProjectsColumnTypes } from "../../features/projects-table/types/projects-column-types";
//styles
import './MainInfo.scss'

const MainInfo: React.FC = () => {
  const {uuid} = useAppSelector(state => state.userSlice)
  const [data, dataLoading, dataError] = useDocumentData(doc(firebaseConfig.firestoreDB, 'users', uuid))

  if (dataLoading) {
    return null
  }

  return (
    <div className="main-info">
      <ul className="main-info__list">
        {
          data?.columns.map((column: iProjectsColumnTypes) => (
            <li className="main-info__item" key={column.id}>
              <span>{setIcon(column.columnType)}</span>
              <div>
                <h3 className="main-info__title">{column.title}:</h3>
                <span className="main-info__value">{column.projectTasksList.length}</span>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export { MainInfo };
