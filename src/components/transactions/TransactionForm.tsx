"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";

interface TransactionFormValues {
  id?: string;
  title: string;
  description?: string;
  amount: number;
  isCredit: boolean;
  label: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
  reason?: string;
}

const TransactionForm = () => {
  const initialValues: TransactionFormValues = {
    id: "",
    title: "",
    description: "",
    amount: 0,
    isCredit: false,
    label: "",
    status: "PENDING",
    reason: "",
  };

  const handleSubmit = (values: TransactionFormValues) => {
    console.log("Form Submitted:", values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-gray-900 p-4">
      <div className="max-w-xl w-full p-6 bg-black/80 border border-purple-700 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-purple-400 mb-6 text-center animate-pulse">
          Create Transaction
        </h1>
        <Formik
          initialValues={initialValues}
          //   validationSchema={transactionValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              {/* ID */}
              <div>
                <label
                  className="block text-sm font-medium text-purple-300"
                  htmlFor="id"
                >
                  ID (optional)
                </label>
                <Field
                  type="text"
                  name="id"
                  id="id"
                  className="mt-1 w-full bg-gray-800 text-purple-200 border border-gray-600 rounded-lg px-4 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <ErrorMessage
                  name="id"
                  component="div"
                  className="text-red-400 text-sm"
                />
              </div>

              {/* Title */}
              <div>
                <label
                  className="block text-sm font-medium text-purple-300"
                  htmlFor="title"
                >
                  Title
                </label>
                <Field
                  type="text"
                  name="title"
                  id="title"
                  className="mt-1 w-full bg-gray-800 text-purple-200 border border-gray-600 rounded-lg px-4 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-400 text-sm"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  className="block text-sm font-medium text-purple-300"
                  htmlFor="description"
                >
                  Description (optional)
                </label>
                <Field
                  type="text"
                  name="description"
                  id="description"
                  className="mt-1 w-full bg-gray-800 text-purple-200 border border-gray-600 rounded-lg px-4 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-400 text-sm"
                />
              </div>

              {/* Amount */}
              <div>
                <label
                  className="block text-sm font-medium text-purple-300"
                  htmlFor="amount"
                >
                  Amount
                </label>
                <Field
                  type="number"
                  name="amount"
                  id="amount"
                  className="mt-1 w-full bg-gray-800 text-purple-200 border border-gray-600 rounded-lg px-4 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-red-400 text-sm"
                />
              </div>

              {/* isCredit */}
              <div className="flex items-center">
                <Field
                  type="checkbox"
                  name="isCredit"
                  id="isCredit"
                  className="mr-2 bg-gray-800 text-purple-500 border border-gray-600 rounded focus:ring-purple-500 focus:border-purple-500"
                />
                <label
                  className="text-sm font-medium text-purple-300"
                  htmlFor="isCredit"
                >
                  Is Credit
                </label>
              </div>

              {/* Label */}
              <div>
                <label
                  className="block text-sm font-medium text-purple-300"
                  htmlFor="label"
                >
                  Label
                </label>
                <Field
                  type="text"
                  name="label"
                  id="label"
                  className="mt-1 w-full bg-gray-800 text-purple-200 border border-gray-600 rounded-lg px-4 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <ErrorMessage
                  name="label"
                  component="div"
                  className="text-red-400 text-sm"
                />
              </div>

              {/* Status */}
              <div>
                <label
                  className="block text-sm font-medium text-purple-300"
                  htmlFor="status"
                >
                  Status
                </label>
                <Field
                  as="select"
                  name="status"
                  id="status"
                  className="mt-1 w-full bg-gray-800 text-purple-200 border border-gray-600 rounded-lg px-4 py-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="FAILED">FAILED</option>
                </Field>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-red-400 text-sm"
                />
              </div>

              {/* Reason */}
              <div>
                <label
                  className="block text-sm font-medium text-purple-300"
                  htmlFor="reason"
                >
                  Reason (optional)
                </label>
                <Field
                  type="text"
                  name="reason"
                  id="reason"
                  className="mt-1 w-full bg-gray-800 text-purple-200 border border-gray-600 rounded-lg px-4 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <ErrorMessage
                  name="reason"
                  component="div"
                  className="text-red-400 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TransactionForm;
