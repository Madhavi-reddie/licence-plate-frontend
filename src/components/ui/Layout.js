"use client"
import useAuth from '@/hooks/useAuth'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const LayoutComponent = ({ children }) => {

    const [isMenuBarOpen, setIsMenuBarOpen] = useState(false)
    return (

        <>

            <div className="h-screen flex flex-col ">

                <Header isMenuBarOpen={isMenuBarOpen} setIsMenuBarOpen={setIsMenuBarOpen} />
                {!isMenuBarOpen && <div className='h-[100%]  overflow-auto'>

                    {children}
                </div>}

                {!isMenuBarOpen && <Footer />}
            </div>
        </>
    )
}


export default LayoutComponent



const Header = ({ setIsMenuBarOpen, isMenuBarOpen }) => {


    const pathname = usePathname()


    useEffect(() => {
        if (isMenuBarOpen == true) {
            setIsMenuBarOpen(false)
        }

    }, [pathname])
    return (<>

        <div className='flex flex-col sticky top-0'>
            <div className='border-2 shadow  py-4 px-2 flex  justify-between items-center'>

                <div>
                    {/* logo */}
                    <p className='text-2xl font-extrabold text-blue-500 '>  Licence plate detection</p>
                </div>


                <div className='hidden md:flex gap-5 '>
                    <PrimaryNavbar />

                </div>

                <div className='hidden md:flex gap-5 '>
                    <SecundaryNavbar />
                </div>

                <div className=' md:hidden font-black text-2xl  ml-auto '>
                    <button onClick={() => { setIsMenuBarOpen((prev) => !prev) }}>   {isMenuBarOpen ? <span> &#x274C;</span> : <span>&#x2630;</span>}  </button>
                </div>
            </div>

            {isMenuBarOpen && <div className={`md:hidden h-[90Vh]  items-center flex flex-col gap-5 justify-around transition-opacity transition-max-h ease-linear duration-1000 `}>

                <PrimaryNavbar />
                <SecundaryNavbar />
            </div>
            }

        </div>
    </>)
}

const PrimaryNavbar = () => {

    return (<>
        <button className='our-button'> 
        <Link href={'/'}>  Home</Link>
        </button>
    </>)
}

const SecundaryNavbar = () => {


   const {userToken:token , logout} = useAuth()

    if (token) {

        return (
            <>
                <button className='our-button'> <Link href={`/dashboard`}> Dashboard</Link>  </button>
                <button className='our-button' onClick={() =>logout()}> logout</button>
            </>
        )
    }
    return (<>
        <button className='our-button'>  <Link href={'/login'}>  Login</Link></button>
    </>)
}

const Footer = () => {


    // I DON't think it is need     
    return (

        <div className='bg-gray-100'>

            <p className=' text-center '>
            
              {/* <span className='text-red-500'>&#10084;</span> */}
              
              {/* Made   by <Link href={'/https://www.linkedin.com/in/siva-ramireddy-baram-1269261aa/'}> Siva Rami reddy</Link> */}

              </p>
        </div>
    )
}