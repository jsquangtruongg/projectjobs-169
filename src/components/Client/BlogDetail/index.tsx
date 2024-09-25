import avatarPost from "../../../assets/images/avatar.jpg";
import imgPost from "../../../assets/images/Rectangle25.png";
import logo from "../../../assets/images/logo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import "./style.scss";
import EmailIcon from "@mui/icons-material/Email";
import { useEffect } from "react";
import { getBlog } from "../../../redux/actions/blogActions";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { IBlogData } from "../../../redux/reducers/blog";
import { useParams } from "react-router";
export const BlogDetailComponent = () => {
  const blogDetailState = useAppSelector((state) => state.blogData);
  const dispatch = useAppDispatch();
  const { blogCategoryId } = useParams();
  useEffect(() => {
    dispatch(getBlog(Number(blogCategoryId) || 0));
  }, []);
  console.log(blogDetailState);
  const firstBlog = blogDetailState.blogData[0];
  return (
    <div className="blog-detail-container">
      <div className="layout-container">
        {firstBlog && (
          <>
            <p className="title-page">{firstBlog.title}</p>
            <div className="author-info">
              <div className="author-name">
                <img src={avatarPost} alt="" />
                <div>
                  {firstBlog.userData
                    ? `${firstBlog.userData.lastName}`
                    : "Ẩn danh"}
                </div>
              </div>
              <p>
                {new Date(firstBlog.updatedAt).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </p>
            </div>
            <div className="img-main">
              <img src={imgPost} alt="" />
            </div>
            <div className="content-blog ">
              <p>
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
                vực y tế, tài chính, và marketing đang giúp con người giải quyết
                những bài toán phức tạp, tối ưu hóa quy trình làm việc, và đưa
                ra những dự đoán chính xác hơn. Cùng với AI, điện toán đám mây
                cũng đóng vai trò quan trọng trong việc thay đổi cách thức lưu
                trữ và xử lý dữ liệu. Các doanh nghiệp lớn nhỏ đều đang chuyển
                từ mô hình truyền thống sang sử dụng dịch vụ đám mây như Amazon
                Web Services (AWS), Microsoft Azure, và Google Cloud. Điều này
                giúp họ tiết kiệm chi phí, tăng tính linh hoạt trong việc mở
                rộng hạ tầng, và cải thiện độ bảo mật của hệ thống dữ liệu. Một
                công nghệ khác đáng chú ý là Internet vạn vật (IoT), nơi mà mọi
                thiết bị có thể kết nối với nhau qua mạng Internet. Từ những
                ngôi nhà thông minh, xe tự lái, cho đến các thiết bị chăm sóc
                sức khỏe cá nhân, IoT đã mở ra một kỷ nguyên mới của kết nối và
                tự động hóa. Ngoài ra, với sự phát triển mạnh mẽ của mạng 5G,
                tốc độ truyền tải dữ liệu cũng nhanh chóng tăng lên, tạo điều
                kiện cho những công nghệ tiên tiến như thực tế ảo (VR), thực tế
                tăng cường (AR), và xe tự lái có thể hoạt động ổn định và hiệu
                quả hơn. Tuy nhiên, sự phát triển của CNTT cũng đặt ra nhiều
                thách thức, đặc biệt về vấn đề bảo mật thông tin và quyền riêng
                tư cá nhân. Khi công nghệ ngày càng can thiệp sâu vào cuộc sống,
                việc bảo vệ dữ liệu người dùng trở nên quan trọng hơn bao giờ
                hết. Các doanh nghiệp cần phải nỗ lực không ngừng để đảm bảo
                rằng hệ thống của họ an toàn trước các cuộc tấn công mạng ngày
                càng tinh vi. Tóm lại, sự phát triển của ngành CNTT trong những
                năm gần đây đã và đang tạo ra những thay đổi lớn đối với xã hội
                và kinh tế toàn cầu. Nó không chỉ mở ra những cơ hội mới, mà còn
                đòi hỏi sự linh hoạt và sẵn sàng thích nghi của con người với
                những tiến bộ công nghệ đang diễn ra một cách nhanh chóng.
              </p>
            </div>
          </>
        )}
        <div className="list-blog">
          {blogDetailState.blogData.map((blog: IBlogData, index: number) => (
            <div className="item-blog" key={index}>
              <div className="img-wrap">
                <img src={imgPost} alt="" />
              </div>
              <div className="item-title">{blog.title}</div>
              <p className="item-content">{blog.content}</p>
              <div className="info-person-posting">
                <div className="person-contact">
                  <img src={avatarPost} alt="" />
                  <div className="name-author">
                    {blog.userData
                      ? `${blog.userData.lastName}`
                      : "Tác giả ẩn danh"}
                  </div>
                </div>
                <p className="date">
                  {new Date(blog.createdAt).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section-footer">
        <div className="layout-container footer-box">
          <div className="footer-left">
            <div className="logo-white">
              <img src={logo} alt="" />
              <span>Toptimviec.com</span>
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
      </div>
    </div>
  );
};
