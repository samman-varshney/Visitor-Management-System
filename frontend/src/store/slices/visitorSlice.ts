import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { Visitor } from "../../models/Visitor";

const visitorAdapter = createEntityAdapter<Visitor, number>({
  selectId: (visitor) => visitor.id,
  sortComparer: (a, b) =>
    new Date(b.checkInTime).getTime() - new Date(a.checkInTime).getTime(),
});

const initialState = visitorAdapter.getInitialState({
  loading: false,
  error: null as string | null,
  currentVisitor: null as Visitor | null,
  stats: {
    total: 0,
    active: 0,
    today: 0,
  },
});

const visitorSlice = createSlice({
  name: "visitors",
  initialState,
  reducers: {
    // 🔹 Requests (Saga triggers)
    fetchVisitorsRequest: (state) => {
      state.loading = true;
    },
    fetchActiveVisitorsRequest: (state) => {
      state.loading = true;
    },
    checkInVisitorRequest: (state) => {
      state.loading = true;
    },
    checkOutVisitorRequest: (state) => {
      state.loading = true;
    },
    fetchStatsRequest: () => {},

    // 🔹 Success
    fetchVisitorsSuccess: (state, action: PayloadAction<Visitor[]>) => {
      state.loading = false;
      visitorAdapter.setAll(state, action.payload);
    },

    fetchActiveVisitorsSuccess: (state, action: PayloadAction<Visitor[]>) => {
      state.loading = false;
      // Instead of separate array → filter when selecting
      visitorAdapter.upsertMany(state, action.payload);
    },

    checkOutVisitorSuccess: (state, action: PayloadAction<Visitor>) => {
      state.loading = false;
      visitorAdapter.upsertOne(state, action.payload);
    },

    fetchStatsSuccess: (state, action) => {
      state.stats = action.payload;
    },

    // 🔹 Failure
    failure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    setCurrentVisitor: (state, action) => {
      state.currentVisitor = action.payload;
    },
  },
});

export const {
  fetchVisitorsRequest,
  fetchVisitorsSuccess,
  fetchActiveVisitorsRequest,
  fetchActiveVisitorsSuccess,
  checkInVisitorRequest,
  checkOutVisitorRequest,
  checkOutVisitorSuccess,
  fetchStatsRequest,
  fetchStatsSuccess,
  failure,
  clearError,
  setCurrentVisitor,
} = visitorSlice.actions;

export default visitorSlice.reducer;
