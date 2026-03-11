import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { createRFQ, getRfqs } from "../../services/rfqService"

// CREATE RFQ

export const createRfq = createAsyncThunk(
  "rfq/create",
  async (data, thunkAPI) => {
    try {
      const response = await createRFQ(data)
      console.log(response,"response")
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      )
    }
  }
)

// GET RFQS

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

// INITIAL STATE

const initialState = {
  loading: false,
  error: null,
  rfqs: []
}

// SLICE

const rfqSlice = createSlice({
  name: "rfq",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder

      // CREATE RFQ

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

      // GET RFQS

      .addCase(getRfq.pending, (state) => {
        state.loading = true
      })

      .addCase(getRfq.fulfilled, (state, action) => {
        state.loading = false
        state.rfqs = action.payload.data
      })

      .addCase(getRfq.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

  }
})

export default rfqSlice.reducer