
import { AuthProvider } from "@/hooks/useAuth"
import { Toaster } from "react-hot-toast"
const Providers = ({ children }) => {



    return (
        <>

            <Toaster />
            <AuthProvider>
                {children}
            </AuthProvider>
        </>


    )

}
export default Providers