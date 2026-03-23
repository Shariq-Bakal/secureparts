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

export const getRfqs = async (page) => {

  const token = localStorage.getItem("token")

  const response = await api.get(`/user/rfqs?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  console.log(response.data)

  return response.data
}

export const getCustomerRfqs = async (page, limit) => {
  const token = localStorage.getItem("token");

  const response = await api.get(`/rfq/my-rfqs`, {
    params: { page, limit }, // ✅ clean
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data; // ✅ IMPORTANT
};