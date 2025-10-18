import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { setToken } from "../utils/auth";

export type emailConfirmationForm = {
  email: string;
  otp: string;
};

export default function ConfirmEmail() {
  const navigate = useNavigate();

  async function handleSubmit(values: emailConfirmationForm) {
    try {
      const { data } = await axios.post(
        "https://saraha-app-theta.vercel.app/auth/confirmEmail",
        values,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if(data.message === "confirmed Success") {
        setToken(data.accessToken);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    otp: Yup.string()
      .min(4, "OTP must be at least 4 characters")
      .required("OTP is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
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
        <h3 className="font-bold text-center mb-5 text-xl text-pink-600"> Please Confirm Your Email</h3>
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
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...formik.getFieldProps("otp")}
            type="text"
            name="otp"
            id="otp"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
          />
          {formik.touched.otp && formik.errors.otp && (
            <div
              className="p-2 mb-4 text-sm text-red-800 rounded-2xl bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium"> {formik.errors.otp}</span>
            </div>
          )}
          <label
            htmlFor="otp"
            className="peer-focus:font-medium font-bold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            OTP
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800 "
        >
          Confirm Email
        </button>
        
      </form>
    </div>
  );
}
