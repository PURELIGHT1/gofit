import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useMasterApi from "../../../../utils/MasterApi"
import Swal from "sweetalert2"
import { ROUTES } from "../../../../utils/helper/routes";
import { useNavigate } from "react-router-dom";

const queryKeys = {
    all: ['jadwalHarian'],
    allIns: ['instrukturs'],
    allkelas: ['kelas'],
    detail: (id) => ['jadwalHarian', id],
    riwayat: (id) => ['jadwalHarian', id, 'riwayat'],
};

export const useJadwal = () => {
    return useQuery(queryKeys.all, useMasterApi().getJadwalHarian);
};

export const useGenerateJadwal = () => {
     const queryClient = useQueryClient();
     const navigate = useNavigate();
    return useMutation(useMasterApi().postJadwalHarian, {
        onSuccess: () => {
            Swal.fire({
                title: "Sukses!",
                text: "Berhasil Generate Jadwal",
                icon: "success",
                timer: 1800,
                showConfirmButton: false,
            })
            queryClient.invalidateQueries(queryKeys.all);
            navigate(ROUTES.JH)
        },
        onError: () => {
            Swal.fire({
                title: "Gagal!",
                text: "Gagal Generate Jadwal, Jadwal Harian Sudah Digenerate!",
                icon: "error",
                timer: 1800,
                showConfirmButton: false,
            })
            queryClient.invalidateQueries(queryKeys.all);
            navigate(ROUTES.JH)
        }
    });
};

export const useLiburJadwal = () => {
    const queryClient = useQueryClient();
    // const navigate = useNavigate();
    return useMutation(useMasterApi().putLiburJadwal, {
        onSuccess: () => {
            Swal.fire({
                title: "Sukses!",
                text: "Berhasil Liburkan Jadwal",
                icon: "success",
                timer: 1800,
                showConfirmButton: false,
            })
            queryClient.invalidateQueries(queryKeys.all);
            // navigate(ROUTES.JH)
        },
        onError: () => {
            Swal.fire({
                title: "Gagal!",
                text: "Gagal Liburkan Jadwal, Jadwal Harian Sudah Berakhir!",
                icon: "error",
                timer: 1800,
                showConfirmButton: false,
            })
            queryClient.invalidateQueries(queryKeys.all);
            navigate(ROUTES.JH)
        }
        // onError: () => {
        //     Swal.fire({
        //         title: "Gagal!",
        //         text: "Gagal Generate Jadwal, Jadwal Harian Sudah Digenerate!",
        //         icon: "error",
        //         timer: 1800,
        //         showConfirmButton: false,
        //     })
        //     queryClient.invalidateQueries(queryKeys.all);
        //     navigate(ROUTES.JH)
        // }
    });
};

