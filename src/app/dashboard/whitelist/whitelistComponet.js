
'use client'
import axiosInstance from '@/utils/axiosInstance';
import { useToken } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';

const whitelistComponent = () => {
    return (
        <>
            <WhitelistComponentUI />
        </>
    );
};

export default whitelistComponent;

const WhitelistComponentUI = () => {
    return (
        <>
            <div className=" overflow-y-auto  flex   gap-5 items-center  flex-col mt-8 p-4 border rounded shadow-lg">

            <div>
            <AddNumberPlateComponent />

            </div>
                <div>
                <AllNumberPlateComponent />

                </div>
               
            </div>
        </>
    );
};

const AddNumberPlateComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    let token = useToken();

    const onSubmit = async (values) => {
        try {
            setIsLoading(true);
            let response = await AddNumberPlateAPICall(values, token);
            if (response.status === 201) {
                toast.success('Created number plate');
                window.location.reload();
            } else {
                toast.error('Something went wrong');
                reset();
            }
            setIsLoading(false);
        } catch (err) {
            console.error('Error occurred while creating whitelist', err);
        }
    };

    return (
        <>
            <AddNumberPlateComponentUI isLoading={isLoading} register={register} onSubmit={handleSubmit(onSubmit)} />
        </>
    );
};

const AddNumberPlateComponentUI = ({ isLoading, register, onSubmit }) => {
    return (
        <>
            <h3 className="text-lg font-semibold mb-4">Add Number Plate</h3>
            <form onSubmit={onSubmit} className="flex items-center">
                <input placeholder='number plate' {...register('licencePlatenumber')} className="mr-2 px-3 py-1 border rounded" />
                <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-500 text-white rounded">
                    {isLoading ? 'Adding...' : 'Add'}
                </button>
            </form>
        </>
    );
};

export const AllNumberPlateComponent = () => {
    const [numberPlates, setNumberPlates] = useState(null);
    let token = useToken();

    useEffect(() => {
        const getPlates = async () => {
            let response = await FetchNumberPlateAPICall(token);
            setNumberPlates(response.plates);
        };
        getPlates();
    }, []);

    return (
        <>
            <AllNumberPlateComponentUI numberPlates={numberPlates} token={token} />
        </>
    );
};

const AllNumberPlateComponentUI = ({ numberPlates, token }) => {
    const router = useRouter();

    return (
        <>
            <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow-lg">
                <p className="text-lg font-semibold mb-4">All Whitelist Licence Plate Numbers</p>
                {numberPlates === null && <div>Loading...</div>}
                {numberPlates !== null && (
                    <div className='md:grid md:grid-cols-3 md:gap-5'> 
                        {numberPlates.length === 0 ? (
                            <div>No data yet</div>
                        ) : (
                            numberPlates.map((p, i) => (
                                <div key={i} className="mb-4 p-2 border rounded">
                                    <div className="flex justify-between">
                                        <button
                                            onClick={async () => {
                                                await DeleteNumberPlateAPICall(p._id, token);
                                                window.location.reload();
                                            }}
                                            className="px-3 py-1 bg-red-500 text-white rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Licence Plate</p>
                                        <p>{p.licencePlatenumber}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Created By</p>
                                        {p.createdBy ? <p>{p.createdBy.name}</p> : <p>User deleted</p>}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

const FetchNumberPlateAPICall = async (token) => {
    let response = await axiosInstance.get('/api/whitelist', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

const AddNumberPlateAPICall = async (payload, token) => {
    let response = await axiosInstance.post('/api/whitelist', payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};

const DeleteNumberPlateAPICall = async (id, token) => {
    let response = await axiosInstance.delete(`/api/whitelist/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};
