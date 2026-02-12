import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartAction } from "./context/cartSlice";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

export const App = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    if (userId) dispatch(fetchCartAction());
  }, [dispatch, userId]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={4000} newestOnTop />
    </>
  );
};