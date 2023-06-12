import { useNavigate } from "react-router-dom";
import useAuthStore from "../utils/setup/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { ROUTES } from "../utils/helper/routes";
import Swal from "sweetalert2";


const useLogout = () => {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleLogout = () => {
        logout();
        queryClient.clear();
        Swal.fire({
            title: "Sukses!",
            text: "Berhasil Logout",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
        })
        navigate(ROUTES.LOGIN);
    };

    return { handleLogout };
};

export default useLogout;
