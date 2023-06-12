import { useEffect } from 'react';
import api from './axiosConfig'
import Cookies from 'js-cookie'
import useRefreshToken from './useRefreshToken'

const useAxiosPrivate = () => {
    const token = Cookies.get('token');
    const refresh = useRefreshToken();

    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(
            async (config) => {
                console.log('request interceptor');
                if (!config.headers['Authorization']) {
                    config.headers.authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = api.interceptors.response.use(
            (response) => {
                return response;
            },
            // async (error) => {
            //     const prevRequest = error?.config;
            //     if (error?.response?.status === 401 && !prevRequest?.sent) {
            //         prevRequest.sent = true;
            //         const newAccessToken = await refresh();
            //         console.log('nACT', newAccessToken);

            //         prevRequest.headers = {
            //             ...prevRequest.headers,
            //             authorization: `${newAccessToken}`,
            //         };
            //         return api(prevRequest);
            //     }
            //     return Promise.reject(error);
            // }
        );

        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseIntercept);
        };
    }, [token]);

    return api;
};

export default useAxiosPrivate;