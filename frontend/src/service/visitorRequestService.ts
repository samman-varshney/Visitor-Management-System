import type { CreatePreApprovalPayload } from "../store/actions/visitorRequest";

const getToken = () => localStorage.getItem("token");

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    let message = "Request failed";
    try {
      const data = await response.json();
      message = data?.message || message;
    } catch {}
    throw new Error(message);
  }

  return response.json();
}

export const requestService = {
  fetchRequests: () => requestJson("/api/requests"),

  fetchPendingRequests: () => requestJson("/api/requests/pending"),

  createPreApproval: (payload: CreatePreApprovalPayload) =>
    requestJson("/api/requests/pre-approval", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }),

  approveRequest: (requestId: string) =>
    requestJson(`/api/requests/${requestId}/approve`, {
      method: "PATCH",
    }),

  rejectRequest: (requestId: string) =>
    requestJson(`/api/requests/${requestId}/reject`, {
      method: "PATCH",
    }),
};
