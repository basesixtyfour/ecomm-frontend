import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../context/authSlice";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
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
    setError("");
    if (!email || !password) {
      setError("Email and password required");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await registerUser(email, password);
      if (res.success) {
        toast.success("Registration successful! Please log in.", { toastId: "register:success" });
        dispatch(setUserId(res.data.id));
        navigate("/");
      } else {
        setError(res.message || "Registration failed");
      }
    } catch (err) {
      const msg = err?.message || "Registration failed";
      setError(msg);
      toast.error(msg, { toastId: "register:exception" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-20 bg-white rounded-xl shadow-lg p-8 flex flex-col gap-5 border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Register</h2>

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
          placeholder="Create a password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1 font-medium" htmlFor="confirm">
          Confirm Password
        </label>
        <input
          id="confirm"
          type="password"
          placeholder="Repeat your password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          required
        />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};