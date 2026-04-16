import { call, put, takeLatest } from "redux-saga/effects";
import { visitorRequestActionTypes } from "../actions/constants";
import { requestService } from "../../service/visitorRequestService";
import {
  setListLoading,
  setCreateLoading,
  setUpdateLoading,
  setRequests,
  setPendingRequests,
  createPreApprovalSuccess,
  approveRequestSuccess,
  rejectRequestSuccess,
  setError,
} from "../slices/visitorRequestSlice";
import type { CreatePreApprovalPayload } from "../actions/visitorRequest";
import type { VisitorRequest } from "../../models/VisitorRequest";
import type { PayloadAction } from "@reduxjs/toolkit";

const getErrorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "Something went wrong";

function* fetchRequestsSaga(): Generator {
  try {
    yield put(setListLoading());
    const data: VisitorRequest[] = yield call(requestService.fetchRequests);
    yield put(setRequests(data));
  } catch (err) {
    yield put(setError({ type: "list", message: getErrorMessage(err) }));
  }
}

function* fetchPendingRequestsSaga() {
  try {
    yield put(setListLoading());
    const data: VisitorRequest[] = yield call(
      requestService.fetchPendingRequests,
    );
    yield put(setPendingRequests(data));
  } catch (err) {
    yield put(setError({ type: "list", message: getErrorMessage(err) }));
  }
}

function* createPreApprovalSaga(
  action: PayloadAction<CreatePreApprovalPayload>,
) {
  try {
    yield put(setCreateLoading());
    const data: VisitorRequest = yield call(
      requestService.createPreApproval,
      action.payload,
    );
    yield put(createPreApprovalSuccess(data));
  } catch (err) {
    yield put(setError({ type: "create", message: getErrorMessage(err) }));
  }
}

function* approveRequestSaga(action: PayloadAction<string>) {
  try {
    yield put(setUpdateLoading());
    const data: VisitorRequest = yield call(
      requestService.approveRequest,
      action.payload,
    );
    yield put(approveRequestSuccess(data));
  } catch (err) {
    yield put(setError({ type: "update", message: getErrorMessage(err) }));
  }
}

function* rejectRequestSaga(action: PayloadAction<string>): Generator {
  try {
    yield put(setUpdateLoading());
    const data: VisitorRequest = yield call(
      requestService.rejectRequest,
      action.payload,
    );
    yield put(rejectRequestSuccess(data));
  } catch (err) {
    yield put(setError({ type: "update", message: getErrorMessage(err) }));
  }
}

export function* requestSaga() {
  yield takeLatest(
    visitorRequestActionTypes.CREATE_PRE_APPROVAL_REQUEST,
    createPreApprovalSaga,
  );
  yield takeLatest(
    visitorRequestActionTypes.APPROVE_REQUEST_REQUEST,
    approveRequestSaga,
  );
  yield takeLatest(
    visitorRequestActionTypes.REJECT_REQUEST_REQUEST,
    rejectRequestSaga,
  );
  yield takeLatest(
    visitorRequestActionTypes.FETCH_REQUESTS_REQUEST,
    fetchRequestsSaga,
  );
  yield takeLatest(
    visitorRequestActionTypes.FETCH_PENDING_REQUESTS_REQUEST,
    fetchPendingRequestsSaga,
  );
}
