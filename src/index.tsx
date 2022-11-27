//react
import React from 'react'
import ReactDOM from 'react-dom/client'
//rtk
import { Provider } from "react-redux";
import { store } from "./app/store";
//firebase
import { Firebase } from "./firebase/Firebase";
//additional
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from 'notistack'
//components
import { App } from './App'
//styles
import './index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider>
          <Firebase />
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>
)
