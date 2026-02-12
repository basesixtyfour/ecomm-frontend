import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { ProductInfo } from "./pages/ProductInfo";
import { fetchProduct } from "./services/api";
import { Login } from "./pages/Login";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Products } from "./pages/Products";
import { toast } from "react-toastify";
import { Register } from "./pages/Register";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route 
        path="/" 
        element={<Layout />}
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
              return res.success ? res.data : null;
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