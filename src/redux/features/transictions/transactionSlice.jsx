import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getTransactions,
  editTransaction,
  deleteTransaction,
  addTransaction,
} from "./transictionAPI";

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
  editing: {},
};
// slice
const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload;
    },
    editInActive: (state) => {
      state.editing = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.transactions = [];
      })
      .addCase(postTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(postTransaction.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transactions.push(action.payload);
      })
      .addCase(postTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(updateTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        const indexOfupdateTransaction = state.transactions.findIndex(
          (transiction) => transiction.id == action.payload.id
        );
        state.transactions[indexOfupdateTransaction] = action.payload;
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(removeTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        console.log(action);

        state.transactions = state.transactions.filter(
          (transaction) => transaction.id != action.meta.arg
        );
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

// async thunks

export const fetchTransactions = createAsyncThunk(
  "transaction/fetchTransactions",
  async () => {
    const transactions = await getTransactions();
    return transactions;
  }
);
export const postTransaction = createAsyncThunk(
  "transaction/postTransaction",
  async (data) => {
    const transaction = await addTransaction(data);
    return transaction;
  }
);

export const updateTransaction = createAsyncThunk(
  "transaction/updateTransaction",
  async (data) => {
    const transaction = await editTransaction(data);
    return transaction;
  }
);

export const removeTransaction = createAsyncThunk(
  "transaction/removeTransaction",
  async (id) => {
    const transaction = await deleteTransaction(id);
    return transaction;
  }
);

export const { editActive, editInActive } = transactionSlice.actions;

export default transactionSlice.reducer;
