'use client'
import { useState } from 'react';
import LicensePlateRecognitionForm from '@/components/ui/recognize';
import axiosInstance from '@/utils/axiosInstance';
export default function Home() {
  return (
    <div className=" flex gap-5 justify-center items-center h-full">
      <LicensePlateRecognitionForm />
      <NumberPlateRecognitionForm />
    </div>
  );
}

const NumberPlateRecognitionForm = () => {
  const [status, setStatus] = useState('please enter number');
  const [errorMessage, setErrorMessage] = useState('');
  const [plate, setPlate] = useState('');
  const [isLoading ,setIsLoading] = useState(false)
  const checkAllowedOrNot = async (plateNumber) => {
    try {
      let response = await axiosInstance.post('/api/whitelist/check', { licensePlateNumber: plateNumber });
      setStatus(response.data.message);
    } catch (err) {
      console.log(`error occurred while checking vehicle`);
    }
  }

  return (
    <div className="p-4  rounded-md shadow-md">
      <input 
        placeholder='Enter number plate' 
        className="w-full p-2 mb-2 border rounded-md focus:outline-none focus:border-blue-500" 
        onChange={(e) => setPlate(e.target.value)} 
      />
      <button 
        onClick={async () => {

          if (plate === '') {
            setStatus('Please enter number');
          } else {
            setIsLoading(true);
            await checkAllowedOrNot(plate);
            setIsLoading(false);
          }
        }}
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
      {isLoading?"checking please wait":"check permision"}
      </button>
      <p className="mt-2  justify-center">{status}</p>
    </div>
  );
}
