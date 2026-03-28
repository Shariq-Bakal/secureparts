import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getDashboardStats, getUsers, getRecentRFQs, getPendingVendors, approveVendor } from "../../services/adminService"


// ============================
// GET DASHBOARD STATS
// ============================

export const getStats = createAsyncThunk(
  "admin/dashboardstats",
  async (_, thunkAPI) => {
    try {

      const response = await getDashboardStats()
      return response.data

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      )

    }
  }
)
//approve vendor
export const approveVend = createAsyncThunk(
  "admin/approveVendor",
  async (id, thunkAPI) => {
    try {
      const res = await approveVendor(id);

      // ✅ return only vendors array
      return res.vendors;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

// ============================
// GET USERS
// ============================

export const getAllUsers = createAsyncThunk(
  "admin/users",
  async (page, thunkAPI) => {  // Add page parameter

    try {
      // Pass the page to your service function
      const response = await getUsers(page)
      return response

    } catch (error) {
      console.error("Error in getAllUsers:", error)
      
      // Better error handling
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        "Something went wrong"
      )
    }
  }
)

// ============================
// GET RFQs
// ============================

export const getRFQs = createAsyncThunk(
  "admin/rfqs",
  async (page, thunkAPI) => {

    try {

      const response = await getRecentRFQs(page)
      return response.data

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      )

    }
  }
)

export const getAllPendingVendors = createAsyncThunk(
  "admin/pedingvendors",
  async (page, thunkAPI) => {

    try {

      const response = await getPendingVendors(page)
      console.log(response,"sfsfsf")
      return response

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      )

    }
  }
)


// ============================
// INITIAL STATE
// ============================

const initialState = {

  loading: false,
  error: null,

  stats: {},
  users: [],
  rfqs: [],
  pendingVendors:[],
  noPendingVendors: false,
}


// ============================
// SLICE
// ============================

const adminSlice = createSlice({

  name: "admin",
  initialState,
  reducers: {},

  extraReducers: (builder) => {

    builder

      // ========================
      // DASHBOARD STATS
      // ========================

      .addCase(getStats.pending, (state) => {
        state.loading = true
      })

      .addCase(getStats.fulfilled, (state, action) => {
        state.loading = false
        state.stats = action.payload
      })

      .addCase(getStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })


      // ========================
      // USERS
      // ========================

      .addCase(getAllUsers.pending, (state) => {
        state.loading = true
      })

      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })

      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })


      // ========================
      // RFQS
      // ========================

      .addCase(getRFQs.pending, (state) => {
        state.loading = true
      })

      .addCase(getRFQs.fulfilled, (state, action) => {
        state.loading = false
        state.rfqs = action.payload
      })

      .addCase(getRFQs.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      //pending Vendors

      .addCase(getAllPendingVendors.pending, (state) => {
        state.loading = true
      })

      .addCase(getAllPendingVendors.fulfilled, (state, action) => {
        state.loading = false
        state.pendingVendors = action.payload
      })

      .addCase(getAllPendingVendors.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      //approveVendor
      .addCase(approveVend.pending, (state) => {
        state.loading = true
      })

      .addCase(approveVend.fulfilled, (state, action) => {
        state.loading = false
        // update vendors list
        state.pendingVendors = action.payload.vendors || []
        state.noPendingVendors = action.payload.length === 0; //this will set true
      })

      .addCase(approveVend.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }

})


export default adminSlice.reducer