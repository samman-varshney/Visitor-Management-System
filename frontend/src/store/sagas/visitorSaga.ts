import { call, put, takeLatest } from "redux-saga/effects";
import { visitorActionTypes } from "../actions/constants";
import { visitorService } from "../../service/visitorService";
import {
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
} from "../slices/visitorSlice";

// ================= HELPERS =================

// standard error extractor
const getErrorMessage = (err: any) => err?.message || "Something went wrong";

// ================= WORKERS =================

// 🔹 Fetch all visitors
function* fetchVisitorsSaga(): any {
  try {
    yield put(setListLoading());

    const data = yield call(visitorService.fetchVisitors);

    yield put(setVisitors(data));
  } catch (err) {
    yield put(setError({ type: "list", message: getErrorMessage(err) }));
  }
}

// 🔹 Fetch single visitor
function* fetchVisitorByIdSaga(action: any): any {
  try {
    yield put(setGetLoading());

    const data = yield call(visitorService.fetchVisitorById, action.payload);

    yield put(setVisitor(data));
  } catch (err) {
    yield put(setError({ type: "get", message: getErrorMessage(err) }));
  }
}

// 🔹 Check-in (CREATE)
function* checkInVisitorSaga(action: any): any {
  try {
    yield put(setCreateLoading());

    yield call(visitorService.checkInVisitor, action.payload);

    yield put(addVisitorSuccess());

    // 🔥 useful: refresh list after creation
    yield call(fetchVisitorsSaga);
  } catch (err) {
    yield put(setError({ type: "create", message: getErrorMessage(err) }));
  }
}

// 🔹 Check-out (UPDATE)
function* checkOutVisitorSaga(action: any): any {
  try {
    yield put(setUpdateLoading());

    const data = yield call(visitorService.checkOutVisitor, action.payload);

    yield put(updateVisitorSuccess(data));

    // 🔥 optional: refresh stats after checkout
    yield call(fetchStatsSaga);
  } catch (err) {
    yield put(setError({ type: "update", message: getErrorMessage(err) }));
  }
}

// 🔹 Fetch stats
function* fetchStatsSaga(): any {
  try {
    const data = yield call(visitorService.fetchStats);
    yield put(setStats(data));
  } catch (err) {
    // stats failure usually shouldn't block UI heavily
    yield put(setError({ type: "list", message: getErrorMessage(err) }));
  }
}

// ================= ROOT SAGA =================

export function* visitorSaga() {
  yield takeLatest(visitorActionTypes.FETCH_STATS_REQUEST, fetchStatsSaga);
  yield takeLatest(
    visitorActionTypes.CHECKOUT_VISITOR_REQUEST,
    checkOutVisitorSaga,
  );
  yield takeLatest(
    visitorActionTypes.CHECKIN_VISITOR_REQUEST,
    checkInVisitorSaga,
  );
  yield takeLatest(
    visitorActionTypes.FETCH_VISITOR_BY_ID_REQUEST,
    fetchVisitorByIdSaga,
  );
  yield takeLatest(
    visitorActionTypes.FETCH_VISITORS_REQUEST,
    fetchVisitorsSaga,
  );
}
