import Swal from 'sweetalert2'
import api from './axiosConfig'

export const LoginUrl = async (data) => {
    try {
        const response = await api.post('login',
            {
                username: data.email,
                password: data.password
            });
        return response.data;
    } catch (error) {
        Swal.fire("Gagal!", "Gagal Login, Username atau Password Salah!", "error");
        return null;
    }
};
