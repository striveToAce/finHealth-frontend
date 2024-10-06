import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

// Validation schema using Yup
const signupSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  userId: Yup.string().required('User ID is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Signup: React.FC = () => {
  const handleSignup = async (values: { firstName: string; lastName: string; userId: string; password: string }) => {
    // try {
    //   const response = await axios.post('/api/auth/signup', values);
    //   console.log('Signup successful:', response.data);
    //   // Handle token storage or redirection
    // } catch (err) {
    //   console.log('Signup failed:', err);
    // }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up for FinHealth</h2>
        <Formik
          initialValues={{ firstName: '', lastName: '', userId: '', password: '' }}
          validationSchema={signupSchema}
          onSubmit={handleSignup}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-gray-700">First Name</label>
                <Field
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage name="firstName" component="div" className="text-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
                <Field
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-500" />
              </div>
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
                {isSubmitting ? 'Signing up...' : 'Sign Up'}
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-center mt-4">
          Already have an account? <Link href="/login"><span className="text-blue-600 hover:underline">Login</span></Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
