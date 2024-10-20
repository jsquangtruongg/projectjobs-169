import styles from "./style.module.css";
import avatarPost from "../../../assets/images/avatar.jpg";
import {
  InputTextProfileComponent,
  SelectTextComponent,
} from "../../common/InputProfileComponent/InputProfileComponent";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { setUserInit } from "../../../redux/actions/userAction";
import AlertDialog from "./Dialog";

type Props = {};

export const ProfileComponent = () => {
  const [user, setUser] = useState();
  const userState = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleString()
  );
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString()); // Cập nhật giờ hiện tại
    }, 1000);

    // Cleanup khi component bị hủy
    return () => clearInterval(timer);
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickSave = () => {
    setOpen(false);
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) {
      dispatch(setUserInit(user));
      return;
    }
  }, [user]);
  return (
    <div className={styles.from_heading_profile}>
      <div>
        <div className="account-name">
          {" "}
          <span>
            Xin Chào,
            {userState.userData?.firstName + " " + userState.userData?.lastName}
          </span>
        </div>
        <p className={styles.text_date}>{currentTime}</p>
      </div>
      <div className={styles.from_information_profile}>
        <div className={styles.from_img_avt_post}>
          {userState.userData?.avatar && (
            <img
              src={userState.userData.avatar as string}
              alt="Job"
              className={styles.poster_background}
            />
          )}
          <div className={styles.from_text_name}>
            <div style={{ marginBottom: "10px" }}>
              {" "}
              <span>
                {userState.userData?.firstName +
                  " " +
                  userState.userData?.lastName}
              </span>
            </div>
            <span>{userState.userData?.email}</span>
          </div>
        </div>
        <button className={styles.btn_edit} onClick={handleClickOpen}>
          Edit
        </button>
      </div>
      <div className={styles.from_enter_information}>
        <div>
          <InputTextProfileComponent
            name="Họ và Tên"
            text={
              userState.userData?.firstName + " " + userState.userData?.lastName
            }
          />
          <InputTextProfileComponent
            name="Email"
            text={userState.userData?.email}
          />
        </div>
        <div>
          <InputTextProfileComponent name="Mô tả" text="Mệt đuối" />
          <InputTextProfileComponent name="Trình độ học vấn" text="Đại học" />
        </div>
      </div>

      <AlertDialog
        open={open}
        handleClose={handleClose}
        handleAccept={handleClickSave}
      />
    </div>
  );
};
