import { createBrowserRouter } from "react-router-dom";
import LoginLayout from "../layout/headingLogin/LoginLayout";
import RegisterPage from "../pages/Auth/RegisterPage";
import LoginPage from "../pages/Auth/LoginPage";
import FaceBookPage from "../pages/Auth/FaceBookPage";
import LoginGooglePage from "../pages/Auth/GooglePage";
import UserManagePage from "../pages/UserManage";
import HomePage from "../pages/Auth/HomePage";
import BlogPage from "../pages/Auth/BlogPage";
import { BlogLayout } from "../layout/BlogPage/BlogLayout";
import ReadBlogPage from "../pages/Auth/ReadBlogPage";
import ProfilePage from "../pages/Auth/ProfilePage";

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
      {
        path: "/user-manage",
        element: <UserManagePage />,
      },
    ],
  },
  {
    element: <HomePage />,
    children: [
      {
        path: "/home-page",
        element: <HomePage />,
      },
    ],
  },
  {
    element: <BlogLayout />,
    children: [
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/ReadBlogPage",
        element: <ReadBlogPage />,
      },
      {
        path: "/ProfilePage",
        element: <ProfilePage />,
      },
    ],
  },
]);
export default router;
