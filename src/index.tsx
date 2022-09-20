import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
// import App from './App';
import Home, { loader as homeLoader } from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    loader: homeLoader,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
