"use client"
import { useToken } from "@/hooks/useAuth"
import Link from "next/link"



const AuthorizationWrapper = ({ children }) => {


    let token = useToken()
    if (token == null) {

        return (
            <>

                <div className="flex justify-center items-center h-full ">

                    <div className=" bg-white p-5 rounded  ">
                        <p className="capitalize">
                            you need to  <Link className="text-blue-500" href={`/login`}> Login</Link>

                        </p>
                    </div>
                </div>
            </>
        )
    }
   

        
        return (
            <>
                {children}
            </>
        )
    
}
export default AuthorizationWrapper 