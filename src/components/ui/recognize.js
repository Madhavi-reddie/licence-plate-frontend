'use client'
import axiosInstance from '@/utils/axiosInstance';
import { useState } from 'react';


const LicensePlateRecognitionForm = () => {
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null); // State to store the URL of the selected image
    const [result, setResult] = useState('not yet uploaded image');
    const [status, setStatus] = useState('upload image');
    const [errorMessage, setErrorMessage] = useState('');

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
        setImageUrl(URL.createObjectURL(file)); // Create URL for the selected image
    };

    const recognizeLicensePlate = async () => {
        if (!imageFile) {
            setErrorMessage('Please select an image before recognizing the license plate.');
            return;
        }

        const formData = new FormData();
        formData.append('upload', imageFile);

        try {
            setStatus('uploading image');
            const response = await fetch('https://api.platerecognizer.com/v1/plate-reader/', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': 'Token a8dfed6caef265edce7da0bd97c8bf3b040ef463'
                },
            });

            if (!response.ok) {
                throw new Error('Failed to recognize the plate.');
            }

            const data = await response.json();
            const plateNumber = data.results[0]?.plate ?? 'No plate detected';
            setStatus('number plated detected and checking permission');
            setResult(plateNumber);
            await checkAllowedOrNot(plateNumber);
        } catch (error) {
            console.error('Error:', error);
            setResult('Error occurred while recognizing the plate.');
        }
    };

    const checkAllowedOrNot = async (plateNumber) => {
        try {
            let response = await axiosInstance.post('/api/whitelist/check', { licensePlateNumber: plateNumber });
            setStatus(response.data.message);
        } catch (err) {
            console.log(`error occurred while checking vehicle`);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center border-2 shadow-sm p-5 rounded">
            <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleImageUpload}
                className="mb-4 border border-gray-300 rounded-md p-2"
            />
            {imageUrl && ( // Render image if imageUrl is not null
                <img src={imageUrl} alt="Selected Image" className="mb-4 rounded-md" style={{ maxWidth: '300px' }} />
            )}
            <button
                onClick={recognizeLicensePlate}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer"
            >
                Recognize Plate
            </button>
            {errorMessage && (
                <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
            <div className="text-center mt-4">
                <h3 className="font-semibold">Car number:</h3>
                <p className="text-lg">{result}</p>
                <h3 className="font-semibold mt-4">Status:</h3>
                <p className="text-lg">{status}</p>
            </div>
        </div>
    );
};

export default LicensePlateRecognitionForm;

