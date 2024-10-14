import avatarPost from "../../../assets/images/avatar.jpg";
import logo from "../../../assets/images/logo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import "./style.scss";
import EmailIcon from "@mui/icons-material/Email";
import { useEffect } from "react";
import { getBlog } from "../../../redux/actions/blogActions";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useParams } from "react-router";

import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
export const BlogDetailComponent = () => {
  const blogDetailState = useAppSelector((state) => state.blog);
  const dispatch = useAppDispatch();
  const { blogCategoryId } = useParams();
  useEffect(() => {
    dispatch(getBlog(Number(blogCategoryId) || 0));
  }, []);
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
            <div className="img-main"></div>
            <div className="content-blog ">
              <div
                className="content-container"
                dangerouslySetInnerHTML={{ __html: firstBlog.content || "" }}
              ></div>
            </div>
          </>
        )}
        <div className="list-blog">
          {blogDetailState.blogData.length === 0 ? (
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
            blogDetailState.blogData.map((blog, index: number) => (
              <div className="item-blog" key={index}>
                <div className="img-wrap">
                  {blog.img && <img src={blog.img as string} alt="Job" />}
                </div>
                <div className="item-title">Công Nghệ</div>
                <p className="item-content">{blog.title}</p>
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
