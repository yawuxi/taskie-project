//react
import React from 'react';
//styles
import './Button.scss'

interface iButtonProps {
  text: string,
  type?: 'button' | 'submit' | 'reset',
  styles?: object,
  clickFunction?: (e: React.MouseEvent) => void,
}

const Button: React.FC<iButtonProps> = ({
                                          text = '',
                                          type = 'button',
                                          styles = {},
                                          clickFunction = (e) => {
                                          },
                                        }) => {
  return <button
    className="common-button"
    type={type}
    style={styles}
    onClick={clickFunction}
  >{text}</button>;
};

export { Button };
