import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../pages/Auth/RegisterPage";
import LoginPage from "../pages/Auth/LoginPage";
import FaceBookPage from "../pages/Auth/FaceBookPage";
import LoginGooglePage from "../pages/Auth/GooglePage";
import HomePage from "../pages/Client/Home";
import ClientLayout from "../layout/ClientLayout";
import ProfilePage from "../pages/Client/Profile";
import AuthLayout from "../layout/AuthLayout";
import BlogCategoryPage from "../pages/Client/BlogCategory";
import BlogDetailPage from "../pages/Client/BlogDetail";
import JobPostingPage from "../pages/Client/JobPosting";

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
    ],
  },

  {
    path: "/home",
    element: <HomePage />,
  },

  {
    element: <ClientLayout />,
    children: [
      {
        path: "/blog-category",
        element: <BlogCategoryPage />,
      },
      {
        path: "/blog-detail",
        element: <BlogDetailPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/job-posting",
        element: <JobPostingPage />,
      },
    ],
  },
]);
export default router;
