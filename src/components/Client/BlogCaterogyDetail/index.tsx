import logo from "../../../assets/images/logo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import "./style.scss";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useNavigate, useParams } from "react-router";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { getBlogCategoryIdDetail } from "../../../redux/actions/blogCategoryAction";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Mousewheel, Pagination } from "swiper/modules";

export const BlogCategoryDetailComponent = () => {
  const blogDetailState = useAppSelector((state) => state.blogCategory);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { blogCategoryId } = useParams();
  const handleNavigateToDetail = (id: number | string) => {
    navigate(`/blog-details/${id}`);
  };

  useEffect(() => {
    dispatch(getBlogCategoryIdDetail(Number(blogCategoryId) || 0));
  }, []);
  return (
    <div className="blog-detail-container">
      <Swiper
        style={{
          padding: "0px 20px",
          height: "380px",
          width: "100%",
          borderRadius: "50px",
          marginTop: "20px",
          marginRight: "20px",
        }}
        cssMode={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Mousewheel, Keyboard, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide className="item-swiper-slide">
          <div className="blog-content">
            <p className="txt-title">Khám phá bài viết mới nhất 2025</p>
            <div className=" from-txt-detail">
              <p className="txt-detail">
                Cập nhật hàng ngày về giáo dục, tuyển sinh đại học, ngành học
                hot và hơn thế nữa tại Đại Học Tốt!
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="item-swiper-slide">
          <div className="blog-content">
            <p className="txt-title">Khám phá bài viết mới nhất 2022</p>
            <div className=" from-txt-detail">
              <p className="txt-detail">
                Cập nhật hàng ngày về giáo dục, tuyển sinh đại học, ngành học
                hot và hơn thế nữa tại Đại Học Tốt!
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="item-swiper-slide">
          <div className="blog-content">
            <p className="txt-title">Khám phá bài viết mới nhất 2023</p>
            <div className=" from-txt-detail">
              <p className="txt-detail">
                Cập nhật hàng ngày về giáo dục, tuyển sinh đại học, ngành học
                hot và hơn thế nữa tại Đại Học Tốt!
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="item-swiper-slide">
          <div className="blog-content">
            <p className="txt-title">Khám phá bài viết mới nhất 2024</p>
            <div className=" from-txt-detail">
              <p className="txt-detail">
                Cập nhật hàng ngày về giáo dục, tuyển sinh đại học, ngành học
                hot và hơn thế nữa tại Đại Học Tốt!
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="from-layout-container">
        <div className="list-blog">
          {blogDetailState.blogCategoryData?.[0]?.blogs.length === 0 ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#b2abab",
                  }}
                >
                  Chưa Có Bài Viết Nào Được Đăng
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "40px",
                  }}
                >
                  <SentimentVeryDissatisfiedIcon
                    style={{
                      color: "#b2abab",
                      fontSize: "50px",
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            blogDetailState.blogCategoryData?.[0]?.blogs.map((blog, index) => (
              <div
                className="item-blog"
                key={index}
                style={
                  {
                    "--i": `${index}`, // Truyền biến --i đúng cách
                  } as React.CSSProperties
                }
              >
                <div className="img-wrap">
                  {blog.img && <img src={blog.img} alt="Job" />}
                </div>
                <p className="item-content">{blog.title}</p>
                <div className="info-person-posting">
                  <p className="date"></p>
                </div>
              </div>
            ))
          )}
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
