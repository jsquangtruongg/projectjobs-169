import styles from "./style.module.css";
import avatarPost from "../../../assets/images/avatar.jpg";
import poster23 from "../../../assets/images/Rectangle23.png";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ReplySharpIcon from "@mui/icons-material/ReplySharp";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import "./style.scss";
export const JobPostingComponent = () => {
  return (
    <div className="job-posting-container">
      <div className="layout-container job-posting-box">
        <div className="posting-item">
          <div className="author-info">
            <img src={avatarPost} alt="" />
            <div className="author-name">
              <p>Quang Trường</p> <p>1 giờ trước</p>
            </div>
          </div>
          <div className="posting-content">
            <p>
              Sự Phát Triển Của Ngành Công Nghệ Thông Tin Trong Những Năm Gần
              Đây Trong những năm gần đây, ngành Công nghệ Thông tin (CNTT) đã
              có những bước phát triển vượt bậc, đóng góp không nhỏ vào sự thay
              đổi của xã hội và nền kinh tế toàn cầu. Từ các thành tựu trong trí
              tuệ nhân tạo (AI), điện toán đám mây, đến việc phát triển Internet
              vạn vật (IoT), những công nghệ này đang thúc đẩy quá trình chuyển
              đổi số ở mọi lĩnh vực. Một trong những tiến bộ nổi bật là sự bùng
              nổ của trí tuệ nhân tạo (AI) và học máy. AI không chỉ giới hạn
              trong các phòng thí nghiệm nghiên cứu, mà đã len lỏi vào cuộc sống
              hàng ngày. Các hệ thống trợ lý ảo như Siri, Google Assistant, hay
              Alexa, các công nghệ tự động hóa trong sản xuất, và các thuật toán
              phân tích dữ liệu trong lĩnh vực y tế, tài
            </p>
            <img src={poster23} alt="" />
          </div>
          <div className="group-icon-action">
            <div className="item-action">
              <ThumbUpOutlinedIcon className={styles.icon_feeling} />
              <p>Thích</p>
            </div>
            <div className="item-action">
              <ModeCommentOutlinedIcon className={styles.icon_feeling} />
              <p>Bình Luận</p>
            </div>
            <div className="item-action">
              <FavoriteSharpIcon className={styles.icon_feeling} />
              <p>Quan Tâm</p>
            </div>
            <div className="item-action">
              <ReplySharpIcon className={styles.icon_feeling} />
              <p>Chia sẻ</p>
            </div>
          </div>
        </div>
        <div className="posting-item">
          <div className="author-info">
            <img src={avatarPost} alt="" />
            <div className="author-name">
              <p>Quang Trường</p> <p>1 giờ trước</p>
            </div>
          </div>
          <div className="posting-content">
            <p>
              Sự Phát Triển Của Ngành Công Nghệ Thông Tin Trong Những Năm Gần
              Đây Trong những năm gần đây, ngành Công nghệ Thông tin (CNTT) đã
              có những bước phát triển vượt bậc, đóng góp không nhỏ vào sự thay
              đổi của xã hội và nền kinh tế toàn cầu. Từ các thành tựu trong trí
              tuệ nhân tạo (AI), điện toán đám mây, đến việc phát triển Internet
              vạn vật (IoT), những công nghệ này đang thúc đẩy quá trình chuyển
              đổi số ở mọi lĩnh vực. Một trong những tiến bộ nổi bật là sự bùng
              nổ của trí tuệ nhân tạo (AI) và học máy. AI không chỉ giới hạn
              trong các phòng thí nghiệm nghiên cứu, mà đã len lỏi vào cuộc sống
              hàng ngày. Các hệ thống trợ lý ảo như Siri, Google Assistant, hay
              Alexa, các công nghệ tự động hóa trong sản xuất, và các thuật toán
              phân tích dữ liệu trong lĩnh vực y tế, tài
            </p>
            <img src={poster23} alt="" />
          </div>
          <div className="group-icon-action">
            <div className="item-action">
              <ThumbUpOutlinedIcon className={styles.icon_feeling} />
              <p>Thích</p>
            </div>
            <div className="item-action">
              <ModeCommentOutlinedIcon className={styles.icon_feeling} />
              <p>Bình Luận</p>
            </div>
            <div className="item-action">
              <FavoriteSharpIcon className={styles.icon_feeling} />
              <p>Quan Tâm</p>
            </div>
            <div className="item-action">
              <ReplySharpIcon className={styles.icon_feeling} />
              <p>Chia sẻ</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.end}></div>
    </div>
  );
};
