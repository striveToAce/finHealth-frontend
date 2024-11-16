"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { signupService } from "@/services/authService";
import moment from "moment";

// Validation schema using Yup
const signupSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  username: Yup.string().required("User ID is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  dob: Yup.string().required("Date of Birth is required"),
});

const Signup: React.FC = () => {
  const router = useRouter();

  const handleSignup = async (values: {
    firstName: string;
    lastName: string;
    username: string;
    dob: string;
    password: string;
  }) => {
    try {
      toast.loading("Signing up...");
      await signupService(
        values.firstName,
        values.lastName,
        values.username,
        values.dob,
        values.password
      );
      toast.dismiss();
      toast.success("Sign up successful!");
      router.push("/dashboard");
    } catch (err) {
      toast.dismiss();
      toast.error("Sign up failed.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-900 via-black to-blue-900 text-white">
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-glow">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
            Sign Up for FinHealth
          </span>
        </h2>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            username: "",
            password: "",
            dob: moment().format("YYYY-MM-DD"),
          }}
          validationSchema={signupSchema}
          onSubmit={handleSignup}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* First Name */}
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-gray-400 mb-1">
                  First Name
                </label>
                <Field
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Last Name */}
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-gray-400 mb-1">
                  Last Name
                </label>
                <Field
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Username */}
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-400 mb-1">
                  User ID
                </label>
                <Field
                  id="username"
                  name="username"
                  type="text"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Date of Birth */}
              <div className="mb-4">
                <label htmlFor="dob" className="block text-gray-400 mb-1">
                  Date of Birth
                </label>
                <Field
                  id="dob"
                  name="dob"
                  type="date"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <ErrorMessage
                  name="dob"
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
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transition-transform transform hover:scale-105 shadow-md"
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link href="/auth?type=login">
            <span className="text-cyan-400 hover:underline cursor-pointer">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;