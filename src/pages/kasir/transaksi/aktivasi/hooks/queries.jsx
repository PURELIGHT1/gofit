import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import useMasterApi from "../../../../../utils/MasterApi"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../../../../utils/helper/routes"
import Swal from "sweetalert2"

const queryKeys = {
    all: ['aktivasis'],
    allMembers: ['member'],
    detail: (id) => ['aktivasis', id],
};

export const useAktivasi = () => {
    return useQuery(queryKeys.all, useMasterApi().getAktivasi);
};

export const usePostAktivasi = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(useMasterApi().postAktivasi, {
        onSuccess: (data) => {
            if (data) {
                Swal.fire({
                    title: "Sukses!",
                    text: "Berhasil Menambah Transaksi Aktivasi",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                })
                queryClient.invalidateQueries(queryKeys.all);
                navigate(ROUTES.AKTIVASI);
            }
        },
    });
};

export const useMemberAktif = () => {
    return useQuery(queryKeys.allMembers, useMasterApi().getMemberAktif);
};

export const useKonfirmasiTAMember = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(useMasterApi().putAktivasi, {
        onSuccess: (data) => {
            if (data) {
                 Swal.fire({
                    title: "Sukses!",
                    text: "Berhasil Konfirmasi Transaksi Aktivasi",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                })
                queryClient.invalidateQueries(queryKeys.all);
                navigate(ROUTES.AKTIVASI);
            }
        },
    });
};
