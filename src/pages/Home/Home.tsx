//react
import React from 'react';
//rtk
import { iUserSlice } from "../../app/user-slice";
//components
import Components from "../../components";
//styles
import './Home.scss'

const Home: React.FC = () => {
  // if (dataLoading) {
  //   return <Components.Loader />
  // }

  return (
    <div className="home">
      <Components.MainInfo />
      <div className="home__charts">
        {/*<Components.DoughnutChart data={data!} />*/}
        {/*<Components.LineChart data={data! as iUserSlice} />*/}
      </div>
    </div>
  );
};

export { Home };
