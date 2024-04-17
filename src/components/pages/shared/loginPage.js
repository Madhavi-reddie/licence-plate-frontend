'use client'

import { useForm } from "react-hook-form"
import axiosInstance from '@/utils/axiosInstance'
import useAuth from "@/hooks/useAuth"
import { useState } from "react"

import { useRouter } from 'next/navigation'

const LoginPage = () => {


    const { login } = useAuth()
    const [IsLoading, setIsLoading] = useState(false)
    const [Error, setError] = useState('')
      const router = useRouter()

    const { register, handleSubmit ,reset} = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (value) => {
        try {

            setIsLoading(true)
            let response = await axiosInstance.post('/api/user/login', value);


            if (response.status == 200) {

                login(response.data.token)
                router.replace('/')

            }
            else if ( response.status == 401){
                reset()
                setError('Invalid credentials')
            }
            else{
                    reset()
                setError('Server error')
            }
            setIsLoading(false)
        }
        catch (err) {
            console.log(`Error occured while loging... ` + err)
            setError('something went wrong...')
        }

    }
    return (
        <>

            <div className="flex justify-center items-center h-full">

                <LoginUI onSubmit={handleSubmit(onSubmit)} Error={Error} IsLoading={IsLoading} register={register} />

            </div>


        </>
    )
}

export default LoginPage


const LoginUI = (props) => {

    const { onSubmit, register, IsLoading,Error } = props
    return (<>


        <div className="shadow-md bg-white  rounded p-5">
            <p className="text-2xl text-center py-5"> Login </p>


            <div className="text-red-500  my-1 rounded  font-semibold">
                {Error}
            </div>
            <form className="flex flex-col  gap-5 justify-center items-center" onSubmit={onSubmit} >

                <input placeholder="Enter your email" className="rounded py-2 px-4 border-2 " {...register('email')} />
                <input type="password" placeholder="Enter your password"  {...register('password')} className="rounded py-2 px-4 border-2" />


                <button type="submit" className="action-button disabled:bg-blue-200" disabled={IsLoading}> {IsLoading ? 'logging ..' : 'login'}  </button>
            </form>
        </div>
    </>)
}