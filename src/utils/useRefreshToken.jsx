import api from './axiosConfig';
import Cookies from 'js-cookie';

const useRefreshToken = () => {
    const refresh = async () => {
        const params = new URLSearchParams({
            username: JSON.parse(localStorage.getItem('user')).username,
        });
        const response = await api.post('/auth/refresh', params);
        Cookies.set('token', response.data.token);
        return response.data.token;
    };

    return refresh;
};

export default useRefreshToken;
