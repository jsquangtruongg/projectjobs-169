import styles from "./CapacityProfile.module.css";
import avatarPost from "../../../assets/imgs/avatar.jpg";
import {
  InputTextProfileComponent,
  SelectTextComponent,
} from "../../common/InputProfileComponent/InputProfileComponent";
// import line from "../../../assets/imgs/line.png"
export const CapacityProfile = () => {
  return (
    <div className={styles.from_heading_profile}>
      <div>
        <p className={styles.text_welcome}>Welcome,Quang Trường</p>
        <p className={styles.text_date}>Tue,07 June 2024</p>
      </div>
      {/* <div className={styles.from_background}>
        <img src={line} alt="" />
      </div> */}
      <div className={styles.from_information_profile}>
        <div className={styles.from_img_avt_post}>
          <img src={avatarPost} alt="" className={styles.avatar_post} />
          <div className={styles.from_text_name}>
            <p className={styles.text_name_post}>Quang Trường</p>
            <span>nguyenqtthangbinh@gmail.com</span>
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
