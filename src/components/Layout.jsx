import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavBar } from "./NavBar";

export const Layout = () => {
  const cart = useSelector(state => state.cart.cart);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  
  return (
    <>
      <NavBar cartCount={cartCount} />
      <Outlet />
    </>
  );
};
