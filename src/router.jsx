import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { ProductInfo } from "./pages/ProductInfo";
import { fetchProduct, fetchOrders, fetchUserInfo } from "./services/api";
import { Login } from "./pages/Login";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { Products } from "./pages/Products";
import { Profile } from "./pages/Profile";
import { OrderHistory } from "./pages/OrderHistory";
import { AgentDashboard } from "./pages/AgentDashboard";
import { toast } from "react-toastify";
import { Register } from "./pages/Register";
import { store } from "./store";
import { initializeAuth } from "./context/authSlice";
import { fetchCartAsync } from "./context/cartSlice";

let authInitPromise = null;

const ensureAuth = () => {
  if (!authInitPromise) {
    authInitPromise = store.dispatch(initializeAuth()).unwrap().finally(() => {
      authInitPromise = null;
    });
  }
  return authInitPromise;
};

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route 
        path="/" 
        element={<Layout />}
        loader={async () => {
          try {
            await ensureAuth();
            await store.dispatch(fetchCartAsync()).unwrap();
            return null;
          } catch (err) {
            toast.error(err?.message || "Failed to load profile", { toastId: "profile:loader:exception" });
            return null;
          }
        }}
      >
        <Route index element={<Home />} />
        <Route 
          path="products" 
          element={<Products />}
        />
        <Route 
          path="products/:productId" 
          element={<ProductInfo />}
          loader={async ({ params }) => {
            try {
              const res = await fetchProduct(params.productId);
              return res;
            } catch (err) {
              toast.error(err?.message || "Failed to load product", { toastId: "product:loader:exception" });
              return null;
            }
          }}
        />
        <Route 
          path="cart" 
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route 
          path="checkout" 
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route 
          path="profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
          loader={async () => {
            try {
              await ensureAuth();
              return await fetchUserInfo();
            } catch (err) {
              toast.error(err?.message || "Failed to load profile", { toastId: "profile:loader:exception" });
              return null;
            }
          }}
        />
        <Route 
          path="profile/orders" 
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          }
          loader={async () => {
            try {
              await ensureAuth();
              const data = await fetchOrders();
              return Array.isArray(data) ? data : data.results || [];
            } catch (err) {
              toast.error(err?.message || "Failed to load orders", { toastId: "orders:loader:exception" });
              return [];
            }
          }}
        />
        <Route
          path="agent"
          element={
            <ProtectedRoute staffOnly>
              <AgentDashboard />
            </ProtectedRoute>
          }
        />
        <Route 
          path="login" 
          element={<Login />}
        />
        <Route 
          path="register" 
          element={<Register />}
        />
      </Route>
    )
  );