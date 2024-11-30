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
import { AppLyManagerLayout } from "../layout/AppLyManagerLayout";
import AppLyManagerComponent from "../pages/AppLyManager/addApply";
import { AppLyMemberLayout } from "../layout/ApplyMemberLayout";
import { AppLyMemberComponent } from "../components/Client/AppLyMember";
import DeleteApplyPage from "../pages/AppLyManager/deleteApply";
import BrowseApplyPage from "../pages/AppLyManager/browseApply";

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
    element: <AppLyManagerLayout />,
    path: "/apply-manager-layout",
    children: [
      { path: "", element: <AppLyManagerComponent /> },
      { path: "add-apply-manager", element: <AppLyManagerComponent /> },
      { path: "delete-apply-manager", element: <DeleteApplyPage /> },
      { path: "browse-apply-manager", element: <BrowseApplyPage /> },
    ],
  },
  {
    element: <AppLyMemberLayout />,
    path: "/apply-member-layout",
    children: [{ path: "", element: <AppLyMemberComponent /> }],
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
