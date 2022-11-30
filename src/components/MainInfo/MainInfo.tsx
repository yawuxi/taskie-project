//react
import React from 'react';
//rtk
import { useAppSelector } from "../../hooks/hooks";
//additional
import { setIcon } from "../../features/projects-table";
//types
import { iProjectsColumnTypes } from "../../features/projects-table/types/projects-column-types";
//styles
import './MainInfo.scss'

const MainInfo: React.FC = () => {
  const {uuid} = useAppSelector(state => state.userSlice)

  return (
    <div className="main-info">
      <ul className="main-info__list">
            {/*<li className="main-info__item" key={column.id}>*/}
            {/*  <span>{setIcon(column.columnType)}</span>*/}
            {/*  <div>*/}
            {/*    <h3 className="main-info__title">{column.title}:</h3>*/}
            {/*    <span className="main-info__value">{column.projectTasksList.length}</span>*/}
            {/*  </div>*/}
            {/*</li>*/}
      </ul>
    </div>
  );
};

export { MainInfo };
