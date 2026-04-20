import api from "./api";


export const submitQuotation = async (data,id) => {

  const token = localStorage.getItem("token")
  console.log(id,"quotation service")
  const response = await api.post(
    `/quotations/submitquotation/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return response.data
}
//Get quotations submitted by vendor
export const getCustomerQuotations = async (page = 1, limit = 10) => {
    try {
        const token = localStorage.getItem("token");
        
        const response = await api.get(
            `/quotations/customer-quotations?page=${page}&limit=${limit}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}` // Attaching the token to the request
                }
            }
        );
        
        return response.data;
    } catch (error) {
        // Optional: Good practice to handle or log the error
        console.error("Failed to fetch quotations:", error);
        throw error; // Rethrow so your Redux thunk can catch it
    }
}