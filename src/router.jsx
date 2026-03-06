import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { LandingPage } from "./pages/LandingPage";
import { ProductDetail } from "./pages/ProductDetail";
import { fetchProduct, fetchOrders, fetchUserInfo } from "./services/api";
import { LoginPage } from "./pages/LoginPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { ProductCatalog } from "./pages/ProductCatalog";
import { AccountPage } from "./pages/AccountPage";
import { OrdersPage } from "./pages/OrdersPage";
import { SupportDashboard } from "./pages/SupportDashboard";
import { toast } from "react-toastify";
import { SignUpPage } from "./pages/SignUpPage";
import { store } from "./store";
import { fetchCartAsync, loadLocalCart, mergeCartAsync } from "./context/cartSlice";
import { initializeAuth, clearAccessToken } from "./context/authSlice";
import { getLocalCart } from "./utils/localCart";

let authInitPromise = null;

export const ensureAuth = () => {
  const { auth } = store.getState();
  if (auth.isAuthenticated && auth.user) {
    return Promise.resolve();
  }
  if (!authInitPromise) {
    authInitPromise = store.dispatch(initializeAuth()).unwrap().finally(() => {
      authInitPromise = null;
    });
  }
  return authInitPromise;
};

export const RootLoaderFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="animate-pulse text-gray-500">Loading...</div>
  </div>
);

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route 
        path="/" 
        element={<Layout />}
        loader={async () => {
          try {
            await ensureAuth();
            const { auth } = store.getState();
            const localItems = getLocalCart();
            if (localItems.length > 0) {
              await store.dispatch(mergeCartAsync()).unwrap();
            }
            if (auth.isAuthenticated) {
              await store.dispatch(fetchCartAsync()).unwrap();
            } else {
              store.dispatch(loadLocalCart());
            }
          } catch {
            store.dispatch(clearAccessToken());
            store.dispatch(loadLocalCart());
          }
          return null;
        }}
      >
        <Route index element={<LandingPage />} />
        <Route 
          path="products" 
          element={<ProductCatalog />}
        />
        <Route 
          path="products/:productId" 
          element={<ProductDetail />}
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
          element={<CartPage />}
        />
        <Route 
          path="checkout" 
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path="profile" 
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
          loader={async () => {
            try {
              await ensureAuth();
              const { auth } = store.getState();
              return auth.user ?? (await fetchUserInfo());
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
              <OrdersPage />
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
              <SupportDashboard />
            </ProtectedRoute>
          }
        />
        <Route 
          path="login" 
          element={<LoginPage />}
        />
        <Route 
          path="register" 
          element={<SignUpPage />}
        />
      </Route>
    )
  );