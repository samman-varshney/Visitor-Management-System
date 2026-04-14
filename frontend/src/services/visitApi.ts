import api from "./api"; // your axios instance
import type { VisitRequest } from "../types/visit";

export const createVisit = async (data: FormData) => {
  const res = await api.post("/visits", data);
  return res.data;
};

export const getVisits = async (): Promise<VisitRequest[]> => {
  const res = await api.get("/visits");
  return res.data;
};


export const checkInVisit = async (id: string) => {
  return await api.post(`/visits/${id}/checkin`);
};

export const checkOutVisit = async (id: string) => {
  return await api.post(`/visits/${id}/checkout`);
};