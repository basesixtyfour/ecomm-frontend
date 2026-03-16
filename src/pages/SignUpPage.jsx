import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../services/api";
import { useSelector } from "react-redux";
import { mixpanel } from "../lib/mixpanel";

export const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const authContext = useSelector((state) => state.auth);
  if (authContext.accessToken) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!username || !email || !password) {
      setError("Username, email and password are required");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const data = await registerUser(username, email, password);
      mixpanel.track("Sign Up", {
        user_id: data?.id,
        email,
        signup_method: "email",
      });
      toast.success("Registration successful! Please login to continue", { toastId: "register:success" });
      navigate("/login");
    } catch (err) {
      const msg = err?.message || "Registration failed";
      mixpanel.track("Error", {
        error_type: "validation",
        error_message: msg,
        page_url: window.location.href,
      });
      setError(msg);
      toast.error(msg, { toastId: "register:exception" });
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
        Register
      </h2>

      <div>
        <label
          className="mb-1 block text-xs font-semibold uppercase tracking-[0.16em] text-black"
          htmlFor="username"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full border-2 border-black bg-white px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
          required
        />
      </div>

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
          placeholder="Create a password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border-2 border-black bg-white px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
          required
        />
      </div>

      <div>
        <label
          className="mb-1 block text-xs font-semibold uppercase tracking-[0.16em] text-black"
          htmlFor="confirm"
        >
          Confirm Password
        </label>
        <input
          id="confirm"
          type="password"
          placeholder="Repeat your password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          className="w-full border-2 border-black bg-white px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
          required
        />
      </div>

      {error && (
        <div className="border-2 border-red-600 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full border-2 border-black bg-black py-2 px-4 text-xs font-black uppercase tracking-[0.18em] text-white disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "REGISTERING..." : "REGISTER"}
      </button>

      <p className="mt-1 text-center text-xs text-neutral-800">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold uppercase tracking-[0.16em] text-black underline-offset-4 hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
};