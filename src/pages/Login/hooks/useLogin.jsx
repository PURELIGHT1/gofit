import { useMutation } from '@tanstack/react-query'
import useLocalStorage from '../../../common/useLocalStorage'
import { ROUTES } from '../../../utils/helper/routes'
import { useNavigate } from 'react-router-dom'
import * as api from '../../../utils/HandleApi'
import useAuthStore from '../../../utils/setup/useAuthStore'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'

export const useLogin = () => {
    const { setValue } = useLocalStorage('user', null);
    const setUser = useAuthStore((state) => state.setUser);
    const navigate = useNavigate();
    return useMutation(api.LoginUrl, {
        onSuccess: (data) => {
            if (data) {
                const user = data.data;
                console.log(user);
                Cookies.set('token', data.data.token);
                setUser(user);
                setValue(user);
                // if(data.data.role === "ADMIN"){
                Swal.fire({
                    title: "Sukses!",
                    text: "Berhasil Login",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                })
                navigate(ROUTES.DASHBOARD);
                //     navigate(ROUTES.INSTRUKTUR);
                // } else if (data.data.role === "MO") {
                //     Swal.fire({
                //         title: "Sukses!",
                //         text: "Berhasil Login",
                //         icon: "success",
                //         timer: 1000,
                //         showConfirmButton: false,
                //     })
                //     navigate(ROUTES.JU);
                // } else if (data.data.role === "KASIR") {
                //     Swal.fire({
                //         title: "Sukses!",
                //         text: "Berhasil Login",
                //         icon: "success",
                //         timer: 1000,
                //         showConfirmButton: false,
                //     })
                //     navigate(ROUTES.MEMBER);
                // } else {
                //     Swal.fire("Gagal!", "Instruktur tidak dapat login!", "error");
                //     navigate(ROUTES.LOGIN);
                // }
            }
        },
    });
};
