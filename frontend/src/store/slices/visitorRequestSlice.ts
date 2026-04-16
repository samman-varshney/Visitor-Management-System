import {
  createEntityAdapter,
  createSlice,
  type EntityState,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { BaseEntityStore } from "./baseEntityStore";
import type { VisitorRequest } from "../../models/VisitorRequest";
import { VisitorRequestStatus } from "../../models/VisitorRequest";

type RequestOperationKey = keyof BaseEntityStore;

type RequestState = EntityState<VisitorRequest, number> &
  BaseEntityStore & {
    currentRequest: VisitorRequest | null;
  };

const adapter = createEntityAdapter<VisitorRequest, number>({
  selectId: (request) => request.id,
  sortComparer: (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
});

const initialState: RequestState = adapter.getInitialState({
  currentRequest: null,
  create: {},
  update: {},
  list: {},
  get: {},
  delete: {},
  archive: {},
});

const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    setListLoading: (state) => {
      state.list = { loading: true, error: false };
    },
    setCreateLoading: (state) => {
      state.create = { loading: true, error: false };
    },
    setUpdateLoading: (state) => {
      state.update = { loading: true, error: false };
    },
    setGetLoading: (state) => {
      state.get = { loading: true, error: false };
    },

    setRequests: (state, action: PayloadAction<VisitorRequest[]>) => {
      state.list = { loading: false, success: true };
      adapter.setAll(state, action.payload);
    },

    setPendingRequests: (state, action: PayloadAction<VisitorRequest[]>) => {
      state.list = { loading: false, success: true };
      adapter.upsertMany(state, action.payload);
    },

    setCurrentRequest: (
      state,
      action: PayloadAction<VisitorRequest | null>,
    ) => {
      state.currentRequest = action.payload;
    },

    createPreApprovalSuccess: (
      state,
      action: PayloadAction<VisitorRequest>,
    ) => {
      state.create = { loading: false, success: true };
      adapter.upsertOne(state, action.payload);
      state.currentRequest = action.payload;
    },

    approveRequestSuccess: (state, action: PayloadAction<VisitorRequest>) => {
      state.update = { loading: false, success: true };
      adapter.upsertOne(state, action.payload);

      if (state.currentRequest?.id === action.payload.id) {
        state.currentRequest = action.payload;
      }
    },

    rejectRequestSuccess: (state, action: PayloadAction<VisitorRequest>) => {
      state.update = { loading: false, success: true };
      adapter.upsertOne(state, action.payload);

      if (state.currentRequest?.id === action.payload.id) {
        state.currentRequest = action.payload;
      }
    },

    setError: (
      state,
      action: PayloadAction<{ type: RequestOperationKey; message: string }>,
    ) => {
      const { type, message } = action.payload;
      state[type] = { loading: false, error: true, message };
    },

    clearOperation: (state, action: PayloadAction<RequestOperationKey>) => {
      state[action.payload] = {};
    },

    clearError: (state, action: PayloadAction<RequestOperationKey>) => {
      state[action.payload] = {};
    },
  },

  selectors: {
    selectIds: (state) => state.ids,
    selectEntities: (state) => state.entities,
    selectAllRequests: (state) => adapter.getSelectors().selectAll(state),
    selectRequestById: (state, requestId: number) =>
      adapter.getSelectors().selectById(state, requestId),
    selectCurrentRequest: (state) => state.currentRequest,
    selectPendingRequests: (state) =>
      adapter
        .getSelectors()
        .selectAll(state)
        .filter((request) => request.status === VisitorRequestStatus.pending),
    selectApprovedRequests: (state) =>
      adapter
        .getSelectors()
        .selectAll(state)
        .filter((request) => request.status === VisitorRequestStatus.approved),
    selectRejectedRequests: (state) =>
      adapter
        .getSelectors()
        .selectAll(state)
        .filter((request) => request.status === VisitorRequestStatus.rejected),
    selectListState: (state) => state.list,
    selectCreateState: (state) => state.create,
    selectUpdateState: (state) => state.update,
    selectGetState: (state) => state.get,
  },
});

export const requestReducer = requestSlice.reducer;
export const requestActions = requestSlice.actions;
export const requestSelectors = requestSlice.selectors;

export const {
  setListLoading,
  setCreateLoading,
  setUpdateLoading,
  setGetLoading,
  setRequests,
  setPendingRequests,
  setCurrentRequest,
  createPreApprovalSuccess,
  approveRequestSuccess,
  rejectRequestSuccess,
  setError,
  clearOperation,
  clearError,
} = requestSlice.actions;
