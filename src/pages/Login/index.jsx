import React, { useEffect, useRef, useState } from 'react'
import Logo from '../../assets/img/gofit.png'
import { ROUTES } from '../../utils/helper/routes'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuthStore from '../../utils/setup/useAuthStore'
import { useLogin } from './hooks/useLogin'
import { useForm } from 'react-hook-form'
import Button from '../../components/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import 'yup-phone'
import Clip from '../../assets/video/zoro.mp4'

let schema = yup.object().shape({
    email: yup.string().required('Email harus diisi').email('Email tidak valid'),
    password: yup.string().required('Password harus diisi'),
});

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const user = useAuthStore((state) => state.user);

    const { mutate, isLoading } = useLogin();

    const onSubmit = (data) => {
        mutate(data);
    };

    const redirectPath = location.state?.from || ROUTES.DASHBOARD;

    useEffect(() => {
        if (user) {
            navigate(redirectPath);
        }
    }, [user, navigate, redirectPath]);

    if(user) return;

    return (
            
        // <video src={Clip} autoPlay loop muted />
        <div className='relative w-full h-screen bg-zinc-900/50'>
            <video className='absolute w-full h-full object-cover mix-blend-overlay' src={Clip} autoPlay loop muted />
            {/* <img className='absolute w-full h-full object-cover mix-blend-color-burn 'src={Background} alt="/" /> */}
            <div className='flex flex-col justify-center items-center h-full '>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='max-w-[500px] w-full mx-auto bg-gray-800 p-8 rounded shadow-xl shadow-violet-500'>
                    <div className='flex flex-row justify-center items-center text-white'>
                        <img src={Logo} alt="gofit" className="w-12 h-12 rounded-full mr-2 mx-6" />
                        <h2 className='text-4xl font-bold text-center py-4 px-10'>Gofit Gym</h2>
                    </div>
                   
                    <div className='flex flex-col mb-4 py-2'>
                        <label className='text-white text-center mix-blend-screen'>Email</label>
                        <input
                            // name='email'
                            {...register('email')}
                            className='rounded-lg border relative bg-violet-100 p-3 mx-1 w-full' type="text" required/>
                            {errors.email && (
                              <p className="text-white text-center mix-blend-screen">
                                    {errors.email.message}
                                </p>
                            )}
                    </div>
                   
                    <div className='flex flex-col mb-4 py-2'>
                        <label className='text-white text-center mix-blend-screen'>Password</label>
                        <input
                            name='password'
                            {...register('password')}
                            className='rounded-lg border relative bg-violet-100 p-3 mx-1 w-full' type="password" />
                            {errors.password && (
                                <p className="text-white text-center mix-blend-screen">
                                    {errors.password.message}
                                </p>
                            )}
                    </div>
                    {/* <button className='w-full py-3 mt-8 bg-violet-400 hover:bg-violet-600 relative text-white rounded-full'>Sign In</button> */}
                    <Button type="submit" isloading={isLoading ? 1 : 0}>Sign In </Button>
                </form>
            </div>
        </div>
        
    )
}

export default Login
