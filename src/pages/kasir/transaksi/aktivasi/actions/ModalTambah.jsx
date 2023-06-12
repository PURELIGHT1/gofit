import React from 'react'
import { usePostAktivasi, useMemberAktif } from '../hooks/queries'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import TextField from '../../../../../components/TextField'
import useModalStore from '../../../../../utils/setup/useModalStore'
import Select from 'react-select'
import Button from '../../../../../components/Button2'
import Spinner from '../../../../../components/Spinner'
import { usePostDepositUang } from '../../uang/hooks/queries'

let schema = yup.object().shape({
    member: yup.string().required('Member harus diisi'),
    jumlah: yup.number()
    .moreThan(3000000, 'Jumlah Bayar harus lebih atau sama dengan 3.000.000')
    .transform((value) => (isNaN(value) || value === null || value === undefined) ? 0 : value ),
    jlhDeposit: yup.number()
    .moreThan(0, 'Jumlah Deposit harus lebih dari 0')
    .transform((value) => (isNaN(value) || value === null || value === undefined) ? 0 : value ),
});

const ModalTambah = ({type}) => {
    const { mutate: mutatePost, isLoading: loadingPost } = usePostAktivasi();
    const { mutate: mutatePostDepo, isLoading: loadingPostDepo } = usePostDepositUang();
    const { data:Member, isLoading } = useMemberAktif();
    const closeModal = useModalStore((state) => state.closeModal);
    
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onTambah = (data) => {
        console.log(data);
        mutatePost(data, {
            onSuccess: () => {
                closeModal();
            }
        });
    };

     const onDepo = (data) => {
        console.log(data);
        mutatePostDepo(data, {
            onSuccess: () => {
                closeModal();
            }
        });
    };


    if (Member && isLoading) return <Spinner full />;
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
                                    {
                                        type === true ? 'Tambah Transaksi Aktivasi Member' : 'Tambah Deposit Uang Member'
                                    }
                                    
                                </h1>
                            </div>
                            <div className="relative p-6 flex-auto">
                                <form 
                                    onSubmit = {
                                        type === true ? handleSubmit(onTambah) : handleSubmit(onDepo) 
                                    }
                                    
                                    >
                                    <div className="mt-0">
                                        <div className="grid grid-cols-6 items-center mt-0">
                                            <div className="col-span-5 row-span-5 flex mb-3">
                                                <label
                                                    htmlFor="instruktur"
                                                    className="text-sm font-medium uppercase">
                                                    Member
                                                </label>
                                            </div>
                                        </div>
                                        <Controller
                                            control={control}
                                            name='member'
                                            render={({ field: { onChange, value, ref, name }}) => (
                                                <Select
                                                    className={"react-select"}
                                                    classNamePrefix={"react-select"}
                                                    placeholder={"Pilih Member"} 
                                                    options={Member}
                                                    onChange={val => {
                                                         onChange(val.value);
                                                    }} 
                                                />
                                            )}
                                        />
                                        {errors.member && (
                                            <p className="text-red-500 text-sm">
                                                {errors.member.message}
                                            </p>
                                        )}
                                       
                                        <div className="grid grid-cols-6 items-center mt-4">
                                            <div className="col-span-5 row-span-5 flex mb-3">
                                                <label
                                                    htmlFor="bayar"
                                                    className="text-sm font-medium uppercase">
                                                    Bayar
                                                </label>
                                            </div>
                                        </div>
                                         {
                                            type &&
                                            <TextField
                                                id="jumlah"
                                                type="number"
                                                {...register('jumlah')}
                                                placeholder="Masukkan Jumlah di atas 3.000.000"
                                                addstyle="col-span-3"
                                            />
                                        }
                                        {
                                            type && 
                                                errors.jumlah && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.jumlah.message}
                                                </p>
                                                )
                                        }
                                        {
                                            !type &&
                                            <TextField
                                                id="jlhDeposit"
                                                type="number"
                                                {...register('jlhDeposit')}
                                                placeholder="Masukkan Jumlah di atas 0"
                                                addstyle="col-span-3"
                                            />
                                        }
                                        {
                                            !type && 
                                                errors.jlhDeposit && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.jlhDeposit.message}
                                                </p>
                                                )
                                        }

                                        <div className="flex items-center gap-x-4 mt-8">
                                            <Button
                                                type="submit"
                                                className="disabled:cursor-not-allowed disabled:bg-blue-300"
                                                isloading={loadingPost || loadingPostDepo ? 1 : 0}
                                            >
                                                Bayar
                                            </Button>
                                            <Button
                                                type="button"
                                                className="bg-gray-500 disabled:cursor-not-allowed disabled:bg-gray-300"
                                                isloading={loadingPost || loadingPostDepo ? 1 : 0}
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
  )
}

export default ModalTambah
