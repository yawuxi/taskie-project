//react
import React from 'react';
//styles
import './Button.scss'

interface iButtonProps {
  text: string,
  classDefine?: string,
  type?: 'button' | 'submit' | 'reset',
  styles?: object,
  clickFunction?: (e: React.MouseEvent) => void,
}

const Button: React.FC<iButtonProps> = ({
                                          text = '',
                                          classDefine = '',
                                          type = 'button',
                                          styles = {},
                                          clickFunction = (e) => {
                                          },
                                        }) => {
  return <button
    className={'common-button ' + classDefine}
    type={type}
    style={styles}
    onClick={clickFunction}
  >{text}</button>;
};

export { Button };
