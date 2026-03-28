import api from "./api";

export const getDashboardStats = async () => {

  const token = localStorage.getItem("token")

  const response = await api.get("/admin/dashboardstats", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const getUsers = async (page) => {

  const token = localStorage.getItem("token")
  if (!token) {
  throw new Error("No authentication token found")
}
  const response = await api.get(
    `/admin/users?page=${page}&limit=${5}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  console.log(response.data)
  return response.data
}

// export const getPendingVendors = async () => {

//   const token = localStorage.getItem("token")

//   const response = await api.get("/admin/dashboardstats", {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   })
//   console.log(response,"Response")

//   return response.data
// }

export const getRecentRFQs = async (page) => {

  const token = localStorage.getItem("token")
  if (!token) {
  throw new Error("No authentication token found")
}
  const response = await api.get(`/admin/rfqs/recent?page=${page}&limit=${5}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const getPendingVendors = async (page) => {

  const token = localStorage.getItem("token")
  if (!token) {
  throw new Error("No authentication token found")
}
  const response = await api.get(`/admin/pending-vendors?page=${page}&limit=${5}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  console.log("responsed",response.data.vendors)
  return response.data.vendors
}

//approve vendor

export const approveVendor = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.patch(
    `/admin/approve-vendor/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// router.get("/dashboardstats",verifyAccessToken,verifyRole("admin"),getDashboardStats)
// router.get("/rfqs/recent",verifyAccessToken,verifyRole("admin"),getRecentRFQS)
// router.get("/quotations/recent",verifyAccessToken,verifyRole("admin"),getRecentQuotations)
// router.get("/users",verifyAccessToken,verifyRole("admin"),getAllUsers)
// router.patch("/approve-vendor/:id",verifyAccessToken,verifyRole("admin"),approveVendor)
// router.delete("/deleteuser/:id",verifyAccessToken,verifyRole("admin"),deleteUser)