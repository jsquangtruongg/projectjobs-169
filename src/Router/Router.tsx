import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../pages/Auth/RegisterPage";
import LoginPage from "../pages/Auth/LoginPage";
import FaceBookPage from "../pages/Auth/FaceBookPage";
import LoginGooglePage from "../pages/Auth/GooglePage";
import UserManagePage from "../pages/UserManage";
import HomePage from "../pages/ClientPage/HomePage";
import BlogPage from "../pages/ClientPage/BlogPage";
import { ClientLayout } from "../layout/ClientLayout";
import ReadBlogPage from "../pages/ClientPage/ReadBlogPage";
import ProfilePage from "../pages/ClientPage/ProfilePage";
import JobRecruitmentPage from "../pages/ClientPage/JobRecruitmentPage";
import InterestPage from "../pages/ClientPage/InterestPage";
import AuthLayout from "../layout/AuthLayout";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
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
    path: "/home-page",
    element: <HomePage />,
  },

  {
    element: <ClientLayout />,
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
      {
        path: "/JobRecruitment",
        element: <JobRecruitmentPage />,
      },
      {
        path: "/InterestPage",
        element: <InterestPage />,
      },
    ],
  },
]);
export default router;
