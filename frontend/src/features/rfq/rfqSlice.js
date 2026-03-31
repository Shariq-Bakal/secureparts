import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  createRFQ,
  getRfqs,
  getCustomerRfqs,
  getOpenRFQs,
  getOpenRFQDetails
} from "../../services/rfqService"


// ==========================
// ASYNC THUNKS
// ==========================

// CREATE RFQ
export const createRfq = createAsyncThunk(
  "rfq/create",
  async (data, thunkAPI) => {
    try {
      const response = await createRFQ(data)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      )
    }
  }
)

// GET ALL RFQs
export const getRfq = createAsyncThunk(
  "rfq/get",
  async (page, thunkAPI) => {
    try {
      const response = await getRfqs(page)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      )
    }
  }
)

// GET CUSTOMER RFQs
export const getCustRFqs = createAsyncThunk(
  "rfq/customer",
  async (page, thunkAPI) => {
    try {
      const response = await getCustomerRfqs(page)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      )
    }
  }
)

// GET OPEN RFQs (VENDOR)
export const getOpenRfqs = createAsyncThunk(
  "rfq/open",
  async (page, thunkAPI) => {
    try {
      const response = await getOpenRFQs(page)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      )
    }
  }
)
//get open rfq details
export const getOpenRfqsDetail = createAsyncThunk(
  "rfq/openrfqdetails",
  async (id, thunkAPI) => {
    try {
      const response = await getOpenRFQDetails(id)
      console.log(response)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      )
    }
  }
)

// ==========================
// INITIAL STATE
// ==========================

const initialState = {
  loading: false,
  error: null,

  rfqs: [],           // all RFQs
  customerRfqs: [],   // customer RFQs
  openRfqs: [],        // vendor open RFQs ✅ FIXED
  openRfqDetails:{}

  // Optional (future scaling)
  // totalPages: 1,
  // currentPage: 1
}

// ==========================
// SLICE
// ==========================

const rfqSlice = createSlice({
  name: "rfq",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ==========================
      // CREATE RFQ
      // ==========================

      .addCase(createRfq.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(createRfq.fulfilled, (state, action) => {
        state.loading = false
        state.rfqs.push(action.payload)
      })

      .addCase(createRfq.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // ==========================
      // GET ALL RFQs
      // ==========================

      .addCase(getRfq.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(getRfq.fulfilled, (state, action) => {
        state.loading = false
        state.rfqs = action.payload.rfqs || action.payload.data || []
      })

      .addCase(getRfq.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // ==========================
      // GET CUSTOMER RFQs
      // ==========================

      .addCase(getCustRFqs.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(getCustRFqs.fulfilled, (state, action) => {
        state.loading = false
        state.customerRfqs =
          action.payload.rfqs || action.payload.data || []
      })

      .addCase(getCustRFqs.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // ==========================
      // GET OPEN RFQs (FIXED)
      // ==========================

      .addCase(getOpenRfqs.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(getOpenRfqs.fulfilled, (state, action) => {
        state.loading = false
        state.openRfqs =
          action.payload.rfqs || action.payload.data || [] // ✅ FIXED
      })

      .addCase(getOpenRfqs.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      //get open rfq details
      .addCase(getOpenRfqsDetail.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(getOpenRfqsDetail.fulfilled, (state, action) => {
        state.loading = false
        console.log(action.payload,"sfsddsfds")
        state.openRfqDetails =
          action.payload.rfqs || action.payload.data || action.payload || {} // ✅ FIXED
      })

      .addCase(getOpenRfqsDetail.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default rfqSlice.reducer