
'use client'
import axiosInstance from '@/utils/axiosInstance';
import { useToken } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
const Admindashboard = () =>{


    return (<>
        <AllNumberPlateComponent></AllNumberPlateComponent>
    </>)
}

export default Admindashboard;

const AllNumberPlateComponent = () => {
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

const FetchNumberPlateAPICall = async (token) => {
    let response = await axiosInstance.get('/api/whitelist', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

const AllNumberPlateComponentUI = ({ numberPlates, token }) => {
    const router = useRouter();

    return (
        <>
            <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow-lg">
                <p className="text-lg font-semibold mb-4">All  Licence Plate Numbers</p>
                {numberPlates === null && <div>Loading...</div>}
                {numberPlates !== null && (
                    <div className='md:grid md:grid-cols-3 md:gap-5'> 
                        {numberPlates.length === 0 ? (
                            <div>No data yet</div>
                        ) : (
                            numberPlates.map((p, i) => (
                                <div key={i} className="mb-4 p-2 border rounded">
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
