//react
import React from 'react';
//rtk
import { useAppDispatch } from "../../../../hooks/hooks";
import { setIsOpen } from "../../slice/burger-slice";
//styles
import './Burger.scss'

const Burger: React.FC = () => {
  const dispatch = useAppDispatch()

  return (
    <div className="burger-menu" onClick={() => dispatch(setIsOpen())}>
      <div></div>
    </div>
  );
};

export { Burger };
