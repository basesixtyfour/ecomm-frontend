import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

export const App = () => {
  const authContext = useSelector((state) => state.auth);
  const { isLoading } = authContext;

  if (isLoading) return <div>Loading...</div>;
  
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={4000} newestOnTop />
    </>
  );
};