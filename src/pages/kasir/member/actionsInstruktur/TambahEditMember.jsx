import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    usePostMember,
    usePutMember,
    useMemberDetail
} from '../hooks/queries'
import { useForm } from 'react-hook-form'
import Spinner from '../../../../components/Spinner'
import * as yup from 'yup'
import 'yup-phone'
import Button from '../../../../components/Button2'
import TextField from '../../../../components/TextField'
import { yupResolver } from '@hookform/resolvers/yup'

const phoneRegExp = /^08[0-9]{10,11}$/;
let schema = yup.object().shape({
    nama: yup.string().required('Nama harus diisi'),
    alamat: yup.string().required('Alamat harus diisi'),
    tglLahir: yup.string().required('Tanggal Lahir harus diisi'), 
    noHp: yup.string().required('Nomor HP harus diisi').min(12,'Nomor HP minimal 12 angka').max(13, 'Nomor HP maksimal 13 angka').matches(phoneRegExp, 'No telepon harus dimulai dengan 08'),
    email: yup.string().required('Email harus diisi').email('Email tidak valid'),
});

const TambahEditMember = ({ isEdit }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { mutate: mutatePost, isLoading: loadingPost } = usePostMember();
    const { mutate: mutatePut, isLoading: loadingPut } = usePutMember();
    const { data, isLoading } = useMemberDetail(id);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        if (isEdit) {
            mutatePut(data);
        } else {
            mutatePost(data);
        }
    };

    useEffect(() => {
        if (isEdit) {
            setValue('id', data?.id);
            setValue('nama', data?.nama);
            setValue('alamat', data?.alamat);
            setValue('tglLahir', data?.tglLahir);
            setValue('noHp', data?.noHp);
            setValue('email', data?.email);
        }
    }, [isEdit, setValue, data]);

    if (isEdit && isLoading) return <Spinner full />;

    return (
        <>
            <h1 className="text-xl font-bold">
                {isEdit ? 'Edit Member' : 'Tambah Member'}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                {isEdit && <input type="hidden" {...register('id')} />}
                <div className="mt-8">
                    <div className="grid grid-cols-6 items-center mt-4">
                        <div className="col-span-1">
                            <label
                                htmlFor="nama"
                                className="text-sm font-medium"
                            >
                                Nama
                            </label>
                        </div>
                        <TextField
                            {...register('nama')}
                            id="nama"
                            placeholder="Masukkan Nama"
                            addstyle="col-span-3"
                        />
                    </div>
                    {errors.nama && (
                        <p className="text-red-500 text-sm">
                            {errors.nama.message}
                        </p>
                    )}
                    <div className="grid grid-cols-6 items-center mt-4">
                        <div className="col-span-1">
                            <label
                                htmlFor="alamat"
                                className="text-sm font-medium capitalize"
                            >
                                Alamat
                            </label>
                        </div>
                        <TextField
                            id="alamat"
                            {...register('alamat')}
                            placeholder="Masukkan Alamat"
                            addstyle="col-span-3"
                        />
                    </div>
                    {errors.alamat && (
                        <p className="text-red-500 text-sm">
                            {errors.alamat.message}
                        </p>
                    )}
                    <div className="grid grid-cols-6 items-center mt-4">
                        <div className="col-span-1">
                            <label
                                htmlFor="tglLahir"
                                className="text-sm font-medium capitalize"
                            >
                                Tanggal Lahir
                            </label>
                        </div>
                        <TextField
                            id="tglLahir"
                            {...register('tglLahir')}
                            addstyle="col-span-3"
                            type="date"
                        />
                    </div>
                    {errors.tglLahir && (
                        <p className="text-red-500 text-sm">
                            {errors.tglLahir.message}
                        </p>
                    )}
                   <div className="grid grid-cols-6 items-center mt-4">
                        <div className="col-span-1">
                            <label
                                htmlFor="noHp"
                                className="text-sm font-medium capitalize"
                            >
                                Nomor HP
                            </label>
                        </div>
                        <TextField
                            id="noHp"
                            {...register('noHp')}
                            placeholder="Masukkan Nomor HP"
                            addstyle="col-span-3"
                        />
                    </div>
                    {errors.noHp && (
                        <p className="text-red-500 text-sm">
                            {errors.noHp.message}
                        </p>
                    )}
                    {
                        isEdit &&  
                        <div className="grid grid-cols-6 items-center mt-4">
                            <div className="col-span-1">
                                <label
                                    htmlFor="emailEdit"
                                    addstyle="col-span-3"
                                >
                                    Email
                                </label>
                            </div>
                            <TextField
                                {...register('email')}
                                addstyle="col-span-3 bg-gray-400"
                                disabled
                            />
                        </div>
                    }
                     {
                        !isEdit &&  (
                        <div className="grid grid-cols-6 items-center mt-4">
                            <div className="col-span-1">
                                <label
                                    htmlFor="email"
                                    addstyle="col-span-3"
                                >
                                    Email
                                </label>
                            </div>
                            
                            <TextField
                                {...register('email')}
                                id="email"
                                placeholder="Masukkan Email"
                                addstyle="col-span-3"
                            />
                        </div>
                        )
                        
                    }
                    { !isEdit &&  
                        errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email.message}
                            </p>
                        )
                    }
                   
                   
                </div>
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
                        onClick={() => navigate(-1)}
                        isloading={loadingPost || loadingPut ? 1 : 0}
                    >
                        Batal
                    </Button>
                </div>
            </form>
        </>
    );
};

export default TambahEditMember;
