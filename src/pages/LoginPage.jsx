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
      className="max-w-sm mx-auto mt-20 bg-white rounded-xl shadow-lg p-8 flex flex-col gap-5 border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h2>
      <div>
        <label className="block text-gray-700 mb-1 font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1 font-medium" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg py-2 mt-3 transition-colors shadow"
        disabled={loading}
      >
        {loading ? "Loading..." : "Login"}
      </button>
      {auth0Enabled && (
        <>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAuth0Login}
            className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg py-2 transition-colors shadow"
          >
            <Shield className="w-5 h-5" />
            Continue with Auth0
          </button>
        </>
      )}
      <p className="text-sm text-center mt-2">
        Don't have an account? <Link to="/register" className="text-teal-600 hover:underline">Register</Link>
      </p>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
};
