import { useEffect, useState, useRef, useCallback } from 'react';
import { API_URL } from '../config';
import { ApiMethods } from '../typings';

export const errText = 'Something went wrong, please try again';

export const useApi = <T, R = undefined>() => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<undefined | string>(undefined);
  const [pending, setPending] = useState<boolean>(false);
  const [status, setStatus] = useState<undefined | number>(undefined);

  const activeHttpRequest = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async (
      url: string,
      method: ApiMethods = ApiMethods.GET,
      body?: R,
      headers?: any
    ) => {
      try {
        setData(undefined);
        setPending(true);

        const httpAbortCtrl = new AbortController();
        activeHttpRequest.current.push(httpAbortCtrl);

        const res = await fetch(API_URL + url, {
          method,
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
            ...headers
          }
        });

        setStatus(res.status);
        setPending(false);

        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.message);
        }

        activeHttpRequest.current = activeHttpRequest.current.filter(
          reqCtrl => reqCtrl !== httpAbortCtrl
        );

        setData(json);
        setError(undefined);
      } catch (err) {
        setError(err.message || errText);
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      activeHttpRequest.current.forEach(abortCtrl => abortCtrl.abort());
      setPending(false);
    };
  }, []);

  return { data, error, pending, status, sendRequest };
};
