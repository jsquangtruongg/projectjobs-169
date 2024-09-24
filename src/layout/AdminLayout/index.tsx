import { Dashboard, Layers, ShoppingCart } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import "./style.scss";
import {
  type Navigation,
  type Router,
  AppProvider,
  DashboardLayout,
  Session,
} from "@toolpad/core";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getAdminInfo } from "../../redux/actions/userAction";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useAuth } from "../../hook/useAuth";
const NAVIGATION: Navigation = [
  {
    segment: "user",
    title: "User",
    icon: <Dashboard />,
  },
  {
    segment: "blog",
    title: "Blog",
    icon: <ShoppingCart />,
  },
  {
    segment: "blog-category",
    title: "Blog Category",
    icon: <Layers />,
  },
];
const themeAdmin = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "#f0f2f5",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.MuiListItemButton-root .MuiSvgIcon-root": { color: "#212529" },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.user);
  const [pathname, setPathname] = React.useState("/user");
  const userState = useAppSelector((state) => state.user);
  const { removeUser } = useAuth();
  const [session, setSession] = React.useState<Session | null>({
    user: {
      name: userState.userData?.firstName,
      email: userState.userData?.email,
      image:
        userState.userData?.avatar ||
        "https://avatars.githubusercontent.com/u/19550456",
    },
  });
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({});
      },
      signOut: () => {
        localStorage.removeItem("profile");
        removeUser();
        navigate("/");
      },
    };
  }, []);
  useEffect(() => {
    dispatch(getAdminInfo());
  }, []);
  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => {
        setPathname(String(path));
        navigate(`/admin${String(path)}`);
      },
    };
  }, [pathname]);
  if (state.isLoading)
    return (
      <div className="loading-data">
        <CircularProgress />
      </div>
    );

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={themeAdmin}
      branding={{ logo: <></>, title: "Admin" }}
      session={session}
      authentication={authentication}
    >
      <DashboardLayout>
        <div className="admin-layout">
          <Outlet />
        </div>
      </DashboardLayout>
    </AppProvider>
  );
};

export default AdminLayout;
