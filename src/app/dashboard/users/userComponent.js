'use client'
import axiosInstance from '@/utils/axiosInstance';
import { useToken } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const UserComponent = () => {
    return (
        <>
            <h1 className="text-2xl font-semibold mb-4 text-center">User Management</h1>
            <UserComponentUi />
        </>
    );
};

export default UserComponent;

const UserComponentUi = () => {
    return (
        <>
            <div className=" flex flex-col gap-5 items-center mt-8  p-4 border rounded shadow-lg">
                <div>
                    <AddUserComponent />

                </div>
                <div>
                    <AllUserComponent />
                </div>
            </div>
        </>
    );
};

const AddUserComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    let token = useToken();

    const onSubmit = async (values) => {
        try {
            setIsLoading(true);
            let response = await addUserAPICall(values, token);
            if (response.status === 201) {
                toast.success('User created');
                window.location.reload();
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
            <h2 className="text-lg font-semibold mb-4">Add User</h2>
            <AddUserComponentUi isLoading={isLoading} register={register} onSubmit={handleSubmit(onSubmit)} />
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
                <button type="submit" disabled={isLoading} className=" w-24 px-4 py-2 bg-blue-500 text-white rounded">
                    {isLoading ? 'Adding...' : 'Add'}
                </button>
            </form>
        </>
    );
};

const AllUserComponent = () => {
    const [users, setUsers] = useState(null);
    let token = useToken();

    useEffect(() => {
        const getUsers = async () => {
            let response = await fetchAllUserAPICall(token);
            setUsers(response.users);
        };
        getUsers();
    }, []);

    return (
        <>
            <h2 className="text-lg font-semibold mb-4">All Users</h2>
            <AllUserComponentUi users={users} />
        </>
    );
};

const AllUserComponentUi = ({ users }) => {
    return (
        <>
            {users === null ? (
                <div>Loading...</div>
            ) : (
                <div className=" p-4 border rounded shadow-lg">
                    {users.length === 0 ? (
                        <div>No users found</div>
                    ) : (
                        <div className='md:grid md:grid-cols-3 md:gap-11'>
                            {users.map((user, index) => (
                                <div key={index} className=" p-2 border rounded">
                                    <div>
                                        <p className="font-semibold">Name:</p>
                                        <p>{user.name}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Email:</p>
                                        <p>{user.email}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

const fetchAllUserAPICall = async (token) => {
    let response = await axiosInstance.get('/api/user/', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

const addUserAPICall = async (payload, token) => {
    let response = await axiosInstance.post('/api/user/signup', payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};
