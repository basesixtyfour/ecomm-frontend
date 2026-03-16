import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Shield } from "lucide-react";
import { loginUser } from "../context/authSlice";
import { mixpanel } from "../lib/mixpanel";
import { fetchCartAsync, mergeCartAsync } from "../context/cartSlice";
import { getLocalCart } from "../utils/localCart";
import { toast } from "react-toastify";
import { api } from "../services/api";

const auth0Enabled = import.meta.env.VITE_AUTH0_ENABLED === "true";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authContext = useSelector((state) => state.auth);
  if (authContext.accessToken) {
    return <Navigate to="/" />;
  }

  const handleAuth0Login = () => {
    const redirectUrl = new URLSearchParams(window.location.search).get("redirectUrl");
    const params = redirectUrl ? `?next=${encodeURIComponent(redirectUrl)}` : "";
    window.location.href = `${api.defaults.baseURL}/api/auth0/login/${params}`;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const { user } = await dispatch(loginUser({ email, password })).unwrap();
      const redirectUrl = new URLSearchParams(window.location.search).get("redirectUrl");
      const localItems = getLocalCart();
      if (localItems.length > 0) {
        await dispatch(mergeCartAsync()).unwrap();
      } else {
        await dispatch(fetchCartAsync()).unwrap();
      }
      mixpanel.track("Sign In", {
        user_id: user?.id,
        login_method: "email",
        success: true,
      });
      navigate(redirectUrl || "/");
    } catch (err) {
      const msg = err?.message || "Login failed";
      mixpanel.track("Sign In", { login_method: "email", success: false });
      mixpanel.track("Error", {
        error_type: "server",
        error_message: msg,
        page_url: window.location.href,
      });
      setError(msg);
      toast.error(msg, { toastId: "login:exception" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-20 flex max-w-sm flex-col gap-5 border-2 border-black bg-white p-8"
    >
      <h2 className="mb-4 text-center text-2xl font-black uppercase tracking-tight text-black">
        Login
      </h2>
      <div>
        <label
          className="mb-1 block text-xs font-semibold uppercase tracking-[0.16em] text-black"
          htmlFor="email"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border-2 border-black bg-white px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
          required
        />
      </div>
      <div>
        <label
          className="mb-1 block text-xs font-semibold uppercase tracking-[0.16em] text-black"
          htmlFor="password"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border-2 border-black bg-white px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-3 w-full border-2 border-black bg-black py-2 text-xs font-black uppercase tracking-[0.18em] text-white disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "LOADING..." : "LOGIN"}
      </button>
      {auth0Enabled && (
        <>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-black" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-800">
                OR
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAuth0Login}
            className="flex w-full items-center justify-center gap-2 border-2 border-black bg-black py-2 text-xs font-black uppercase tracking-[0.18em] text-white"
          >
            <Shield className="h-5 w-5" />
            CONTINUE WITH AUTH0
          </button>
        </>
      )}
      <p className="mt-2 text-center text-xs text-neutral-800">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="font-semibold uppercase tracking-[0.16em] text-black underline-offset-4 hover:underline"
        >
          Register
        </Link>
      </p>
      {error && <p className="mt-2 text-xs font-semibold text-red-600">{error}</p>}
    </form>
  );
};
