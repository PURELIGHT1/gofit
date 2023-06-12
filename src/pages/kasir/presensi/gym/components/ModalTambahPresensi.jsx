import { useForm, Controller } from 'react-hook-form'
import Spinner from '../../../../../components/Spinner'
import useModalStore from '../../../../../utils/setup/useModalStore'
import { useGetBookingGym, usePostPresensi } from '../hooks/queries'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import 'yup-phone'
import Button from '../../../../../components/Button2'
import ReactSelect from 'react-select'
import React from 'react'
import Swal from 'sweetalert2'

let schema = yup.object().shape({
    booking: yup.string().required('Instruktur harus diisi'),
});

const ModalTambahPresensi = () => {

    const { mutate: mutatePost, isLoading: loadingPost } = usePostPresensi();
    
    const closeModal = useModalStore((state) => state.closeModal);

    const { data: booking, isLoading: loadingGet } = useGetBookingGym();
    console.log(booking);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
   
    const onSubmit = (data) => {
        mutatePost(data, {
            onSuccess: () => {
                    closeModal();
            },
            onError: () => {
                Swal.fire("Gagal!", "Gagal Menambah Booking Member!", "error");
            }
        });
    };


    if (booking && loadingGet) return <Spinner full />;

    return (
        <>
            <div
                className="relative z-10"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            >
                <div className="fixed inset-0 bg-gray-800 bg-opacity-10 transition-opacity"></div>
                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-2 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                                <h1 className="text-xl font-bold">
                                    Tambah Booking Gym Hari ini
                                </h1>
                            </div>
                            <div className="relative p-6 flex-auto">
                                <form 
                                onSubmit={handleSubmit(onSubmit)}
                                 >
                                    <div className="mt-0">
                                        <div className="grid grid-cols-6 items-center mt-0">
                                            <div className="col-span-5 row-span-5 flex mb-3">
                                                <label
                                                    htmlFor="instruktur"
                                                    className="text-sm font-medium uppercase">
                                                    Member Booking Gym
                                                </label>
                                            </div>
                                           
                                        </div>
                                        <Controller
                                            control={control}
                                            name='booking'
                                            render={({ field: { onChange, value, ref, name }}) => (
                                                <ReactSelect
                                                    className={"react-select"}
                                                    classNamePrefix={"react-select"}
                                                    placeholder={"Pilih Booking Member"} 
                                                    options={booking}
                                                    onChange={val => {
                                                        onChange(val.value);
                                                    }} 
                                                />
                                            )}
                                        />
                                        
                                        {errors.booking && (
                                            <p className="text-red-500 text-sm">
                                                {errors.booking.message}
                                            </p>
                                        )}
                                        
                                        <div className="flex items-center gap-x-4 mt-8">
                                            <Button
                                                type="submit"
                                                className="disabled:cursor-not-allowed disabled:bg-blue-300"
                                                isloading={loadingPost ? 1 : 0}
                                            >
                                                Tambah
                                            </Button>
                                            <Button
                                                type="button"
                                                className="bg-gray-500 disabled:cursor-not-allowed disabled:bg-gray-300"
                                                 isloading={loadingPost ? 1 : 0}
                                                onClick={closeModal}
                                            >
                                                Batal
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalTambahPresensi;
