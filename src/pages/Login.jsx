import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../context/authSlice";
import { fetchCartAction } from "../context/cartSlice";
import { toast } from "react-toastify";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authContext = useSelector((state) => state.auth);
  if (authContext.userId) {
    return <Navigate to="/" />;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await loginUser(email, password);

      if (res.success) {
        const redirectUrl = new URLSearchParams(window.location.search).get("redirectUrl");
        dispatch(setUserId(res.data.id));
        dispatch(fetchCartAction());
        navigate(redirectUrl || "/");
      } else {
        setError(res.message || "Login failed");
      }
    } catch (err) {
      const msg = err?.message || "Login failed";
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
      <p className="text-sm text-center mt-2">
        Don't have an account? <Link to="/register" className="text-teal-600 hover:underline">Register</Link>
      </p>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
};