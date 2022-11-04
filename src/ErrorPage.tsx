import { useRouteError } from "react-router-dom";
import styles from "./ErrorPage.module.css"

export default function ErrorPage() {
  const error = useRouteError() as {
    status: number;
    statusText: string;
    data: any;
  };

  return (
    <div className={styles.container} id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className={styles["error-message"]}>
          {error.status} {error.statusText}
      </p>
    </div>
  );
}
