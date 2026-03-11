import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import rfqReducer from "../features/rfq/rfqSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    rfq:rfqReducer
  }
})