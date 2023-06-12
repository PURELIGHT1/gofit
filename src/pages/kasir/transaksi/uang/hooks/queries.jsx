import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useMasterApi from "../../../../../utils/MasterApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ROUTES } from "../../../../../utils/helper/routes";

const queryKeys = {
    all: ['depositUang'],
    detail: (id) => ['depositUang', id],
};

export const useDepositUang = () => {
    return useQuery(queryKeys.all, useMasterApi().getDepositUang);
};

export const usePostDepositUang = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(useMasterApi().postDepositUang, {
        onSuccess: (data) => {
            if (data) {
                queryClient.invalidateQueries(queryKeys.all);
                Swal.fire({
                    title: "Sukses!",
                    text: "Berhasil Menambah Deposit Uang",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                })
                navigate(ROUTES.DU);
            }
        },
    });
};
