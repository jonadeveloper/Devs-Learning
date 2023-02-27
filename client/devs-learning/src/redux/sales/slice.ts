import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Sales } from "../../interfaces/Sales";

interface SalesState {
  sales: Sales[];
  status: string;
}

const initialState: SalesState = {
  sales: [],
  status: "loading",
};

export const sales = createSlice({
  name: "sales",
  initialState, // defino initial state (state= initialState)
  reducers: {
    allSales: (state, { payload }) => {
      state.sales = payload;
      state.status = "confirmed";
    },
    loading: (state) => {
      state.status = "loading"
    }
  },
});

export const reducer = sales.actions;
