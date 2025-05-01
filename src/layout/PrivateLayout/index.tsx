import { AccountCircle, ManageAccounts } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import SendIcon from "@mui/icons-material/Send";
import SettingsIcon from "@mui/icons-material/Settings";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import PersonIcon from "@mui/icons-material/Person";
import avt from "../../assets/images/avatar.jpg";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import {
  ButtonComponent,
  ButtonDropComponent,
} from "../../components/common/ButtonComponent/ButtonComponent";
import { useAuth } from "../../hook/useAuth";
import { setUserInit } from "../../redux/actions/userAction";
import { useAppDispatch, useAppSelector } from "../../redux/store";

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Collapse,
} from "@mui/material";
import DraftsIcon from "@mui/icons-material/Drafts";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import InboxIcon from "@mui/icons-material/Inbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import React from "react";
import "./style.scss";
const PrivateRoute = () => {
  const [showFrom, setShowFrom] = useState(false);
  const userState = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [openNested, setOpenNested] = useState(true);
  const [openSetup, setOpenSetup] = useState(false);
  const [openFromAdmin, setOpenFromAdmin] = useState(false);
  const handleClickAdmin = () => {
    setOpenFromAdmin(!openFromAdmin);
  };
  const handleClickSetup = () => {
    setOpenSetup(!openSetup);
  };
  const handleClick = () => {
    setOpenNested(!openNested);
  };

  const toggleTooltip = () => {
    setOpen((prev) => !prev);
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, removeUser } = useAuth();

  useEffect(() => {
    if (user) {
      dispatch(setUserInit(user));
      return;
    }
  }, [user]);
  let isAuthenticated = false;
  if (localStorage.getItem("profile")) {
    const accessToken = JSON.parse(
      localStorage.getItem("profile") ?? ""
    )?.accessToken;
    if (accessToken) {
      isAuthenticated = true;
    }
  }
  const toggleShowFrom = () => {
    setShowFrom(!showFrom);
  };
  const handleLogout = () => {
    localStorage.removeItem("profile");
    removeUser();
    navigate("/");
  };

  const handleNavigateAdmin = () => {
    navigate("/admin");
  };

  const handleNavigateAppLyManager = () => {
    navigate("/apply-manager-layout");
  };

  const handleNavigateAppLyMember = () => {
    navigate("/apply-member-layout");
  };

  return user || !!isAuthenticated ? (
    <div className="client-layout">
      <div className="header-container">
        <div className="header-box">
          <div className="logo">
            <img src={logo} alt="" />
            <span>Toptimviec.com</span>
          </div>
          <div className="header-nav">
            <ButtonComponent name="Trang Chủ" />
            <ButtonComponent name="Tuyển Dụng" />
            <ButtonDropComponent
              name="Diễn Đàn"
              items={["Blog Việc", "Bài Viết"]}
            />
            <ButtonComponent name="Hồ Sơ" />
          </div>
          <div
            className="account-info"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            style={{ position: "relative" }}
          >
            <Tooltip
              classes={{ tooltip: "user-info-tooltip" }}
              title={
                <div className="user-info-list">
                  <div className="from-information">
                    <div className="item-information">
                      <img
                        src={userState.userData?.avatar}
                        alt=""
                        className="img-avt"
                      />
                      <div className="from-concat">
                        <p className="item-name">Trường Nguyễn</p>
                        <p className="check-successfully">
                          Tài khoản đã xác thực
                        </p>
                        <div className="item-id">
                          <p className="user-information">
                            ID:{userState.userData?.id}
                          </p>
                          <p className="user-information">|</p>
                          <p className="user-information">
                            {userState.userData?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="from-list-item">
                    <List
                      sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                      }}
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                    >
                      <ListItemButton
                        onClick={handleClick}
                        className="item-list-drop"
                      >
                        <ListItemIcon>
                          <InboxIcon className="item-icon-list" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <span className="txt-list-item">
                              Quản lí tìm việc
                            </span>
                          }
                        />
                        {openNested ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={openNested} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          <ListItemButton sx={{ pl: 4 }} className="sub-item">
                            <ListItemIcon>
                              <SaveAltIcon className="item-icon-list" />
                            </ListItemIcon>
                            <ListItemText primary="Việc làm đã lưu" />
                          </ListItemButton>
                          <ListItemButton sx={{ pl: 4 }} className="sub-item">
                            <ListItemIcon>
                              <BookmarkAddedIcon className="item-icon-list" />
                            </ListItemIcon>
                            <ListItemText primary="Việc làm đã ứng tuyển" />
                          </ListItemButton>
                        </List>
                      </Collapse>
                    </List>
                    <List
                      sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                      }}
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                    >
                      <ListItemButton
                        onClick={toggleShowFrom}
                        className="item-list-drop"
                      >
                        <ListItemIcon>
                          <MarkEmailReadIcon className="item-icon-list" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <span className="txt-list-item">
                              Cài đặt email & Thông báo
                            </span>
                          }
                        />
                        {showFrom ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={showFrom} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          <ListItemButton sx={{ pl: 4 }} className="sub-item">
                            <ListItemIcon>
                              <MarkEmailUnreadIcon className="item-icon-list" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Thông Báo"
                              onClick={
                                userState?.userData?.roleData?.code &&
                                (userState.userData.roleData.code === "R1" ||
                                  userState.userData.roleData.code === "R2")
                                  ? handleNavigateAppLyManager
                                  : handleNavigateAppLyMember
                              }
                            />
                          </ListItemButton>
                        </List>
                      </Collapse>
                    </List>
                    <List
                      sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                      }}
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                    >
                      <ListItemButton
                        onClick={handleClickSetup}
                        className="item-list-drop"
                      >
                        <ListItemIcon>
                          <SettingsSuggestIcon className="item-icon-list" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <span className="txt-list-item">
                              Cài đặt & Hỗ trợ
                            </span>
                          }
                        />
                        {openSetup ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={openSetup} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          <ListItemButton sx={{ pl: 4 }} className="sub-item">
                            <ListItemIcon>
                              <SettingsIcon className="item-icon-list" />
                            </ListItemIcon>
                            <ListItemText primary="Cài đặt" />
                          </ListItemButton>
                          <ListItemButton sx={{ pl: 4 }} className="sub-item">
                            <ListItemIcon>
                              <SendIcon className="item-icon-list" />
                            </ListItemIcon>
                            <ListItemText primary="Trợ giúp & Hổ trọ" />
                          </ListItemButton>
                        </List>
                      </Collapse>
                    </List>
                    {userState?.userData?.roleData &&
                      (userState.userData.roleData.id === 1 ||
                        userState.userData.roleData.id === 2) && (
                        <List
                          sx={{
                            width: "100%",
                            bgcolor: "background.paper",
                          }}
                          component="nav"
                          aria-labelledby="nested-list-subheader"
                        >
                          <ListItemButton
                            onClick={handleClickAdmin}
                            className="item-list-drop"
                          >
                            <ListItemIcon>
                              <PersonIcon className="item-icon-list" />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <span className="txt-list-item">Admin</span>
                              }
                            />
                            {openFromAdmin ? <ExpandLess /> : <ExpandMore />}
                          </ListItemButton>
                          <Collapse
                            in={openFromAdmin}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List component="div" disablePadding>
                              <ListItemButton
                                sx={{ pl: 4 }}
                                className="sub-item"
                              >
                                <ListItemIcon>
                                  <PersonIcon className="item-icon-list" />
                                </ListItemIcon>
                                <ListItemText
                                  primary="AD"
                                  onClick={handleNavigateAdmin}
                                />
                              </ListItemButton>
                            </List>
                          </Collapse>
                        </List>
                      )}

                    <div className="item" onClick={handleLogout}>
                      <LogoutIcon className="item-icon" />
                      Đăng Xuất
                    </div>
                  </div>
                </div>
              }
              open={open}
              onClose={() => setOpen(false)}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              placement="bottom-end"
            >
              <div className="account-name" onClick={toggleTooltip}>
                <span>
                  {userState.userData?.firstName +
                    " " +
                    userState.userData?.lastName}
                </span>
                <div>
                  {userState.userData?.avatar && (
                    <img
                      src={userState.userData.avatar as string}
                      alt="user"
                      className="item-avatar"
                    />
                  )}
                </div>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="from-outlet" >
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
