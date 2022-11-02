import React from "react";
import { Outlet } from "react-router-dom";
// Sections
import Header from "sections/Header";
import styles from "./App.module.css";

function App() {
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
