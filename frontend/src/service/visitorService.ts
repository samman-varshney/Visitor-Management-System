const getToken = () => localStorage.getItem("token");

export const visitorService = {
  fetchVisitors: async () => {
    const res = await fetch("/api/visitors", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error("Failed to fetch visitors");
    return res.json();
  },

  fetchVisitorById: async (id: number) => {
    const res = await fetch(`/api/visitors/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error("Failed to fetch visitor");
    return res.json();
  },

  checkInVisitor: async (data: FormData) => {
    const res = await fetch("/api/visitors/checkin", {
      method: "POST",
      headers: { Authorization: `Bearer ${getToken()}` },
      body: data,
    });
    if (!res.ok) throw new Error("Check-in failed");
    return res.json();
  },

  checkOutVisitor: async (id: number) => {
    const res = await fetch(`/api/visitors/${id}/checkout`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error("Checkout failed");
    return res.json();
  },
  fetchStats: () => ({}),
};
