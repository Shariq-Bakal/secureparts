import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Profile from "./pages/user/Profile"
import ProtectedRoute from "./routes/ProtectedRoute"
import RoleBasedDashboard from "./pages/dash-board/RoleBasedDashboard"
function App() {

  return (
    <BrowserRouter>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={
            <ProtectedRoute>
            <Profile /> 
            </ProtectedRoute>} />

            <Route path="/dashboard" element={
            <ProtectedRoute>
            <RoleBasedDashboard />
            </ProtectedRoute>} />

        </Routes>
    </BrowserRouter>
  )
}

export default App