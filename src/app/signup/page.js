'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '@/utils/axiosInstance';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
const SignupPage = () => {


    return (<>

        <AddUserComponent />
    </>);
};

export default SignupPage

const AddUserComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    const router = useRouter()

    const onSubmit = async (values) => {
        try {
            setIsLoading(true);
            let response = await addUserAPICall(values);
            if (response.status === 201) {
                toast.success('User created');
               router.replace('/login')
            } else {
                toast.error('Something went wrong');
                reset();
            }
            setIsLoading(false);
        } catch (err) {
            console.error('Error occurred while creating user', err);
        }
    };

    return (
        <>
            <div className='flex justify-center items-center h-full'>
                <div className='flex flex-col gap-2'>
                    <h2 className="text-lg text-center font-semibold mb-4">signup</h2>
                    <AddUserComponentUi isLoading={isLoading} register={register} onSubmit={handleSubmit(onSubmit)} />
                </div>
            </div>
        </>
    );
};

const AddUserComponentUi = ({ isLoading, register, onSubmit }) => {
    return (
        <>
            <form onSubmit={onSubmit} className="flex flex-col">
                <input {...register('name')} className="mb-2 px-3 py-1 border rounded" placeholder="Name" />
                <input {...register('email')} type="email" className="mb-2 px-3 py-1 border rounded" placeholder="Email" />
                <input {...register('password')} type="password" className="mb-2 px-3 py-1 border rounded" placeholder="Password" />
                <button type="submit" disabled={isLoading} className=" w-full hover:bg-blue-600 px-4 py-2 bg-blue-500 text-white rounded">
                    {isLoading ? 'Adding...' : 'Add'}
                </button>
            </form>
        </>
    );
};
const addUserAPICall = async (payload) => {
    let response = await axiosInstance.post('/api/user/signup', payload,);
    return response;
};
