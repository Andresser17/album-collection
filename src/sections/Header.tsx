import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Icons
import { BsBoxArrowRight as ExitArrow } from "react-icons/bs";
import { FiSun, FiMoon } from "react-icons/fi";
import styles from "./Header.module.css";

function ToggleMode() {
  const [theme, setTheme] = useState<string | null>("");

  const handleClick = (mode: string) => {
    if (mode === "light") {
      document.documentElement.classList.replace("dark", mode);
    } else document.documentElement.classList.replace("light", mode);

    localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  useEffect(() => {
    const mode = localStorage.getItem("theme");
    setTheme(mode);
  }, []);

  return theme === "dark" ? (
    <FiSun
      onClick={(e) => handleClick("light")}
      className={styles["mode-icon"]}
    />
  ) : (
    <FiMoon
      onClick={(e) => handleClick("dark")}
      className={styles["mode-icon"]}
    />
  );
}

function CloseSession() {
  const handleClick = async () => {
    await localStorage.removeItem("spotify.access");
    await localStorage.removeItem("state");

    window.location.replace("/login");
  };

  return (
    <div className={styles["close-session-cont"]}>
      <ExitArrow className={styles["close-session-icon"]} />
      <span onClick={handleClick} className={styles["close-session"]}>
        Cerrar Sesion
      </span>
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
