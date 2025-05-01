import "./style.scss";
import { InputTextProfileComponent } from "../../common/InputProfileComponent/InputProfileComponent";
import { useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import logo from "../../../assets/images/logo.png";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { putUpdateUser } from "../../../redux/actions/userAction";
import AlertDialog from "./Dialog";
import { IUserData } from "../../../redux/reducers/user";
import { motion } from "framer-motion";
interface ITableComponentProps {
  searchCriteria: IUserData;
}

export const ProfileComponent = ({ searchCriteria }: ITableComponentProps) => {
  const userState = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUserData | null>(null);

  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleString()
  );

  let isAuthenticated = false;
  if (localStorage.getItem("profile")) {
    const accessToken = JSON.parse(
      localStorage.getItem("profile") ?? ""
    )?.accessToken;
    if (accessToken) {
      isAuthenticated = true;
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString()); // Cập nhật giờ hiện tại
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const handleClickOpen = (user: IUserData) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickSave = (ser: IUserData, file: File | null) => {
    dispatch(putUpdateUser(ser, file));
    setSelectedUser(null);
    setOpen(false);
  };

  const dispatch = useAppDispatch();
  const container = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <div className="from_heading_profile">
      <div className="from-main">
        {userState.userData && (
          <div className="from_profile">
            <motion.div
              className="from-background-profile"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.div className="account-name" variants={item}>
                <span>
                  Xin Chào,{" "}
                  {userState.userData.firstName +
                    " " +
                    userState.userData.lastName}
                </span>
              </motion.div>
              <p className="text_date">{currentTime}</p>
              <motion.div className="from_information_profile">
                <div className="from_img_avt_post">
                  {userState.userData.avatar && (
                    <img
                      src={userState.userData.avatar as string}
                      alt="Job"
                      className="poster_background"
                    />
                  )}
                  <div className="from_text_name">
                    <div style={{ marginBottom: "10px" }}>
                      <span>
                        {userState.userData.firstName +
                          " " +
                          userState.userData.lastName}
                      </span>
                    </div>
                    <span>{userState.userData.email}</span>
                  </div>
                </div>
                <button
                  className="btn_edit"
                  onClick={() => handleClickOpen(userState.userData!)}
                >
                  Edit
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              className="from_enter_information"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <div className="from_enter_text">
                <InputTextProfileComponent
                  name="Họ và Tên"
                  text={
                    userState.userData.firstName +
                    " " +
                    userState.userData.lastName
                  }
                />
                <InputTextProfileComponent
                  name="Email"
                  text={userState.userData.email}
                />
              </div>
              <div className="from_enter_text">
                <InputTextProfileComponent
                  name="Mô tả"
                  text={userState.userData.description}
                />
                <InputTextProfileComponent
                  name="Trình độ học vấn"
                  text={userState.userData.education_levels}
                />
              </div>

              {(userState.userData.roleData?.id === 1 ||
                userState.userData.roleData?.id === 2) && (
                <>
                  <div className="from_enter_text">
                    <InputTextProfileComponent
                      name="Quy Mô"
                      text={userState.userData.scale}
                    />
                    <InputTextProfileComponent
                      name="Lĩnh Vực"
                      text={userState.userData.field}
                    />
                  </div>
                  <div className="from_enter_text">
                    <InputTextProfileComponent
                      name="Địa Chỉ Công Ty"
                      text={userState.userData.address}
                    />
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </div>

      <AlertDialog
        open={open}
        handleClose={handleClose}
        handleAccept={handleClickSave}
        userData={selectedUser}
      />

      <motion.div
        className="section-footer-end"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="layout-container footer-box">
          <div className="footer-left">
            <div className="logo-white">
              <img src={logo} alt="" />
              <span className="txt-company">Toptimviec.com</span>
            </div>
            <p className="describe">
              Chúng tôi cung cấp thông tin về các việc làm <br /> giúp bạn thuận
              tiện hơn trong việc tìm kiếm <br />
              công việc,chúng tôi thường xuyên cung cấp
              <br />
              các việc làm như,nhân viên sale,kinh
              <br /> doanh,bán hàng
            </p>
            <div className="icon-ground">
              <FacebookIcon style={{ marginRight: 30 }} />
              <InstagramIcon style={{ marginRight: 30 }} />
              <EmailIcon />
            </div>
          </div>
          <div className="footer-right">
            <div className="footer-right-box">
              <p className="link-page-title">Công Việc</p>
              <p className="link-page-item">Sale Bán Hàng</p>
              <p className="link-page-item">Công Nghệ Thông Tin</p>
              <p className="link-page-item">Truyền Thông</p>
            </div>
            <div className="footer-right-box">
              <p className="link-page-title">Bài báo</p>
              <p className="link-page-item">Bài viết phổ biến</p>
              <p className="link-page-item">Đọc nhiều nhất</p>
              <p className="link-page-item">đánh giá Cao</p>
              <p className="link-page-item">Bài viết mới</p>
            </div>
            <div className="footer-right-box">
              <p className="link-page-title">Liên hệ</p>
              <p className="link-page-item">
                01 2/9 Quận Hải Châu ,Thành Pho đà nẵng
              </p>
              <p className="link-page-item">0925306503</p>
              <p className="link-page-item">nguyenqtthangbinh@gmail.com</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
