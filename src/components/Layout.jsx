import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavBar } from "./NavBar";
import { selectCartItemCount } from "../context/cartSlice";

export const Layout = () => {
  const cartCount = useSelector(selectCartItemCount);
  
  return (
    <>
      <NavBar cartCount={cartCount} />
      <Outlet />
    </>
  );
};
