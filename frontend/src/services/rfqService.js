import axios from "axios"
import api from "./api"

export const createRFQ = async (data) => {

  const token = localStorage.getItem("token")

  const response = await api.post(
    "/rfq/create",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return response.data
}