import { useSelector } from "react-redux"
import CustomerBasedDashboard from "./CustomerBasedDashboard"

const RoleBasedDashboard = () => {

  const user = useSelector((state) => state.auth.user)
  console.log(user)

  if (!user) return <div>Loading...</div>

  if (user.role === "admin") {
    return <div>Admin Dashboard</div>
  }

  if (user.role === "customer") {
    return <CustomerBasedDashboard/>
  }

  return <div>No Dashboard Found</div>
}

export default RoleBasedDashboard