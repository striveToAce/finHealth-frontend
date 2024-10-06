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
  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      toast.loading("logging in...");
      await loginService(values.username, values.password, dispatch);
      toast.dismiss();
      toast.success("loggedin :)");
      router.push("/dashboard");
    } catch (err) {
      toast.dismiss();
      toast.error("loggedin failed :(");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login to FinHealth
        </h2>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700">
                  User ID
                </label>
                <Field
                  id="username"
                  name="username"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link href="/auth?type=signup">
            <span className="text-blue-600 hover:underline">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
