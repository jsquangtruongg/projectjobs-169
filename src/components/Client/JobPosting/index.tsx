import styles from "./style.module.css";
import avatarPost from "../../../assets/images/avatar.jpg";
import poster23 from "../../../assets/images/Rectangle23.png";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ReplySharpIcon from "@mui/icons-material/ReplySharp";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
export const JobPostingComponent = () => {
  return (
    <div>
      <div className={styles.form_heading_main}>
        <div className={styles.heading_main}>
          <div>
            <div className={styles.from_information}>
              <div className={styles.from_img_avt_post}>
                <img src={avatarPost} alt="" className={styles.avatar_post} />
                <div className={styles.from_text_name}>
                  <p className={styles.text_name_post}>Quang Trường</p>
                  <span className={styles.text_time}>1 giờ trước</span>
                </div>
              </div>
              <div>
                <ClearOutlinedIcon className={styles.icon_delete} />
              </div>
            </div>
            <div className={styles.from_text_content}>
              <p className={styles.item_text_content}>
                Sự Phát Triển Của Ngành Công Nghệ Thông Tin Trong Những Năm Gần
                Đây Trong những năm gần đây, ngành Công nghệ Thông tin (CNTT) đã
                có những bước phát triển vượt bậc, đóng góp không nhỏ vào sự
                thay đổi của xã hội và nền kinh tế toàn cầu. Từ các thành tựu
                trong trí tuệ nhân tạo (AI), điện toán đám mây, đến việc phát
                triển Internet vạn vật (IoT), những công nghệ này đang thúc đẩy
                quá trình chuyển đổi số ở mọi lĩnh vực. Một trong những tiến bộ
                nổi bật là sự bùng nổ của trí tuệ nhân tạo (AI) và học máy. AI
                không chỉ giới hạn trong các phòng thí nghiệm nghiên cứu, mà đã
                len lỏi vào cuộc sống hàng ngày. Các hệ thống trợ lý ảo như
                Siri, Google Assistant, hay Alexa, các công nghệ tự động hóa
                trong sản xuất, và các thuật toán phân tích dữ liệu trong lĩnh
                vực y tế, tài
              </p>
              <div className={styles.from_img_post}>
                <img src={poster23} alt="" />
              </div>
              <div className={styles.from_feeling}>
                <div className={styles.form_enter_feeling}>
                  <ThumbUpOutlinedIcon className={styles.icon_feeling} />
                  <p className={styles.text_like}>Thích</p>
                </div>
                <div className={styles.form_enter_feeling}>
                  <ModeCommentOutlinedIcon className={styles.icon_feeling} />
                  <p className={styles.text_like}>Bình Luận</p>
                </div>
                <div className={styles.form_enter_feeling}>
                  <FavoriteSharpIcon className={styles.icon_feeling} />
                  <p className={styles.text_like}>Quan Tâm</p>
                </div>
                <div className={styles.form_enter_feeling}>
                  <ReplySharpIcon className={styles.icon_feeling} />
                  <p className={styles.text_like}>Chia sẻ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.heading_main}>
          <div>
            <div className={styles.from_information}>
              <div className={styles.from_img_avt_post}>
                <img src={avatarPost} alt="" className={styles.avatar_post} />
                <div className={styles.from_text_name}>
                  <p className={styles.text_name_post}>Quang Trường</p>
                  <span className={styles.text_time}>1 giờ trước</span>
                </div>
              </div>
              <div>
                <ClearOutlinedIcon className={styles.icon_delete} />
              </div>
            </div>
            <div className={styles.from_text_content}>
              <p className={styles.item_text_content}>
                Sự Phát Triển Của Ngành Công Nghệ Thông Tin Trong Những Năm Gần
                Đây Trong những năm gần đây, ngành Công nghệ Thông tin (CNTT) đã
                có những bước phát triển vượt bậc, đóng góp không nhỏ vào sự
                thay đổi của xã hội và nền kinh tế toàn cầu. Từ các thành tựu
                trong trí tuệ nhân tạo (AI), điện toán đám mây, đến việc phát
                triển Internet vạn vật (IoT), những công nghệ này đang thúc đẩy
                quá trình chuyển đổi số ở mọi lĩnh vực. Một trong những tiến bộ
                nổi bật là sự bùng nổ của trí tuệ nhân tạo (AI) và học máy. AI
                không chỉ giới hạn trong các phòng thí nghiệm nghiên cứu, mà đã
                len lỏi vào cuộc sống hàng ngày. Các hệ thống trợ lý ảo như
                Siri, Google Assistant, hay Alexa, các công nghệ tự động hóa
                trong sản xuất, và các thuật toán phân tích dữ liệu trong lĩnh
                vực y tế, tài quá trình chuyển đổi số ở mọi lĩnh vực. Một trong
                những tiến bộ nổi bật là sự bùng nổ của trí tuệ nhân tạo (AI) và
                học máy. AI không chỉ giới hạn trong các phòng thí nghiệm nghiên
                cứu, mà đã len lỏi vào cuộc sống hàng ngày. Các hệ thống trợ lý
                ảo như Siri, Google Assistant, hay Alexa, các công nghệ tự động
                hóa trong sản xuất, và các thuật toán phân tích dữ liệu trong
                lĩnh vực y tế, tài
              </p>
              <div className={styles.from_img_post}>
                <img src={poster23} alt="" />
              </div>
              <div className={styles.from_feeling}>
                <div className={styles.form_enter_feeling}>
                  <ThumbUpOutlinedIcon className={styles.icon_feeling} />
                  <p className={styles.text_like}>Thích</p>
                </div>
                <div className={styles.form_enter_feeling}>
                  <ModeCommentOutlinedIcon className={styles.icon_feeling} />
                  <p className={styles.text_like}>Bình Luận</p>
                </div>
                <div className={styles.form_enter_feeling}>
                  <FavoriteSharpIcon className={styles.icon_feeling} />
                  <p className={styles.text_like}>Quan Tâm</p>
                </div>
                <div className={styles.form_enter_feeling}>
                  <ReplySharpIcon className={styles.icon_feeling} />
                  <p className={styles.text_like}>Chia sẻ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.end}></div>
    </div>
  );
};
