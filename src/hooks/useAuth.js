"use client"
import {AuthContext} from '@/utils/context'
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import {    isTokenExpired } from '@/utils/tokenHelpers'

const AuthProvider = ({children}) =>{


    const [userToken , setUserToken] = useState(null)

   
   
    useEffect( () =>{
    
        const  TokenLoadingAndCheckingTokenExpired = async () =>{

            let userStoredToken = await getToken()
            if(  userStoredToken != null && isTokenExpired(userStoredToken)){

                removeToken()
            }
            else{
                setUserToken(userStoredToken)
            }
            
           }
           TokenLoadingAndCheckingTokenExpired()

    },[])
    const login = useCallback((token) =>{
        setToken(token)
        setUserToken(token)
      
    },[])
    const logout = useCallback(()=>{
        removeToken()
        setUserToken(null)
    } ,[])

    const contextValue  = useMemo(() =>{

        return {
            userToken,
            login,
            logout
        }
    },[userToken,login,logout])
    return (<> <AuthContext.Provider  value={contextValue} > {children}</AuthContext.Provider></>)
}


const useToken = () =>{

    return useContext(AuthContext)['userToken']
}
export {
    AuthProvider,
    useToken
}

const useAuth  = () =>{

    return  useContext(AuthContext)
    
}

export default useAuth  ;

const getToken = () =>{

    return localStorage.getItem('token')
}
const setToken = (token) =>{
     localStorage.setItem('token',token)
}
const removeToken = () =>{

    localStorage.clear()
}

