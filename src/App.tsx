import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
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

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          element: <ProtectedRoute />, // كل الصفحات التالية محمية
          children: [
            { index: true, element: <Home /> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "userProfile", element: <UserProfile /> },
            { path: "shareProfile", element: <ShareProfile /> },
            { path: "messages", element: <Messages /> },
            { path: "sendMessage", element: <SendMessage /> },
            { path: "settings", element: <Settings /> },
            { path: "confirmEmail", element: <ConfirmEmail /> },
          ],
        },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "resetPassword", element: <ResetPassword /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  );
}

export default App;
