import React from 'react'
import { useMemberAktif } from '../../aktivasi/hooks/queries'
import { useKelasAktif } from '../../../../mo/ju/hooks/queries'
import { usePostDepositKelas } from '../hooks/queries'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useModalStore from '../../../../../utils/setup/useModalStore'
import Select from 'react-select'
import Button from '../../../../../components/Button2'
import Spinner from '../../../../../components/Spinner'
import TextField from '../../../../../components/TextField'

let schema = yup.object().shape({
    member: yup.string().required('Member harus diisi'),
    kelas: yup.string().required('Kelas harus diisi'),
    jumlah: yup.number()
    .moreThan(0, 'Jumlah Kelas harus lebih dari 0')
    .transform((value) => (isNaN(value) || value === null || value === undefined) ? 0 : value ),
});

const ModalTambahDepoKelas = () => {
    const { mutate: mutatePostDepoKelas, isLoading: loadingPostDepoKelas } = usePostDepositKelas();
    const { data:Member, isLoading:loadingMember } = useMemberAktif();
     const { data:Kelas, isLoading:loadingKelas } = useKelasAktif();
    const closeModal = useModalStore((state) => state.closeModal);
    
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
     const onDepo = (data) => {
        console.log(data);
        mutatePostDepoKelas(data, {
            onSuccess: () => {
                closeModal();
            },
            onError: () => {
                closeModal();
            }
        });
    };

    const optionsJlh = [
      {
        label: "5 Kelas",
        value: 5,
      },
       {
        label: "10 Kelas",
        value: 10,
      },
    ];

    if (Member && Kelas && loadingMember && loadingKelas) return <Spinner full />;
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
                                  Tambah Deposit Kelas Member 
                                </h1>
                            </div>
                            <div className="relative p-6 flex-auto">
                                <form 
                                    onSubmit ={handleSubmit(onDepo) }
                                    
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
                                                    Kelas
                                                </label>
                                            </div>
                                        </div>
                                        <Controller
                                            control={control}
                                            name='kelas'
                                            render={({ field: { onChange, value, ref, name }}) => (
                                                <Select
                                                    className={"react-select"}
                                                    classNamePrefix={"react-select"}
                                                    placeholder={"Pilih Kelas"} 
                                                    options={Kelas}
                                                    onChange={val => {
                                                        onChange(val.value);
                                                    }} 
                                               />
                                            )}
                                        />
                                        {errors.kelas && (
                                            <p className="text-red-500 text-sm">
                                                {errors.kelas.message}
                                            </p>
                                        )}

                                         
                                        <div className="grid grid-cols-6 items-center mt-4">
                                            <div className="col-span-5 row-span-5 flex mb-3">
                                                <label
                                                    htmlFor="bayar"
                                                    className="text-sm font-medium uppercase">
                                                    Total Kelas
                                                </label>
                                            </div>
                                        </div>
                                        <Controller
                                            control={control}
                                            name='jumlah'
                                            render={({ field: { onChange, value, ref, name }}) => (
                                                <Select
                                                    className={"react-select"}
                                                    classNamePrefix={"react-select"}
                                                    placeholder={"Pilih Total Tersedia"}
                                                    options={optionsJlh}
                                                    onChange={val => {
                                                         onChange(val.value);
                                                    }} 
                                                />
                                            )}
                                        />
                                        {errors.jumlah && (
                                            <p className="text-red-500 text-sm">
                                                {errors.jumlah.message}
                                            </p>
                                        )}
                                        {/* <TextField
                                            id="jumlah"
                                            type="number"
                                            {...register('jumlah')}
                                            placeholder="Masukkan Total Kelas di atas 0"
                                            addstyle="col-span-3"
                                        />
                                        {errors.jumlah && (
                                            <p className="text-red-500 text-sm">
                                                {errors.jumlah.message}
                                            </p>
                                        )} */}
                                        <div className="flex items-center gap-x-4 mt-8">
                                            <Button
                                                type="submit"
                                                className="disabled:cursor-not-allowed disabled:bg-blue-300"
                                                isloading={loadingPostDepoKelas ? 1 : 0}
                                            >
                                                Bayar
                                            </Button>
                                            <Button
                                                type="button"
                                                className="bg-gray-500 disabled:cursor-not-allowed disabled:bg-gray-300"
                                                isloading={loadingPostDepoKelas ? 1 : 0}
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

export default ModalTambahDepoKelas
