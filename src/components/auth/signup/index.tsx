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
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign Up for FinHealth
        </h2>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            username: "",
            password: "",
            dob: moment().format(),
          }}
          validationSchema={signupSchema}
          onSubmit={handleSignup}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-gray-700">
                  First Name
                </label>
                <Field
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-gray-700">
                  Last Name
                </label>
                <Field
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500"
                />
              </div>
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
                <label htmlFor="dob" className="block text-gray-700">
                  Date of Birth
                </label>
                <Field
                  id="dob"
                  name="dob"
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="dob"
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
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/auth?type=login">
            <span className="text-blue-600 hover:underline">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
