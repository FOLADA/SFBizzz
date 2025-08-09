"use client";
import React, { useState } from "react";
import { useAuth } from "../../components/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[90vh] items-center justify-center bg-gradient-to-br from-fuchsia-700 via-rose-700 to-neutral-950 px-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md space-y-8 rounded-3xl bg-neutral-900/80 p-10 shadow-2xl backdrop-blur-lg border border-neutral-800"
      >
        <h1 className="mb-6 text-3xl font-bold text-center bg-gradient-to-r from-fuchsia-400 to-rose-400 bg-clip-text text-transparent">Welcome back</h1>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-neutral-300">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full rounded-lg border-0 bg-neutral-800/60 p-3 text-base outline-none ring-1 ring-neutral-700 focus:ring-fuchsia-500 transition"
            placeholder="you@email.com"
          />
        </div>
        <div className="space-y-2 relative">
          <label htmlFor="password" className="block text-sm font-medium text-neutral-300">Password</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full rounded-lg border-0 bg-neutral-800/60 p-3 text-base outline-none ring-1 ring-neutral-700 focus:ring-fuchsia-500 transition pr-10"
            placeholder="Your password"
          />
          <button
            type="button"
            tabIndex={-1}
            className="absolute right-3 top-9 text-neutral-400 hover:text-fuchsia-400"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {error && <div className="text-red-500 text-sm text-center mt-2">{error}</div>}
        <button
          type="submit"
          className="w-full rounded-full bg-gradient-to-r from-fuchsia-600 to-rose-600 py-3 font-medium shadow hover:brightness-110 transition"
          disabled={loading}
        >
          {loading ? "Logging in…" : "Login"}
        </button>
        <div className="text-center text-neutral-400 text-sm mt-4">
          Don&apos;t have an account? <a href="/register" className="text-fuchsia-400 hover:underline">Register</a>
        </div>
      </motion.form>
    </main>
  );
};

export default LoginPage; 