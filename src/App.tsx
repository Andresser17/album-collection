import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "app/hooks";
// Sections
import Header from "sections/Header";
import styles from "./App.module.css";

function App() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  if (!isLoggedIn) return <Navigate to="/login" />;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
