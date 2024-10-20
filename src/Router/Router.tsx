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
import PrivateRoute from "../layout/PrivateLayout";
import AdminLayout from "../layout/AdminLayout";
import UserAdminPage from "../pages/Admin/User";
import BlogAdminPage from "../pages/Admin/Blog";
import BlogCategoryAdminPage from "../pages/Admin/BlogCategory";
import JobAdminPage from "../pages/Admin/job";
import JobCategoryAdminPage from "../pages/Admin/JobCategory";
import { AppLyLayout } from "../layout/AppLyLayout";
import { AppLyComponent } from "../components/Client/AppLy";

const router = createBrowserRouter([
  {
    element: <AdminLayout />,
    path: "/admin",
    children: [
      { path: "", element: <UserAdminPage /> },
      { path: "user", element: <UserAdminPage /> },
      { path: "blog", element: <BlogAdminPage /> },
      { path: "blog-category", element: <BlogCategoryAdminPage /> },
      { path: "job", element: <JobAdminPage /> },
      { path: "job-category", element: <JobCategoryAdminPage /> },
    ],
  },
  {
    element: <AppLyLayout />,
    path: "/apply-layout",
    children: [{ path: "", element: <AppLyComponent /> }],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/blog-category",
        element: <BlogCategoryPage />,
      },
      {
        path: "/blog-detail/:blogCategoryId",
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
    element: <ClientLayout />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
    ],
  },
]);
export default router;
