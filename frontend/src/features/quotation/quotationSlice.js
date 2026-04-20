import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { submitQuotation,getCustomerQuotations } from "../../services/quotationService"

// ==========================
// ASYNC THUNKS
// ==========================

// SUBMIT QUOTATIONS
export const submiTQuotation = createAsyncThunk(
  "submit/quotation",
  async ({ data, id }, thunkAPI) => {  // ✅ Receive as object
    console.log("ID received in thunk:", id)
    console.log("Data received in thunk:", data)
    try {
      const response = await submitQuotation(data, id)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      )
    }
  }
)
//Get customer quotations

export const getCusTomerQuotations = createAsyncThunk(
  "customer/quotations",
  async ({ page, limit }, thunkAPI) => {  // ✅ Receive as object
    try {
      const response = await getCustomerQuotations(page, limit)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      )
    }
  }
)



const initialState = {
  loading: false,
  error: null,
  quotation: [], // all quotations
  customerQuotations:[]
}

const quotationSlice = createSlice({
  name: "quotation",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // ==========================
      // SUBMIT QUOTATION
      // ==========================
      .addCase(submiTQuotation.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(submiTQuotation.fulfilled, (state, action) => {
        state.loading = false
        state.quotation.push(action.payload)
      })
      .addCase(submiTQuotation.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      //Get cusotmer quotations
      .addCase(getCusTomerQuotations.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getCusTomerQuotations.fulfilled, (state, action) => {
        state.loading = false
        state.customerQuotations.push(action.payload)
      })
      .addCase(getCusTomerQuotations.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default quotationSlice.reducer