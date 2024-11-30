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
const NAVIGATION: Navigation = [];
const themeAppLy = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        root: {
          "&.MuiDrawer-root": {
            display: "none", // Ẩn toàn bộ Drawer
          },
        },
        docked: {
          "&.MuiDrawer-docked": {
            display: "none", // Ẩn Drawer docked
          },
        },
      },
    },

    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.MuiIconButton-root[aria-label='Collapse navigation menu']": {
            display: "none", // Ẩn nút thu gọn menu
          },
        },
      },
    },
  },
  colorSchemes: { light: true, dark: true },
});

export const AppLyMemberLayout = () => {
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
