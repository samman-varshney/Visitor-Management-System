import { call, put, takeLatest } from "redux-saga/effects";
import {
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
} from "../slices/visitorSlice";

// 🔹 Helper API
const getToken = () => localStorage.getItem("token");

// 🔹 Workers
function* fetchVisitorsSaga(): any {
  try {
    const res: Response = yield call(fetch, "/api/visitors", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = yield res.json();
    yield put(fetchVisitorsSuccess(data));
  } catch {
    yield put(failure("Failed to fetch visitors"));
  }
}

function* fetchActiveVisitorsSaga(): any {
  try {
    const res: Response = yield call(fetch, "/api/visitors/active", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = yield res.json();
    yield put(fetchActiveVisitorsSuccess(data));
  } catch {
    yield put(failure("Failed to fetch active visitors"));
  }
}

function* checkInVisitorSaga(action: any): any {
  try {
    yield call(fetch, "/api/visitors/checkin", {
      method: "POST",
      headers: { Authorization: `Bearer ${getToken()}` },
      body: action.payload,
    });
  } catch {
    yield put(failure("Failed to check in visitor"));
  }
}

function* checkOutVisitorSaga(action: any): any {
  try {
    const res: Response = yield call(
      fetch,
      `/api/visitors/${action.payload}/checkout`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${getToken()}` },
      },
    );
    const data = yield res.json();
    yield put(checkOutVisitorSuccess(data));
  } catch {
    yield put(failure("Failed to check out visitor"));
  }
}

function* fetchStatsSaga(): any {
  try {
    const res: Response = yield call(fetch, "/api/visitors/stats", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = yield res.json();
    yield put(fetchStatsSuccess(data));
  } catch {
    yield put(failure("Failed to fetch stats"));
  }
}

// 🔹 Watchers
export default function* visitorSaga() {
  yield takeLatest(fetchVisitorsRequest.type, fetchVisitorsSaga);
  yield takeLatest(fetchActiveVisitorsRequest.type, fetchActiveVisitorsSaga);
  yield takeLatest(checkInVisitorRequest.type, checkInVisitorSaga);
  yield takeLatest(checkOutVisitorRequest.type, checkOutVisitorSaga);
  yield takeLatest(fetchStatsRequest.type, fetchStatsSaga);
}
