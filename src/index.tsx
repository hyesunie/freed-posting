import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home, { loader as homeLoader } from './pages/Home';
import ErrorPage from './pages/error-page';
import Root, { loader as rootLoader } from './pages/root';
import { PostsProvider } from './app/store';

export declare type Params<Key extends string = string> = {
  readonly [key in Key]: string | undefined;
};
export interface LoaderFunctionArgs {
  request?: Request;
  params?: Params;
}

export interface PostInfo {
  id: string;
  title: string;
  createDate: Date;
  modifyDate?: Date;
  imgLink?: string;
  tagList?: string[];
  note?: string;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: `posting/:pageId`,
        element: <Home />,
        loader: homeLoader,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <PostsProvider>
    <RouterProvider router={router} />
  </PostsProvider>
);
