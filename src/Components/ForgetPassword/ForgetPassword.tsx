import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export type LoginForm = {
  email: string;
};

export default function Login() {
  const navigate = useNavigate();
  async function handleSubmit(values: LoginForm) {
    try {
      const { data } = await axios.post(
        "https://saraha-app-theta.vercel.app/auth/forgetPassword",
        values,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(data);
      navigate("/resetpassword");
    } catch (error) {
      console.log(error);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="min-h-screen p-5">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-md my-5 p-10 bg-gray-100 rounded-2xl shadow-xl shadow-pink-400 mx-auto"
      >
        <h3 className="font-bold text-center mb-5"> Welcome Back</h3>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...formik.getFieldProps("email")}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
          />
          {formik.touched.email && formik.errors.email && (
            <div
              className="p-2 mb-4 text-sm text-red-800 rounded-2xl bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium"> {formik.errors.email}</span>
            </div>
          )}
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm font-bold text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-lg shadow mt-4 transition-colors"
        >
send code        </button>
      </form>
    </div>
  );
}
