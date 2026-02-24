import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavBar } from "./NavBar";
import { ChatWidget } from "../chat/ChatWidget";
import { selectCartItemCount } from "../../context/cartSlice";

export const Layout = () => {
  const cartCount = useSelector(selectCartItemCount);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const showWidget = isAuthenticated && user && !user.is_staff;

  return (
    <>
      <NavBar cartCount={cartCount} />
      <Outlet />
      {showWidget && <ChatWidget />}
    </>
  );
};
