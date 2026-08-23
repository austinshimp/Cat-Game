const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",

    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },

    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
}

export function registerUser({ username, email, password }) {
  return apiRequest("/auth/register", {
    method: "POST",

    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
}

export function loginUser({ identifier, password }) {
  /*
    The current backend authenticates with email.

    Once the backend supports username login, this function
    can be changed without changing AccountPage.
  */
  return apiRequest("/auth/login", {
    method: "POST",

    body: JSON.stringify({
      email: identifier,
      password,
    }),
  });
}

export function logoutUser() {
  return apiRequest("/auth/logout", {
    method: "POST",
  });
}

export function getCurrentUser() {
  return apiRequest("/auth/me");
}