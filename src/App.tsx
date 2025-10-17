import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Dashboard from "./Components/Dashboard/Dashboard";
import UserProfile from "./Components/UserProfile/UserProfile";
import ShareProfile from "./Components/ShareProfile/ShareProfile";
import SendMessage from "./Components/SendMessage/SendMessage";
import Messages from "./Components/Messages/Messages";
import Settings from "./Components/Settings/Settings"; 
import NotFound from "./Components/NotFound/NotFound";
import ConfirmEmail from "./Components/ConfirmEmail/ConfirmEmail";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import ProtectedRoute from "./Components/ProtectedRote";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "dashboard",
          element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
        },
        {
          path: "userProfile",
          element: <ProtectedRoute><UserProfile /></ProtectedRoute>,
        },
        {
          path: "shareProfile",
          element: <ProtectedRoute><ShareProfile /></ProtectedRoute>,
        },
        {
          path: "messages",
          element: <ProtectedRoute><Messages /></ProtectedRoute>,
        },
        {
          path: "sendMessage",
          element: <ProtectedRoute><SendMessage /></ProtectedRoute>,
        },
        {
          path: "settings",
          element: <ProtectedRoute><Settings /></ProtectedRoute>,
        },
        {
          path: "confirmEmail",
          element: <ProtectedRoute><ConfirmEmail /></ProtectedRoute>,
        },
        {
          path: "forgetPassword",
          element: <ForgetPassword />,
        },
        {
          path: "resetPassword",
          element: <ProtectedRoute><ResetPassword /></ProtectedRoute>,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
  
}

export default App;
