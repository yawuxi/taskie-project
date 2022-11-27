//react
import React, { useState } from 'react';
//styles
import './Input.scss'

function getFileName(e: any, setState: React.Dispatch<React.SetStateAction<string>>) {
  setState(e.target.files[0].name)
}

const Input: React.FC<{
  title?: string,
  type?: string,
  placeholder?: string,
  style?: object
}> = ({
        title,
        type = 'text',
        placeholder = '',
        style = {},
      }) => {
  const [fileName, setFileName] = useState('');

  //input type file
  if (type === 'file') {
    return (
      <div className="common-input">
        {title ? <h3 className="common-input__title">{title}</h3> : null}
        <label>
          <input type={type} onChange={e => getFileName(e, setFileName)} />
          <span className="common-input__file-upload">{fileName || placeholder}</span>
        </label>
      </div>
    )
  }

  //default input
  return (
    <div className="common-input">
      {title ? <h3 className="common-input__title">{title}</h3> : null}
      <input type={type} placeholder={placeholder} style={style} />
    </div>
  )
};

export { Input };
