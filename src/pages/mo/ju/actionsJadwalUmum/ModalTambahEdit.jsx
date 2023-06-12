import { useForm, Controller } from 'react-hook-form'
import Spinner from '../../../../components/Spinner'
import useModalStore from '../../../../utils/setup/useModalStore'
import { usePostJadwal, usePutJadwal, useInstruktursAktif, useKelasAktif, useJadwalDetail } from '../hooks/queries'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import 'yup-phone'
import Button from '../../../../components/Button2'
import ReactSelect from 'react-select'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

let schema = yup.object().shape({
    instruktur: yup.string().required('Instruktur harus diisi'),
    kelas: yup.string().required('Kelas harus diisi'),
    hariJadwal: yup.string().required('hariJadwal harus diisi'),
    sesiJadwal: yup.string().required('sesijadwal harus diisi'),
});

const ModalTambahEdit = ({ id, isEdit }) => {

    const navigate = useNavigate();
    const { mutate: mutatePost, isLoading: loadingPost } = usePostJadwal();
    const { mutate: mutatePut, isLoading: loadingPut } = usePutJadwal();
    
    const { data:detailData, isLoading } = useJadwalDetail(id);
    console.log(detailData);

    const closeModal = useModalStore((state) => state.closeModal);


    const {data:Ins} = useInstruktursAktif();
    const {data:Kelas} = useKelasAktif();

    const days = [{ label:"Senin",value:"Senin"},{ label:"Selasa",value:"Selasa"},{ label:"Rabu",value:"Rabu"}, { label:"Kamis",value:"Kamis"}, { label:"Jumat",value:"Jumat"}, { label:"Sabtu",value:"Sabtu"}, { label:"Minggu",value:"Minggu"}];
    const session = [
        {
            label:"08.00",
            value:1
        },
        {
            label:"09.30",
            value:2
        },
        {
            label:"17.00",
            value:3
        },
        {
            label:"18.30",
            value:4
        }
    ];
    
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    });
   
    const onSubmit = (data) => {
        if (isEdit) {
            console.log(data);
            mutatePut(data, {
                onSuccess: () => {
                    closeModal();
                },
                onError: () => {
                    Swal.fire("Gagal!", "Gagal Menambah Jadwal Umum, Jadwal Instruktur bertabrakan!", "error");
                }
            });
        } else {
            mutatePost(data, {
                onSuccess: () => {
                    closeModal();
                },
                onError: () => {
                    Swal.fire("Gagal!", "Gagal Menambah Jadwal Umum, Jadwal Instruktur bertabrakan!", "error");
                }
            });
        }
    };

    useEffect(() => {
        if (isEdit) {
            setValue('id', detailData?.id);
            setValue('instruktur', detailData?.instruktur.id);
            setValue('kelas', detailData?.kelas.id);
            setValue('tglLahir', detailData?.tglLahir);
            setValue('hariJadwal', detailData?.hariJadwal);
            setValue('sesiJadwal', detailData?.sesiJadwal);
        }
    }, [isEdit, setValue, detailData]);

    if (isEdit && isLoading) return <Spinner full />;

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
                                    {isEdit ? 'Edit Jadwal Umum' : 'Tambah Jadwal Umum'}
                                </h1>
                            </div>
                            <div className="relative p-6 flex-auto">
                                <form 
                                onSubmit={handleSubmit(onSubmit)}
                                 >
                                    {isEdit && <input type="hidden" {...register('id')} />}
                                    <div className="mt-0">
                                        <div className="grid grid-cols-6 items-center mt-0">
                                            <div className="col-span-5 row-span-5 flex mb-3">
                                                <label
                                                    htmlFor="instruktur"
                                                    className="text-sm font-medium uppercase">
                                                    Instruktur
                                                </label>
                                            </div>
                                           
                                        </div>
                                        {
                                            isEdit && 
                                            <Controller
                                                control={control}
                                                name='instruktur'
                                                render={({ field: { onChange, value, ref, name }}) => (
                                                    <ReactSelect
                                                        className={"react-select"}
                                                        classNamePrefix={"react-select"}
                                                        placeholder={"Pilih Instruktur"} 
                                                        options={Ins}
                                                        value={Ins.find(c => c.value === value)}
                                                        onChange={val => {
                                                            onChange(val.value);
                                                        }} 
                                                    />
                                                )}
                                            />
                                        }
                                        {
                                            !isEdit &&
                                            <Controller
                                                control={control}
                                                name='instruktur'
                                                render={({ field: { onChange, value, ref, name }}) => (
                                                    <ReactSelect
                                                        className={"react-select"}
                                                        classNamePrefix={"react-select"}
                                                        placeholder={"Pilih Instruktur"} 
                                                        options={Ins}
                                                        onChange={val => {
                                                            onChange(val.value);
                                                        }} 
                                                    />
                                                )}
                                            />
                                        }
                                        
                                      
                                        {errors.instruktur && (
                                            <p className="text-red-500 text-sm">
                                                {errors.instruktur.message}
                                            </p>
                                        )}

                                        <div className="grid grid-cols-6 items-center mt-4">
                                            <div className="col-span-5 row-span-5 flex mb-3">
                                                <label
                                                    htmlFor="kelas"
                                                    className="text-sm font-medium uppercase">
                                                    Kelas
                                                </label>
                                            </div>
                                        </div>
                                        { 
                                            isEdit &&
                                            <Controller
                                                control={control}
                                                name='kelas'
                                                render={({ field: { onChange, value, ref, name }}) => (
                                                    <ReactSelect
                                                    className={"react-select"}
                                                        classNamePrefix={"react-select"}
                                                        placeholder={"Pilih Kelas"} 
                                                        options={Kelas}
                                                        value={Kelas.find(c => c.value === value)}
                                                        onChange={val => {
                                                            onChange(val.value);
                                                        }} 
                                                    />
                                                )}
                                            />
                                        }
                                        { 
                                            !isEdit &&
                                            <Controller
                                                control={control}
                                                name='kelas'
                                                render={({ field: { onChange, value, ref, name }}) => (
                                                    <ReactSelect
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
                                        }
                                        {errors.kelas && (
                                            <p className="text-red-500 text-sm">
                                                {errors.kelas.message}
                                            </p>
                                        )}

                                        <div className="grid grid-cols-6 items-center mt-4">
                                            <div className="col-span-5 row-span-5 flex mb-3">
                                                <label
                                                    htmlFor="hariJadwal"
                                                    className="text-sm font-medium uppercase">
                                                    Hari
                                                </label>
                                            </div>
                                           
                                        </div>
                                        { 
                                            isEdit &&
                                            <Controller
                                                control={control}
                                                name='hariJadwal'
                                                render={({ field: { onChange, value, ref, name }}) => (
                                                    <ReactSelect
                                                    className={"react-select"}
                                                        classNamePrefix={"react-select"}
                                                        placeholder={"Pilih Hari"} 
                                                        options={days}
                                                        value={days.find(c => c.value === value)}
                                                        onChange={val => {
                                                            onChange(val.value);
                                                        }} 
                                                    />
                                                )}
                                            />
                                        }
                                        {
                                            !isEdit &&
                                            <Controller
                                                control={control}
                                                name='hariJadwal'
                                                render={({ field: { onChange, value, ref, name }}) => (
                                                    <ReactSelect
                                                    className={"react-select"}
                                                        classNamePrefix={"react-select"}
                                                        placeholder={"Pilih Hari"} 
                                                        options={days}
                                                        onChange={val => {
                                                            onChange(val.value);
                                                        }} 
                                                    />
                                                )}
                                            />
                                        }
                                        
                                        {errors.hariJadwal && (
                                            <p className="text-red-500 text-sm">
                                                {errors.hariJadwal.message}
                                            </p>
                                        )}
                                        <div className="grid grid-cols-6 items-center mt-4">
                                            <div className="col-span-5 row-span-5 flex mb-3">
                                                <label
                                                    htmlFor="sesiJadwal"
                                                    className="text-sm font-medium uppercase">
                                                    Sesi
                                                </label>
                                            </div>
                                        </div>
                                        { 
                                            isEdit &&
                                            <Controller
                                                control={control}
                                                name='sesiJadwal'
                                                render={({ field: { onChange, value, ref, name }}) => (
                                                    <ReactSelect
                                                    className={"react-select"}
                                                        classNamePrefix={"react-select"}
                                                        placeholder={"Pilih Sesi"} 
                                                        options={session}
                                                        value={session.find(c => c.value === value)}
                                                        onChange={val => {
                                                            onChange(val.value);
                                                        }} 
                                                    />
                                                )}
                                            />
                                        }
                                        {
                                            !isEdit &&
                                            <Controller
                                                control={control}
                                                name='sesiJadwal'
                                                render={({ field: { onChange, value, ref, name }}) => (
                                                    <ReactSelect
                                                    className={"react-select"}
                                                        classNamePrefix={"react-select"}
                                                        placeholder={"Pilih Sesi"} 
                                                        options={session}
                                                        onChange={val => {
                                                            onChange(val.value);
                                                        }} 
                                                    />
                                                )}
                                            />
                                        }
                                       
                                          {errors.sesiJadwal && (
                                            <p className="text-red-500 text-sm">
                                                {errors.sesiJadwal.message}
                                            </p>
                                        )}
                                        
                                        <div className="flex items-center gap-x-4 mt-8">
                                            <Button
                                                type="submit"
                                                className="disabled:cursor-not-allowed disabled:bg-blue-300"
                                                isloading={loadingPost || loadingPut ? 1 : 0}
                                            >
                                                {isEdit ? 'Edit' : 'Tambah'}
                                            </Button>
                                            <Button
                                                type="button"
                                                className="bg-gray-500 disabled:cursor-not-allowed disabled:bg-gray-300"
                                                 isloading={loadingPost || loadingPut ? 1 : 0}
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

export default ModalTambahEdit;
