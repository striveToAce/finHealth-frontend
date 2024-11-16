"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Link from "next/link";
import { loginService } from "@/services/authService";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

// Validation schema using Yup
const loginSchema = Yup.object().shape({
  username: Yup.string().required("User ID is required"),
  password: Yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (values: { username: string; password: string }) => {
    try {
      toast.loading("Logging in...");
      await loginService(values.username, values.password, dispatch);
      toast.dismiss();
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    } catch (err) {
      toast.dismiss();
      toast.error("Login failed :(");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-900 via-black to-blue-900 text-white">
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-glow">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
            Login to FinHealth
          </span>
        </h2>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* User ID */}
              <div className="mb-6">
                <label htmlFor="username" className="block text-gray-400 mb-1">
                  User ID
                </label>
                <Field
                  id="username"
                  name="username"
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-400 mb-1">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transition-transform transform hover:scale-105 shadow-md"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/auth?type=signup">
            <span className="text-cyan-400 hover:underline cursor-pointer">
              Sign Up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;