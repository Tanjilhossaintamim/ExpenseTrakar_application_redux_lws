import { configureStore } from "@reduxjs/toolkit";
import transactionSlice from "../features/transictions/transactionSlice";

const store = configureStore({
  reducer: {
    transaction: transactionSlice,
  },
});

export default store;
