//react
import React from 'react';
//styles
import './Loader.scss'

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <div className="loader__animation"></div>
    </div>
  );
};

export { Loader };
