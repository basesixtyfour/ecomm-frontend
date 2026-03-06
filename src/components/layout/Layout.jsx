import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavBar } from "./NavBar";
import { ChatWidget } from "../chat/ChatWidget";
import { selectCartItemCount } from "../../context/cartSlice";
import { mixpanel } from "../../lib/mixpanel";

export const Layout = () => {
  const cartCount = useSelector(selectCartItemCount);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && import.meta.env.VITE_MIXPANEL_TOKEN) {
      mixpanel.identify(String(user.id));
      mixpanel.people.set({
        $name: user.username || user.email,
        $email: user.email,
      });
    }
  }, [user]);

  const showWidget = isAuthenticated && user && !user.is_staff;

  return (
    <>
      <NavBar cartCount={cartCount} />
      <Outlet />
      {showWidget && <ChatWidget />}
    </>
  );
};
