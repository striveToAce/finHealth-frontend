'use client'
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

// Validation schema using Yup
const loginSchema = Yup.object().shape({
  userId: Yup.string().required('User ID is required'),
  password: Yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const handleLogin = async (values: { userId: string; password: string }) => {
    // try {
    //   const response = await axios.post('/api/auth/login', values);
    //   console.log('Login successful:', response.data);
    //   // Handle token storage or redirection
    // } catch (err) {
    //   console.log('Login failed:', err);
    // }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to FinHealth</h2>
        <Formik
          initialValues={{ userId: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="userId" className="block text-gray-700">User ID</label>
                <Field
                  id="userId"
                  name="userId"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage name="userId" component="div" className="text-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-center mt-4">
          Don't have an account? <Link href="/signup"><span className="text-blue-600 hover:underline">Sign Up</span></Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
