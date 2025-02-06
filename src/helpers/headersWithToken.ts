import { AxiosRequestConfig } from 'axios'

const headersWithToken = <T>(
  token: string,
): AxiosRequestConfig<T> => {
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  };
}

export {
  headersWithToken,
}
