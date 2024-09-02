import { createBrowserRouter } from "react-router-dom";
import LoginLayout from "../layout/headingLogin/LoginLayout";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import FaceBookPage from "../pages/FaceBookPage";
import LoginGooglePage from "../pages/GooglePage";

const router = createBrowserRouter([
  {
    element: <LoginLayout />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/sign-up",
        element: <RegisterPage />,
      },
      {
        path: "/google-login",
        element: <LoginGooglePage />,
      },
      {
        path: "/facebook-login",
        element: <FaceBookPage />,
      },
    ],
  },
]);
export default router;
