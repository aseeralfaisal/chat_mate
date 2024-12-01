import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

type UseFetchOptions<T> = {
  method?: axios.Method;
  body?: T | null;
  config?: AxiosRequestConfig;
};

type UseFetchReturnType<R> = {
  data: R | null;
  isLoading: boolean;
  error: string | null;
};

const useFetch = <T, R>(
  url: string,
  { method = "GET", body = null, config }: UseFetchOptions<T> = {}
): UseFetchReturnType<R> => {
  const [data, setData] = useState<R | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const abortController = new AbortController();

    const fetchApi = async () => {
      setIsLoading(true);
      const axiosConfig = {
        ...config,
        method: method,
        url: url,
        data: body,
        signal: abortController.signal
      }

      try {
        const response = await axios(axiosConfig);
        setData(response.data);
      } catch (error) {
        setIsLoading(false);
        setError("Error Occurred");
      }

    }
    fetchApi();

    return () => {
      abortController.abort();
    }
  }, [url, method, body, config])

  return { data, isLoading, error }
}

export default useFetch 
