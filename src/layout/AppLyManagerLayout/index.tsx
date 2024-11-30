import { CircularProgress } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import {
  type Navigation,
  type Router,
  AppProvider,
  DashboardLayout,
  Session,
} from "@toolpad/core";
import styles from "./style.module.scss";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getAdminInfo } from "../../redux/actions/userAction";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useAuth } from "../../hook/useAuth";
import { Dashboard } from "@mui/icons-material";
const NAVIGATION: Navigation = [
  {
    segment: "add-apply-manager",
    title: "Danh Sách Ứng Tuyển",
    icon: <Dashboard />,
  },
  {
    segment: "delete-apply-manager",
    title: "Danh Sách Đã Từ Chối",
    icon: <Dashboard />,
  },
  {
    segment: "browse-apply-manager",
    title: "Danh Sách Đã Duyệt",
    icon: <Dashboard />,
  },
];
const themeAppLy = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        // root: {
        //   "&.MuiDrawer-root": {
        //     width: "120px", // Ẩn toàn bộ Drawer
        //   },
        // },
        // // paper: {
        // //   // Chỉnh sửa ở đây
        // //   width: "300px !important", // Đặt chiều rộng
        // //   backgroundColor: "#1b1c57", // Đặt màu nền
        // //   overflowX: "hidden", // Tránh tràn
        // // },
        // docked: {
        //   "&.MuiDrawer-docked": {
        //     width: "115px",
        //   },
        // },
      },
    },
  },
  colorSchemes: { light: true, dark: true },
});

export const AppLyManagerLayout = () => {
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
        navigate(`/apply-manager-layout${String(path)}`);
      },
    };
  }, [pathname]);
  if (state.isLoading)
    return (
      <div className={styles["loading-data"]}>
        <CircularProgress />
      </div>
    );

  return (
    <AppProvider
      theme={themeAppLy}
      navigation={NAVIGATION}
      router={router}
      branding={{ logo: <></>, title: "Ứng Tuyển" }}
      session={session}
      authentication={authentication}
      disableDrawer
    >
      <DashboardLayout>
        <div className={styles["Apply-layout"]}>
          <Outlet />
        </div>
      </DashboardLayout>
    </AppProvider>
  );
};
