//react
import React from 'react';
//router
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes";
import { Navigate, Route, Routes } from "react-router-dom";
//components
import Layout from "./layout";
import { AppConnector } from "./AppConnector";

const AppRouter = ({user}: { user: any }) => {
  if (user) {
    return (
      <>
        <AppConnector />
        <Layout.Sidebar />
        <main>
          <Layout.Header />
          <Layout.AddTaskModal />
          <Routes>
            {
              PRIVATE_ROUTES.map(({path, element}) => (
                <Route path={path} element={element} key={path} />
              ))
            }
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </main>
      </>
    )
  } else {
    return (
      <Routes>
        {
          PUBLIC_ROUTES.map(({path, element}) => (
            <Route path={path} element={element} key={path} />
          ))
        }
        <Route path="*" element={<Navigate to="/authentication" />} />
      </Routes>
    )
  }
};

export { AppRouter };
