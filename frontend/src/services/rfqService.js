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

export const getOpenRFQs = async (page) => {

  const token = localStorage.getItem("token")

  const response = await api.get(`rfq/openrfqs?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  console.log(response.data)

  return response.data
}


export const getOpenRFQDetails = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No auth token found");

    const response = await api.get(`rfq/openrfqs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.rfqDetails;

  } catch (error) {
    console.error("Error fetching RFQ details:", error);

    // Return a consistent error object
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Failed to fetch RFQ details",
    };
  }
};

export const getCustomerRfqs = async (page, limit) => {
  const token = localStorage.getItem("token");

  const response = await api.get(`/rfq/my-rfqs`, {
    params: { page, limit }, // ✅ clean
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data, "Customer services")

  return response.data; // ✅ IMPORTANT
};