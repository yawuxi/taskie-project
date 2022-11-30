//react
import React from 'react';
//rtk
import { useAppSelector } from "../../hooks/hooks";
//components
import Components from "../../components";
//styles
import './Home.scss'

const Home: React.FC = () => {
  const {columns} = useAppSelector(state => state.userSlice)

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
