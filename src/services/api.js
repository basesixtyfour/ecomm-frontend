import axios from "axios";
import { store } from "../store";
import { setAccessToken, clearAccessToken } from "../context/authSlice";

export const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;

  if (token)
    config.headers.Authorization = `Bearer ${token}`;
  
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (
      error.response.status !== 401 ||
      error.response.data.code !== "token_not_valid"
    ) return Promise.reject(error);

    if (!originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `${api.defaults.baseURL}/api/token/refresh/`,
          {},
          { withCredentials: true }
        );

        const newToken = data.access;
        store.dispatch(setAccessToken(newToken));
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        processQueue(null, newToken);
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        store.dispatch(clearAccessToken());
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const fetchUserInfo = async () => {
  try {
    const response = await api.get('/api/user/');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.detail || "Failed to fetch user");
  }
}

export const fetchProducts = async ({
  categories = [],
  sort = "",
  page = null,
  search = "",
  signal,
} = {}) => {
  const params = {};

  if (sort) params.sort = sort;
  if (categories.length > 0) params.categories = categories.join(",");
  if (page) params.page = page;
  if (search) params.search = search;

  try {
    const response = await api.get("/api/products/", {
      params,
      signal,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.detail || "Failed to fetch products");
  }
};


export const fetchProduct = async (productId) => {
  try {
    const response = await api.get(`/api/products/${productId}/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.detail || "Failed to fetch product");
  }
};

export const fetchCart = async () => {
  try {
    const response = await api.get('/api/cart/');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.detail || "Failed to fetch cart");
  }
};

export const addCartItem = async (productId, quantity) => {
  try {
    const response = await api.post('/api/cart/items/', { product_id: productId, quantity });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.detail || "Failed to add cart item");
  }
};

export const updateCartItem = async (itemId, quantity) => {
  try {
    const response = await api.patch(`/api/cart/items/${itemId}/`, { quantity });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.detail || "Failed to update cart item");
  }
};

export const deleteCartItem = async (itemId) => {
  try {
    const response = await api.delete(`/api/cart/items/${itemId}/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.detail || "Failed to delete cart item");
  }
};

export const clearCartApi = async () => {
  try {
    const response = await api.delete('/api/cart/');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to clear cart");
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await api.post('/api/register/', { username, email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.detail || "Failed to register user");
  }
};

export const fetchOrders = async () => {
  try {
    const response = await api.get('/api/orders/');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to fetch orders");
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/api/orders/', orderData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to create order");
  }
};

export const CHAT_WS_URL = "ws://localhost:8001";

export const createChatRoom = async () => {
  try {
    const response = await api.post('/api/support/chat/');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to create chat room");
  }
};

export const fetchActiveRooms = async () => {
  try {
    const response = await api.get('/api/support/chat/rooms/');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to fetch rooms");
  }
};