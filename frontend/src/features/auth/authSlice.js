import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { loginUser, registerUser,logoutUser } from "../../services/authService"

//logout thunk

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        const response = await logoutUser(); // Your perfect function!
        return response?.data || response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
// ============================
// REGISTER THUNK
// ============================

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {

      const response = await registerUser(data)
      console.log("REGISTER RESPONSE:", response)

      return response

    } catch (error) {

      return thunkAPI.rejectWithValue(error.response.data)

    }
  }
)


// ============================
// LOGIN THUNK
// ============================

export const login = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {

    try {

      const response = await loginUser(data)
      console.log("LOGIN RESPONSE:", response)

      return response

    } catch (error) {

      return thunkAPI.rejectWithValue(error.response.data)

    }

  }
)





// ============================
// LOAD DATA FROM LOCAL STORAGE
// ============================

const token = localStorage.getItem("token")
const user = JSON.parse(localStorage.getItem("user"))


// ============================
// INITIAL STATE
// ============================

const initialState = {

  user: user || null,
  token: token || null,
  loading: false,
  error: null

}


// ============================
// SLICE
// ============================

const authSlice = createSlice({

  name: "auth",

  initialState,

  reducers: {

  },


  extraReducers: (builder) => {

    builder
      //logout
      .addCase(logout.pending, (state) => {

        state.loading = true
        state.error = null

      })
      .addCase(logout.fulfilled, (state) => {
    state.loading = false;
    state.user = null;
    state.token = null;

    // Destroy the frontend memory
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    })
    .addCase(logout.rejected, (state, action) => {

        state.loading = false
        state.error = action.payload

      })

      // =========================
      // LOGIN
      // =========================

      .addCase(login.pending, (state) => {

        state.loading = true
        state.error = null

      })

      .addCase(login.fulfilled, (state, action) => {

        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.accessToken

        // store in localStorage
        localStorage.setItem("token", action.payload.accessToken)
        localStorage.setItem("user", JSON.stringify(action.payload.user))

      })

      .addCase(login.rejected, (state, action) => {

        state.loading = false
        state.error = action.payload

      })


      // =========================
      // REGISTER
      // =========================

      .addCase(register.pending, (state) => {

        state.loading = true
        state.error = null

      })

      .addCase(register.fulfilled, (state, action) => {

        state.loading = false

        state.user = action.payload.user
        state.token = action.payload.accessToken
      })

      .addCase(register.rejected, (state, action) => {

        state.loading = false
        state.error = action.payload

      })

  }

})


// ============================
// EXPORTS
// ============================

// export const { logout } = authSlice.actions

export default authSlice.reducer