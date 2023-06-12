import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useMasterApi from "../../../../utils/MasterApi";
import Swal from "sweetalert2";

const queryKeys = {
    all: ['jin'],
    detail: (id) => ['ijin', id],
};

export const useIjinInstruktur = () => {
    return useQuery(queryKeys.all, useMasterApi().getIjin);
};

export const useTolakIjin = () => {
    const queryClient = useQueryClient();
    return useMutation(useMasterApi().tolakIjinInstruktur, {
        onSuccess: (data) => {
            if (data) {
               Swal.fire({
                    title: "Sukses!",
                    text: "Berhasil Tolak Ijin Instruktur",
                    icon: "success",
                    timer: 1800,
                    showConfirmButton: false,
                })
                queryClient.invalidateQueries(queryKeys.all);
            }
        },
    });
};

export const useKonfirmasiIjin = () => {
    const queryClient = useQueryClient();
    return useMutation(useMasterApi().konfirmasiIjinInstruktur, {
        onSuccess: (data) => {
            if (data) {
               Swal.fire({
                    title: "Sukses!",
                    text: "Berhasil Konfirmasi Ijin Instruktur",
                    icon: "success",
                    timer: 1800,
                    showConfirmButton: false,
                })
                queryClient.invalidateQueries(queryKeys.all);
            }
        },
    });
};