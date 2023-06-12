import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useMasterApi from "../../../../../utils/MasterApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ROUTES } from "../../../../../utils/helper/routes";

const queryKeys = {
    all: ['presensiGym'],
    allBookings : ['bookings'],
};

export const usePresensiGym = () => {
    return useQuery(queryKeys.all, useMasterApi().useGetPresensiGym);
};

export const usePostPresensi = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(useMasterApi().usePostPresensi, {
        onSuccess: (data) => {
            if (data) {
                
                Swal.fire({
                    title: "Sukses!",
                    text: "Berhasil Menambah Presensi Gym",
                    icon: "success",
                    timer: 1800,
                    showConfirmButton: false,
                })
                queryClient.invalidateQueries(queryKeys.all);
                queryClient.invalidateQueries(queryKeys.allBookings);
                navigate(ROUTES.PRESENSI_GYM);
            }
        },
    });
};

export const useKonfirmasiPresensi = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(useMasterApi().usePutPresensi, {
        onSuccess: (data) => {
            if (data) {
                
                Swal.fire({
                    title: "Sukses!",
                    text: "Berhasil Mengakhiri Presensi Gym",
                    icon: "success",
                    timer: 1800,
                    showConfirmButton: false,
                })
                queryClient.invalidateQueries(queryKeys.all);
                navigate(ROUTES.PRESENSI_GYM);
            }
        },
    });
};

export const useGetBookingGym = () => {
    return useQuery(queryKeys.allBookings, useMasterApi().getBookingGym);
};
