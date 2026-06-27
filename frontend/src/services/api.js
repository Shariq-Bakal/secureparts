import axios from "axios"

const api = axios.create({

  baseURL: "http://localhost:5000/api",
  withCredentials: true // 👈 This is required for the logout to work!

})

export default api