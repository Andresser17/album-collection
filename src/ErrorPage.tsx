import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as {
    status: number;
    statusText: string;
    data: any;
  };

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {error.status} {error.statusText}
        </i>
      </p>
    </div>
  );
}
