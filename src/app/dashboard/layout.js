

import AdminDashboardLayout from "@/components/pages/admin/AdminDashboardLayout"
import AuthorizationWrapper from "@/utils/authorization"
const Layout = ({ children }) => {


    return (<>
        <AuthorizationWrapper >

            <AdminDashboardLayout>

                {children}
            </AdminDashboardLayout>
        </AuthorizationWrapper>


    </>)
}

export default Layout