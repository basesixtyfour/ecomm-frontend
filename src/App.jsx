import { RouterProvider } from "react-router-dom";
import { router, RootLoaderFallback } from "./router";
import { ToastContainer } from "react-toastify";

export const App = () => (
  <>
    <RouterProvider router={router} />
    <ToastContainer position="top-right" autoClose={4000} newestOnTop />
  </>
);