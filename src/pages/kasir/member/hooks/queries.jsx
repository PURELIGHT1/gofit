import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useMasterApi from '../../../../utils/MasterApi'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import Swal from 'sweetalert2'
import { ROUTES } from '../../../../utils/helper/routes'

const queryKeys = {
    all: ['members'],
    detail: (id) => ['members', id],
    riwayat: (id) => ['members', id, 'riwayat'],
};

export const useMember = () => {
    return useQuery(queryKeys.all, useMasterApi().getMember);
};

export const useDeleteMember = () => {
    const queryClient = useQueryClient();
    return useMutation(useMasterApi().deleteMember, {
        onSuccess: (data) => {
            if (data) {
               Swal.fire({
                    title: "Sukses!",
                    text: "Berhasil Menghapus Member",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                })
                queryClient.invalidateQueries(queryKeys.all);
            }
        },
    });
};

export const  useMemberDetail = (id) => {
    return useQuery(queryKeys.detail(id), useMasterApi().getMemberById, {
        enabled: !!id,
    });
};

export const usePostMember = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(useMasterApi().postMember, {
        onSuccess: (data) => {
            if (data) {
                
                queryClient.invalidateQueries(queryKeys.all);
                Swal.fire({
                    title: "Sukses!",
                    text: "Berhasil Menambah Member",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                })
                navigate(ROUTES.MEMBER);
            }
        },
    });
};

export const usePutMember = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(useMasterApi().putMember, {
        onSuccess: (data) => {
            if (data) {
                 Swal.fire({
                    title: "Sukses!",
                    text: "Berhasil Mengubah Member",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                })
                queryClient.invalidateQueries(queryKeys.detail(data.id));
                navigate(ROUTES.MEMBER);
            }
        },
    });
};

export const useAktifMember = () => {
    const queryClient = useQueryClient();
    return useMutation(useMasterApi().aktifMember, {
        onSuccess: (data) => {
            if (data) {
               Swal.fire({
                    title: "Sukses!",
                    text: "Berhasil Mengaktifkan Member",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                })
                queryClient.invalidateQueries(queryKeys.all);
            }
        },
    });
};

export const useResetPasswordMember = () => {
    const queryClient = useQueryClient();
    return useMutation(useMasterApi().resetPasswordMember, {
        onSuccess: (data) => {
            if (data) {
               Swal.fire({
                    title: "Sukses!",
                    text: "Berhasil Mereset Password Member",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                })
                queryClient.invalidateQueries(queryKeys.all);
            }
        },
    });
};