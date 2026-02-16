import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartAction } from "./context/cartSlice";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { initializeAuth } from "./context/authSlice";

export const App = () => {
  const dispatch = useDispatch();
  const authContext = useSelector((state) => state.auth);
  const { isLoading, isAuthenticated } = authContext;
  console.log(authContext);
  useEffect(() => {
    if (isAuthenticated) dispatch(fetchCartAction());
    else dispatch(initializeAuth());
  }, [dispatch, isAuthenticated]);

  if (isLoading) return <div>Loading...</div>;
  
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={4000} newestOnTop />
    </>
  );
};