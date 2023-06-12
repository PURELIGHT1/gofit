import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useMasterApi from '../../../utils/MasterApi'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ROUTES } from '../../../utils/helper/routes'

const queryKeys = {
    all: ['instrukturs'],
    detail: (id) => ['instrukturs', id],
    riwayat: (id) => ['instrukturs', id, 'riwayat'],
};

export const useInstrukturs = () => {
    return useQuery(queryKeys.all, useMasterApi().getInstruktur);
};

export const useInstruktursAktif = () => {
    return useQuery(queryKeys.all, useMasterApi().getInstrukturAktif);
};


export const useDeleteInstrukturs = () => {
    const queryClient = useQueryClient();
    return useMutation(useMasterApi().deleteInstruktur, {
        onSuccess: (data) => {
            if (data) {
               Swal.fire({
                    title: "Sukses!",
                    text: "Berhasil Menghapus Instruktur",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                })
                queryClient.invalidateQueries(queryKeys.all);
            }
        },
    });
};

export const useAktifInstrukturs = () => {
    const queryClient = useQueryClient();
    return useMutation(useMasterApi().aktifInstruktur, {
        onSuccess: (data) => {
            if (data) {
               Swal.fire({
                    title: "Sukses!",
                    text: "Berhasil Mengaktifkan Instruktur",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                })
                queryClient.invalidateQueries(queryKeys.all);
            }
        },
    });
};

export const  useInstrukturDetail = (id) => {
    return useQuery(queryKeys.detail(id), useMasterApi().getInstrukturById, {
        enabled: !!id,
    });
};

export const usePostInstruktur = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(useMasterApi().postInstruktur, {
        onSuccess: (data) => {
            if (data) {
                queryClient.invalidateQueries(queryKeys.all);
                Swal.fire({
                    title: "Sukses!",
                    text: "Berhasil Menambah Instruktur",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                })
                navigate(ROUTES.INSTRUKTUR);
            }
        },
    });
};

export const usePutInstruktur = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(useMasterApi().putInstruktur, {
        onSuccess: (data) => {
            if (data) {
                 Swal.fire({
                    title: "Sukses!",
                    text: "Berhasil Mengubah Instruktur",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                })
                queryClient.invalidateQueries(queryKeys.detail(data.id));
                navigate(ROUTES.INSTRUKTUR);
            }
        },
    });
};