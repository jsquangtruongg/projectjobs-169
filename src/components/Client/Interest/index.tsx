import styles from "./style.module.css";
import avatarPost from "../../../assets/imgs/avatar.jpg";
import { InputTextProfileComponent } from "../../common/InputProfileComponent/InputProfileComponent";

export const Interest = () => {
  return (
    <div className={styles.from_heading}>
      <div className={styles.from_img_heading}>
        <img src={avatarPost} alt="" className={styles.item_img_heading} />
      </div>
      <div className={styles.from_fill_in}>
        <div>
          <InputTextProfileComponent name="Tuổi" placeholder="VD:18" />
          <InputTextProfileComponent name="Sở Thích" placeholder="VD:Ca Hát" />
          <InputTextProfileComponent
            name="Kĩ Năng Mềm"
            placeholder="VD:Giao tiếp tốt"
          />
        </div>
        <div>
          <InputTextProfileComponent name="Học Vấn" placeholder="VD:Đại Học" />
          <InputTextProfileComponent
            name="Đã Từng Làm Công Việc Gì"
            placeholder="VD:KOL"
          />
          <InputTextProfileComponent
            name="Tính Cách"
            placeholder="VD:Vui vẻ hòa đồng"
          />
        </div>
      </div>
    </div>
  );
};
