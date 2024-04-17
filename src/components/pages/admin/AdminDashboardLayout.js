"use client"
import Link from "next/link"
import { useRef, useState } from "react"
const AdminDashboardLayout = ({ children }) => {


    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
    const subMenuRef = useRef(null)

    const submenuHandler = () => {

        setIsSubmenuOpen((prev) => !prev)
        // subMenuRef.current.classList.toggle('')
        subMenuRef.current.classList.toggle('w-full')
    }
    return (<>
        <div className="md:flex md:h-full">

            <div className="md:w-56 overflow-y-auto    " >

                <button className="border-2 m-1 py-1 px-2 p-1 md:hidden" onClick={submenuHandler}>

                    {isSubmenuOpen ? <span> &#x274C;</span> : <span>&#x2630;</span>}
                </button>

                <SubMenuNavBar isSubmenuOpen={isSubmenuOpen} submenuHandler={submenuHandler} subMenuRef={subMenuRef} />
            </div>
            <div className="flex-1 bg-white h-full p-5">
                {children}
            </div>
        </div>

    </>)
}

const NavItems = [
    {
        title: 'users',
        link: '/dashboard/users'
    },
    {
        title: 'whitelist',
        link: '/dashboard/whitelist'
    }
]

const SubMenuNavBar = ({ subMenuRef }) => {

    return (
        <>
            <div ref={subMenuRef} className={` bg-gray-200 h-full absolute md:static w-0 md:w-full overflow-hidden  h-[80vh] transition-all duration-1000	    `}>


                <p className="m-5"> Menu</p>
                <div className="flex   flex-col justify-center gap-5 mt-10  items-center md:justify-normal md:items-center list-none h-full">


                    {NavItems.map((item, index) => (

                        <NavItem key={index} {...item} />
                    ))}
                </div>

            </div>

        </>
    )
}

const NavItem = ({ title, link }) => {

    return (<>
        <li className="border-2  text-white py-2 px-4 text-center  font-bold rounded bg-blue-500  hover:bg-blue-700"><Link href={`${link}`}>{title}</Link> </li>
    </>)
}
export default AdminDashboardLayout