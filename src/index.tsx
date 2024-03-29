import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage";
import Authorize from "routes/Authorize";
import Login from "routes/Login";
import Search from "routes/Search";
import ArtistDetails from "routes/ArtistDetails";
import UserAlbums from "routes/UserAlbums";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Search />,
      },
      {
        path: "/artist/:id",
        element: <ArtistDetails />,
      },
      {
        path: "/my-albums",
        element: <UserAlbums />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/authorize",
    element: <Authorize />,
  },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
