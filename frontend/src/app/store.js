import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import rfqReducer from "../features/rfq/rfqSlice"
import adminReducer from "../features/admin/adminSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    rfq:rfqReducer,
    admin:adminReducer
  }
})