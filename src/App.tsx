//react
import React from 'react';
//components
import { AppRouter } from "./AppRouter";
//styles
import './App.scss'

const App: React.FC = () => {
  return (
    <div className="app" data-color-theme="dark">
      <AppRouter />
    </div>
  );
};

export { App };
