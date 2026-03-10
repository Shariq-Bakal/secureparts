import { useState } from "react"
import AuthLayout from "../../layouts/AuthLayout"
import { useDispatch } from "react-redux"
import { login } from "../../features/auth/authSlice.js"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import { Link } from "react-router-dom"
function Login(){
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(login({
        email,
        password
    }))
    setEmail("")
    setPassword("")
  }

  return(

    <AuthLayout>

      <div className="bg-white p-8 rounded shadow w-96">

        <h2 className="text-xl font-bold mb-4">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <Button>
            Login
          </Button>

        </form>
        

      </div>

    </AuthLayout>

  )
}

export default Login