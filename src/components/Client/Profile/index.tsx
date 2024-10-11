import styles from "./style.module.css";
import avatarPost from "../../../assets/images/avatar.jpg";
import {
  InputTextProfileComponent,
  SelectTextComponent,
} from "../../common/InputProfileComponent/InputProfileComponent";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { setUserInit } from "../../../redux/actions/userAction";
export const ProfileComponent = () => {
  const [user, setUser] = useState();
  const userState = useAppSelector((state) => state.user);
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
        <p className={styles.text_date}>Tue,07 June 2024</p>
      </div>
      <div className={styles.from_information_profile}>
        <div className={styles.from_img_avt_post}>
          <img src={avatarPost} alt="" className={styles.avatar_post} />
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
        <button className={styles.btn_edit}>Edit</button>
      </div>
      <div className={styles.from_enter_information}>
        <div>
          <InputTextProfileComponent
            name="Họ và Tên"
            placeholder="VD:Nguyễn Quang Trường"
          />
          <SelectTextComponent name="Gender" options={["Nam", "Nữ"]} />
        </div>
        <div>
          <InputTextProfileComponent
            name="Mô tả"
            placeholder="VD:Quá Là Đuối... "
          />
          <SelectTextComponent
            name="Trình Độ Học Vấn"
            options={["Đại Học", "Cao Đẵng"]}
          />
        </div>
      </div>
      <button className={styles.btn_save}>Save</button>
    </div>
  );
};
