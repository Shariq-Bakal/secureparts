import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Profile from "./pages/user/Profile"
import ProtectedRoute from "./routes/ProtectedRoute"
import RoleBasedDashboard from "./pages/dash-board/RoleBasedDashboard"
import CreateRfq from "./pages/rfq/CreateRfq"
import RFQList from "./pages/rfq/RfqList"
import Home from "./pages/nondynamicpages/Home"
import About from "./pages/nondynamicpages/About"
import Contact from "./pages/nondynamicpages/Contact"
function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path = "/" element={<Home/>}/>
          <Route path = "/about" element={<About/>}/>
          <Route path = "/contact" element={<Contact/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={
            <ProtectedRoute>
            <Profile /> 
            </ProtectedRoute>} />
          <Route path="/dashboard/:tab?" element={
            <ProtectedRoute>
            <RoleBasedDashboard/>
            </ProtectedRoute>} />
          <Route path = "/createrfq" element={
            <ProtectedRoute>
            <CreateRfq/>
            </ProtectedRoute>
          }/>
          <Route path = "/rfqs" element={<RFQList/>}/>
          
        </Routes>
        
    </BrowserRouter>
  )
}

export default App