"use client";
import { addUpdateLoanService } from "@/services/loanService";
import { makeTransactionService } from "@/services/transactionService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";

type IPropType = { setMode: React.Dispatch<React.SetStateAction<string>> };
const LoanForm: React.FC<IPropType> = ({ setMode }) => {
  const initialValues: LoanFormValues = {
    id: "",
    title: "",
    description: "",
    amount: 0,
    label: "",
    status: "ACTIVE",
    lender: "",
    emiQty: 0,
  };

  const handleSubmit = async (values: LoanFormValues) => {
    try {
      if (!values.id) delete values.id;
      toast.loading("creating loan...");
      const response = await addUpdateLoanService(values);
      toast.dismiss();
      toast.success(response);
      setMode("list");
    } catch (err) {
      toast.dismiss();
      toast.error("loan creation failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-gray-900 p-4">
      <div className="max-w-xl w-full p-6 bg-black/80 border border-purple-700 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-glow">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              Create Loan
            </span>
          </h1>

          {/* Back to View Button */}
          <button
            onClick={() => {
              setMode("list");
            }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white text-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-transform transform hover:scale-105 shadow-lg"
          >
            🔙 Back to view
          </button>
        </div>
        <Formik
          initialValues={initialValues}
          //   validationSchema={loanValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
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

              {/* Lender */}
              <div>
                <label
                  className="block text-sm font-medium text-purple-300"
                  htmlFor="lender"
                >
                  Lender
                </label>
                <Field
                  type="text"
                  name="lender"
                  id="lender"
                  maxLength={100}
                  className="mt-1 w-full bg-gray-800 text-purple-200 border border-gray-600 rounded-lg px-4 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <ErrorMessage
                  name="lender"
                  component="div"
                  className="text-red-400 text-sm"
                />
              </div>

              {/* EMI Quantity */}
              <div>
                <label
                  className="block text-sm font-medium text-purple-300"
                  htmlFor="emiQty"
                >
                  EMIs Quantity
                </label>
                <Field
                  type="number"
                  name="emiQty"
                  id="emiQty"
                  className="mt-1 w-full bg-gray-800 text-purple-200 border border-gray-600 rounded-lg px-4 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <ErrorMessage
                  name="emiQty"
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
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="CLOSED">CLOSED</option>
                </Field>
                <ErrorMessage
                  name="status"
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

export default LoanForm;