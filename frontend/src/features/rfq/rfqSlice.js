import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { createRFQ } from "../../services/rfqService"


// ============================
// CREATE RFQ THUNK
// ============================

export const createRfq = createAsyncThunk(
  "rfq/create",
  async (data, thunkAPI) => {
    try {

      const response = await createRFQ(data)

      return response.data

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      )

    }
  }
)


// ============================
// LOAD DATA FROM LOCAL STORAGE
// ============================

const token = localStorage.getItem("token")


// ============================
// INITIAL STATE
// ============================

const initialState = {
  token: token || null,
  loading: false,
  error: null,
  rfq: null
}


// ============================
// SLICE
// ============================

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
        state.rfq = action.payload
      })

      .addCase(createRfq.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

  }

})

export default rfqSlice.reducer