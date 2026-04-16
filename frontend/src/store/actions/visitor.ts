import { visitorActionTypes } from "./constants";

export const fetchVisitors = () => ({
  type: visitorActionTypes.FETCH_VISITORS_REQUEST,
});

export const fetchVisitorById = (id: number) => ({
  type: visitorActionTypes.FETCH_VISITOR_BY_ID_REQUEST,
  payload: id,
});

export const checkInVisitor = (data: FormData) => ({
  type: visitorActionTypes.CHECKIN_VISITOR_REQUEST,
  payload: data,
});

export const checkOutVisitor = (id: number) => ({
  type: visitorActionTypes.CHECKOUT_VISITOR_REQUEST,
  payload: id,
});
