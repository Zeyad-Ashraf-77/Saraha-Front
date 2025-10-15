import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export type IRegisterFormValues = {
  email: string;
  password: string;
  rePassword: string;
  name: string;
  phone: string;
  age: string;
}


export default function Register() {
  const navigate = useNavigate();
  async function handleSubmit(values: IRegisterFormValues) {
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("rePassword", values.rePassword);
      formData.append("name", values.name);
      formData.append("phone", values.phone);
      formData.append("age", values.age);

      const { data } = await axios.post(
        "https://saraha-app-theta.vercel.app/auth/signUp",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log(data);
      if (data?.message as unknown as string == "User created successfully") {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    rePassword: Yup.string().oneOf([Yup.ref('password')], "Passwords must match").required("Confirm password is required"),
    name: Yup.string().required("Name is required"),
    phone: Yup.string().matches(/^\d{3}-\d{3}-\d{4}$/, "Phone number must be in the format 123-456-7890").required("Phone number is required"),
    age: Yup.number().min(1, "Age must be at least 1").max(120, "Age must be at most 120").required("Age is required"), 
  });



  const formik = useFormik({
    initialValues:{
      email:"",
      password:"",
      rePassword:"",
      name:"",
      phone:"",
      age:""  
    },
    validationSchema,
    onSubmit:handleSubmit
  })
  



  return (
    <div className="min-h-screen p-5" >
      <form  onSubmit={formik.handleSubmit} className="max-w-md my-5 p-10 bg-gray-100 rounded-2xl shadow-xl shadow-blue-400 mx-auto">
      <h3 className="font-bold underline text-center mb-5"> Register</h3>
        <div className="relative z-0 w-full mb-5 group">
          <input
          {...formik.getFieldProps('email')}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          {formik.touched.email && formik.errors.email &&
            <div className="p-2 mb-4 text-sm text-red-800 rounded-2xl bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium"> {formik.errors.email}</span>
            </div>
          }
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm font-bold text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
          {...formik.getFieldProps('password')}
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          {formik.touched.password && formik.errors.password &&
            <div className="p-2 mb-4 text-sm text-red-800 rounded-2xl bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium"> {formik.errors.password}</span>
            </div>
          }
          <label
            htmlFor="password"
            className="peer-focus:font-medium font-bold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
          {...formik.getFieldProps('rePassword')}
            type="password"
            name="rePassword"
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          {formik.touched.rePassword && formik.errors.rePassword &&
            <div className="p-2 mb-4 text-sm text-red-800 rounded-2xl bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium"> {formik.errors.rePassword}</span>
            </div>
          }
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium  font-bold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
          {...formik.getFieldProps('name')}
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          {formik.touched.name && formik.errors.name &&
            <div className="p-2 mb-4 text-sm text-red-800 rounded-2xl bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium"> {formik.errors.name}</span>
            </div>
          }
          <label
            htmlFor="name"
            className="peer-focus:font-medium font-bold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
          {...formik.getFieldProps('phone')}
            type="tel"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          {formik.touched.phone && formik.errors.phone &&
            <div className="p-2 mb-4 text-sm text-red-800 rounded-2xl bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium"> {formik.errors.phone}</span> 
            </div>
          }
          <label
            htmlFor="phone"
            className="peer-focus:font-medium  font-bold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone number (123-456-7890)
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
            {...formik.getFieldProps('age')}
              type="text"
              name="age"
              id="age"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            {formik.touched.age && formik.errors.age &&
              <div className="p-2 mb-4 text-sm text-red-800 rounded-2xl bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium"> {formik.errors.age}</span> 
              </div>
            }
            <label
              htmlFor="age"
              className="peer-focus:font-medium font-bold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Age
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          register
        </button>
      </form>
    </div>
  );
}
