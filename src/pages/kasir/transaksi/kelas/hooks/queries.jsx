import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import useMasterApi from "../../../../../utils/MasterApi"
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../../utils/helper/routes";
import Swal from "sweetalert2";

const queryKeys = {
    all: ['depositKelas'],
    detail: (id) => ['depositKelas', id],
};

export const useDepositKelas = () => {
    return useQuery(queryKeys.all, useMasterApi().getDepositKelas);
};

export const usePostDepositKelas = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(useMasterApi().postDepositKelas, {
        onSuccess: (data) => {
            if (data) {
                queryClient.invalidateQueries(queryKeys.all);
                Swal.fire({
                    title: "Sukses!",
                    text: "Berhasil Menambah Deposit Kelas",
                    icon: "success",
                    timer: 1800,
                    showConfirmButton: false,
                })
                navigate(ROUTES.DK);
            }
        },
        onError: (error) => {
            if(error.response.status === 403){
                 Swal.fire("Gagal!", "Sisa paket sebelumnya belum habis!", "error");
            } else if(error.response.status === 400){
                Swal.fire("Gagal!", "Deposit Member tidak mencukupi!", "error");
            }
        }
    });
};