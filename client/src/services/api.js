const API_BASE_URL = "https://your-api-url.com/api";

const handleErrors = response => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const login = (email, password) => {
  return fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(handleErrors);
};

export const signUp = (email, password, confirmPassword) => {
  return fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    }),
  }).then(handleErrors);
};

export const placeOrder = (food, request) => {
  return fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // 로그인 성공 시 저장된 액세스 토큰
    },
    body: JSON.stringify({
      food: food,
      request: request,
    }),
  }).then(handleErrors);
};
