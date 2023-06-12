import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useMasterApi from "../../../../utils/MasterApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ROUTES } from "../../../../utils/helper/routes";

const queryKeys = {
    all: ['jadwalUmum'],
    allIns: ['instrukturs'],
    allkelas: ['kelas'],
    detail: (id) => ['jadwalUmum', id],
    riwayat: (id) => ['jadwalUmum', id, 'riwayat'],
};

export const useJadwal = () => {
    return useQuery(queryKeys.all, useMasterApi().getJadwalUmum);
};

export const useInstruktursAktif = () => {
    return useQuery(queryKeys.allIns, useMasterApi().getInstrukturAktif);
};

export const useKelasAktif = () => {
    return useQuery(queryKeys.allkelas, useMasterApi().getKelasTersedia);
};

export const useJadwalDetail = (id) => {
    return useQuery(queryKeys.detail(id), useMasterApi().getJadwalUmumById, {
        enabled: !!id,
    });
};

export const usePostJadwal = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(useMasterApi().postJadwalUmum, {
        onSuccess: (data) => {
            if (data) {
                queryClient.invalidateQueries(queryKeys.all);
                Swal.fire({
                    title: "Sukses!",
                    text: "Berhasil Menambah Jawdal Umum",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                })
                navigate(ROUTES.JU);
            }
        },
        onError: () => {
            queryClient.invalidateQueries(queryKeys.all);
        }
    });
};

export const usePutJadwal = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(useMasterApi().putJadwalUmum, {
        onSuccess: (data) => {
            if (data) {
                 Swal.fire({
                    title: "Sukses!",
                    text: "Berhasil Mengubah Jawdal Umum",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                })
                queryClient.invalidateQueries(queryKeys.detail(data.id));
                navigate(ROUTES.JU);
            }
        },
        onError: () => {
            queryClient.invalidateQueries(queryKeys.detail(data.id));
        }
    });
};

export const useDeleteJadwal = () => {
    const queryClient = useQueryClient();
    return useMutation(useMasterApi().deleteJadwalUmum, {
        onSuccess: (data) => {
            if (data) {
               Swal.fire({
                    title: "Sukses!",
                    text: "Berhasil Menghapus Jawdal Umum",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                })
                queryClient.invalidateQueries(queryKeys.all);
            }
        },
    });
};
