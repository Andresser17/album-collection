import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
// Envs
const {
  REACT_APP_SPOTIFY_API: API_URL,
  REACT_APP_CLIENT_ID: CLIENT_ID,
  REACT_APP_CLIENT_SECRET: CLIENT_SECRET,
} = process.env;

export function useInstance() {
  const instance = useMemo(() => {
    const instance = axios.create({
      baseURL: API_URL,
      timeout: 1000,
    });

    instance.interceptors.request.use(
      (config) => {
        const stored = localStorage.getItem("spotify.access");
        const tokens = stored ? JSON.parse(stored) : "";

        if (tokens && config.headers) {
          config.headers["Authorization"] = `Bearer ${tokens.access_token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        // Access Token was expired
        if (error.response.status === 401 && !error.config._retry) {
          error.config._retry = true;

          try {
            const stored = localStorage.getItem("spotify.access");
            const tokens = stored ? JSON.parse(stored) : null;

            const base64 = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

            const response = await fetch(
              "https://accounts.spotify.com/api/token",
              {
                method: "POST",

                headers: {
                  Authorization: `Basic ${base64}`,
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                  grant_type: "refresh_token",
                  refresh_token: tokens.refresh_token,
                }),
              }
            );
            const data = await response.json();

            // Set new access token to current user
            localStorage.setItem(
              "spotify.access",
              JSON.stringify({ ...data, refresh_token: tokens.refresh_token })
            );

            return instance(error.config);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }

        return Promise.reject(error);
      }
    );

    return instance;
  }, []);

  return instance;
}

interface Params {
  method?: string;
  execute?: boolean | null;
  data?: { [key: string]: any };
}

function useApi(url: string, params: Params = {}) {
  const config = useMemo(() => {
    return { method: "GET", execute: null, data: {}, ...params };
  }, [params]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<null | { [key: string]: any }>(null);
  const [error, setError] = useState<null | { [key: string]: any }>(null);
  const api = useInstance();

  const reset = useCallback(() => {
    setIsLoading(true);
    setData(null);
    setError(null);
  }, []);

  // re-run api call if url change
  useEffect(() => {
    reset();
  }, [url, reset]);

  // change loading state to false if execute is false
  useEffect(() => {
    if (config.execute !== null) {
      setIsLoading(config.execute);
    }
  }, [config]);

  const req = useCallback(() => {
    api({ url, method: config.method, data: config.data })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err.response.data.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [api, url, config]);

  const makeRequest = () => {
    reset();
    req();
  };

  // call request
  useEffect(() => {
    if ((config.execute !== null && !config.execute) || !isLoading) return;

    req();
  }, [isLoading, config, req]);

  return [isLoading, data, error, makeRequest] as [boolean, any, any, any];
}

export default useApi;
