import { createAction } from "@reduxjs/toolkit";
import { visitorRequestActionTypes } from "./constants";

export interface CreatePreApprovalPayload {
  visitorName: string;
  visitorEmail: string;
  visitorPhone: string;
  visitorCompany?: string;
  purpose: string;
  requestedDate: string;
  requestedTime: string;
}

export const fetchRequests = createAction(
  visitorRequestActionTypes.FETCH_REQUESTS_REQUEST,
);
export const fetchPendingRequests = createAction(
  visitorRequestActionTypes.FETCH_PENDING_REQUESTS_REQUEST,
);
export const createPreApproval = createAction<CreatePreApprovalPayload>(
  visitorRequestActionTypes.CREATE_PRE_APPROVAL_REQUEST,
);
export const approveRequest = createAction<string>(
  visitorRequestActionTypes.APPROVE_REQUEST_REQUEST,
);
export const rejectRequest = createAction<string>(
  visitorRequestActionTypes.REJECT_REQUEST_REQUEST,
);
