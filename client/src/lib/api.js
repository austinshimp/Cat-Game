const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include", // send/receive the auth cookie
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }

  return data;
}

export const api = {
  getCats: () => request("/api/cats"),
  getCat: (id) => request(`/api/cats/${id}`),
  getRandomQuestions: (difficulty, count = 10) =>
    request(
      `/api/questions/random?difficulty=${encodeURIComponent(difficulty)}&count=${count}`
    ),
  checkAnswer: (questionId, selectedIndex) =>
    request(`/api/questions/${questionId}/answer`, {
      method: "POST",
      body: JSON.stringify({ selectedIndex }),
    }),
  getLeaderboard: (limit = 10) => request(`/api/scores/leaderboard?limit=${limit}`),
};
