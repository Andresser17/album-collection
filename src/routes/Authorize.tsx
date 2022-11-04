import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import { login } from "app/authSlice";
const {
  REACT_APP_CLIENT_ID: CLIENT_ID,
  REACT_APP_CLIENT_SECRET: CLIENT_SECRET,
  REACT_APP_REDIRECT_URI: REDIRECT_URI,
  VERCEL_URL,
} = process.env;

function Authorize() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const req = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const state = urlParams.get("state");
      const code = urlParams.get("code") ?? "";

      const storedState = await localStorage.getItem("state");
      const base64 = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

      if (state !== storedState) navigate("/login");

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          Authorization: `Basic ${base64}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: REDIRECT_URI ? String(REDIRECT_URI) : `${VERCEL_URL}/authorize`,
        }),
      });
      if (!response.ok) return;

      const data = await response.json();
      // save access token
      await localStorage.setItem("spotify.access", JSON.stringify(data));

      await dispatch(login());

      navigate("/");
    };
    req();
  }, [navigate, dispatch]);

  return null;
}

export default Authorize;
