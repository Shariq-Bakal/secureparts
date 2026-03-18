import { useSelector } from "react-redux"
import CustomerBasedDashboard from "./CustomerBasedDashboard"
import VendorBasedDashboard from "./VendorBasedDashboard"
import AdminDashboard from "./AdminBasedDashboard"

const RoleBasedDashboard = () => {

  const user = useSelector((state) => state.auth.user)
  console.log(user)

  if (!user) return <div>Loading...</div>

  if (user.role === "admin") {
    return <AdminDashboard/>
  }

  if (user.role === "customer") {
    return <CustomerBasedDashboard/>
  }
  if(user.role==="vendor"){
    return <VendorBasedDashboard/>
  }

  return <div>No Dashboard Found</div>
}

export default RoleBasedDashboard