import {
  createSlice,
  createEntityAdapter,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { VisitorStatus, type Visitor } from "../../models/Visitor";
import type { BaseEntityStore } from "./baseEntityStore";

type VisitorOperationKey = keyof BaseEntityStore;
type VisitorStats = { total: number; active: number; today: number };

const adapter = createEntityAdapter<Visitor, number>({
  selectId: (v) => v.id,
  sortComparer: (a, b) =>
    new Date(b.checkInTime).getTime() - new Date(a.checkInTime).getTime(),
});

const initialState = adapter.getInitialState<
  BaseEntityStore & {
    currentVisitor: Visitor | null;
    stats: VisitorStats;
  }
>({
  currentVisitor: null,
  stats: { total: 0, active: 0, today: 0 },
  create: {},
  update: {},
  list: {},
  get: {},
  delete: {},
  archive: {},
});

const slice = createSlice({
  name: "visitor",
  initialState,
  reducers: {
    // ===== REQUEST STATE =====
    setListLoading: (state) => {
      state.list = { loading: true };
    },
    setCreateLoading: (state) => {
      state.create = { loading: true };
    },
    setUpdateLoading: (state) => {
      state.update = { loading: true };
    },
    setGetLoading: (state) => {
      state.get = { loading: true };
    },

    // ===== SUCCESS =====
    setVisitors: (state, action: PayloadAction<Visitor[]>) => {
      state.list = { loading: false };
      adapter.setAll(state, action.payload);
    },

    setVisitor: (state, action: PayloadAction<Visitor>) => {
      state.get = { loading: false, success: true };
      state.currentVisitor = action.payload;
      adapter.upsertOne(state, action.payload);
    },

    addVisitorSuccess: (state) => {
      state.create = { loading: false, success: true };
    },

    updateVisitorSuccess: (state, action: PayloadAction<Visitor>) => {
      state.update = { loading: false, success: true };
      adapter.upsertOne(state, action.payload);
    },

    setStats: (state, action: PayloadAction<VisitorStats>) => {
      state.stats = action.payload;
    },

    // ===== FAILURE =====
    setError: (
      state,
      action: PayloadAction<{
        type: VisitorOperationKey;
        message: string;
      }>,
    ) => {
      const { type, message } = action.payload;
      state[type] = { loading: false, error: true, message };
    },

    clearOperation: (state, action: PayloadAction<VisitorOperationKey>) => {
      state[action.payload] = {};
    },
  },

  selectors: {
    // Basic adapter selectors (manually mapped)
    selectIds: (state) => state.ids,
    selectEntities: (state) => state.entities,

    selectAllVisitors: (state) => state.ids.map((id) => state.entities[id]!),

    selectVisitorById: (state, id: number) => state.entities[id],

    selectActiveVisitors: (state) =>
      state.ids
        .map((id) => state.entities[id]!)
        .filter((v) => v.status === VisitorStatus.checkedIn),

    selectStats: (state) => state.stats,
    selectListState: (state) => state.list,
    selectCreateState: (state) => state.create,
  },
});

export const {
  setListLoading,
  setCreateLoading,
  setUpdateLoading,
  setGetLoading,
  setVisitors,
  setVisitor,
  addVisitorSuccess,
  updateVisitorSuccess,
  setStats,
  setError,
  clearOperation,
} = slice.actions;

export const visitorReducer = slice.reducer;
export const visitorSelectors = slice.selectors;
