import styles from "./style.module.css";
import avatarPost from "../../../assets/imgs/avatar.jpg";
import {
  InputTextProfileComponent,
  SelectTextComponent,
} from "../../common/InputProfileComponent/InputProfileComponent";
export const Interest = () => {
  return (
    <div className={styles.from_heading}>
      <div className={styles.from_img_heading}>
        <img src={avatarPost} alt="" className={styles.item_img_heading} />
      </div>
      <div>
        <InputTextProfileComponent name="Tuổi" placeholder="VD:18" />
        <InputTextProfileComponent name="Sở Thích" placeholder="VD:Ca Hát" />
      </div>
    </div>
  );
};
