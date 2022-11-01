import React from "react";
// Icons
import { ReactComponent as LoginArrow } from "icons/login-arrow.svg";
import { BsArrowRightShort as ArrowRight } from "react-icons/bs";
import styles from "./Login.module.css";

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles["arrow-cont"]}>
        <LoginArrow className={styles.arrow} />
      </div>
      <div className={styles["text-cont"]}>
        <p className={styles.title}>
          Disfruta de la <strong>mejor música</strong>
        </p>
        <p className={styles.subtitle}>
          Accede a tu cuenta para guardar tus albumes favoritos
        </p>
        <p className={styles["login-text"]}>
          Inicia sesion con Spotify <ArrowRight />
        </p>
      </div>
    </div>
  );
}

export default Login;
