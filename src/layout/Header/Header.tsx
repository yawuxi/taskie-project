//react
import React from 'react';
//components
import Components from "../../components";
import { Burger } from "../../features/burger-menu";
//styles
import './Header.scss'

const Header: React.FC = () => {

  return (
    <div className="header">
      <div className="header__pc">
        <Components.SearchInput />
        <Burger />
        <Components.UserInfo />
      </div>
      <div className="header__mobile">
        <Components.SearchInput />
        <div className="header__mobile--bottom">
          <Burger />
          <Components.UserInfo />
        </div>
      </div>
    </div>
  );
};

export { Header };
