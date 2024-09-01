import { createBrowserRouter } from "react-router-dom";
import LoginLayout from "../common/layout/headingLogin/LoginLayout";
import LoginUser from "../Login/Registers/LoginUser";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import FaceBookPage from "../pages/FaceBookPage";

const router = createBrowserRouter([
  {
    element: <LoginLayout />,
    children: [
      {
        path: "/",
        element: <LoginUser />,
      },
      {
        path: "/RegisterPage",
        element: <RegisterPage />,
      },
      {
        path: "/GooglePage",
        element: <LoginPage />,
      },
      {
        path: "/FaceBookPage",
        element: <FaceBookPage />,
      },
    ],
  },
]);
export default router;
