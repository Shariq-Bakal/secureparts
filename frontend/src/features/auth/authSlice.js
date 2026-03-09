import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { loginUser, registerUser } from "../../services/authService"


// ============================
// REGISTER THUNK
// ============================
export const register = createAsyncThunk(

  "auth/register",

  async (data, thunkAPI) => {

    try{

      // call API function
      const response = await registerUser(data)

      console.log("REGISTER RESPONSE:", response)

      // return response to reducer
      return response

    }
    catch(error){

      // send backend error to redux state
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

    try{

      const response = await loginUser(data)

      console.log("LOGIN RESPONSE:", response)

      return response

    }
    catch(error){

      return thunkAPI.rejectWithValue(error.response.data)

    }

  }

)


// ============================
// INITIAL STATE
// ============================

const initialState = {

  user: null,
  token: null,
  loading: false,
  error: null

}


// ============================
// SLICE
// ============================

const authSlice = createSlice({

  name:"auth",

  initialState,

  reducers:{

    // logout reducer
    logout:(state)=>{

      state.user = null
      state.token = null

    }

  },

  // handle async thunk states
  extraReducers:(builder)=>{

    builder

    // ------------------
    // LOGIN STATES
    // ------------------

    .addCase(login.pending,(state)=>{
      state.loading = true
    })

    .addCase(login.fulfilled,(state,action)=>{

      state.loading = false

      // store user in redux
      state.user = action.payload.user

      // store token in redux
      state.token = action.payload.token

    })

    .addCase(login.rejected,(state,action)=>{
      state.loading = false
      state.error = action.payload
    })


    // ------------------
    // REGISTER STATES
    // ------------------

    .addCase(register.pending,(state)=>{
      state.loading = true
    })

    .addCase(register.fulfilled,(state,action)=>{

      state.loading = false

      // backend usually returns user + token
      state.user = action.payload.user
      state.token = action.payload.token

    })

    .addCase(register.rejected,(state,action)=>{
      state.loading = false
      state.error = action.payload
    })

  }

})


// export logout action
export const { logout } = authSlice.actions

// export reducer
export default authSlice.reducer