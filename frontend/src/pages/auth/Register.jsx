import { useState } from "react"
import AuthLayout from "../../layouts/AuthLayout"
import { useDispatch } from "react-redux"
import { register } from "../../features/auth/authSlice"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"

function Login(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [name,setName] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(register({
      email,
      password,
      name
    }))
    console.log({
      email,
      password,
      role
    })
  }

  return(

    <AuthLayout>

      <div className="bg-white p-8 rounded shadow w-96">

        <h2 className="text-xl font-bold mb-4">
          REGISTER
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
          <Input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <Button>
            REGISTER
          </Button>

        </form>

      </div>

    </AuthLayout>

  )
}

export default Login