import React from "react";
import { Link } from "react-router-dom";
// Icons
import { BsBoxArrowRight as ExitArrow } from "react-icons/bs";
import { FiSun, FiMoon } from "react-icons/fi";
import styles from "./Header.module.css";

function ToggleMode() {
  return <FiSun className={styles["mode-icon"]} />;
}

function CloseSession() {
  return (
    <div className={styles["close-session-cont"]}>
      <ExitArrow className={styles["close-session-icon"]} />
      <span className={styles["close-session"]}>Cerrar Sesion</span>
    </div>
  );
}

function Header() {
  return (
    <header className={styles.container}>
      <Link to="/" className={styles["nav-link"]}>
        Buscar
      </Link>
      <Link to="my-albums" className={styles["nav-link"]}>
        Mis Albumes
      </Link>
      <CloseSession />
      <ToggleMode />
    </header>
  );
}

export default Header;
