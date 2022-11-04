import React from "react";
import { nanoid } from "nanoid";
import { useAppSelector } from "app/hooks";
import { Navigate } from "react-router-dom";
// Icons
import { ReactComponent as LoginArrow } from "icons/login-arrow.svg";
import { BsArrowRightShort as ArrowRight } from "react-icons/bs";
import styles from "./Login.module.css";
const {
  REACT_APP_CLIENT_ID: CLIENT_ID,
  REACT_APP_REDIRECT_URI: REDIRECT_URI,
  REACT_APP_VERCEL_URL: VERCEL_URL,
} = process.env;

function Login() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const handleClick = async () => {
    const state = nanoid(16);

    const generated =
      "https://accounts.spotify.com/authorize?" +
      new URLSearchParams({
        response_type: "code",
        client_id: String(CLIENT_ID),
        scope:
          "user-read-private user-read-email user-library-read user-library-modify",
        redirect_uri: REDIRECT_URI
          ? String(REDIRECT_URI)
          : `${VERCEL_URL}/authorize`,
        state,
      });

    await localStorage.setItem("state", state);

    window.location.replace(generated);
  };

  if (isLoggedIn) return <Navigate to="/" />;

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
        <span onClick={handleClick} className={styles["login-text"]}>
          Inicia sesion con Spotify <ArrowRight />
        </span>
      </div>
    </div>
  );
}

export default Login;
