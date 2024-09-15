import { useState } from "react";
import logo from "../../../assets/images/logo.png";
import imgPost from "../../../assets/images/Rectangle25.png";
import avatarPost from "../../../assets/images/avatar.jpg";
import ImgBanner from "../../../assets/images/backgroundPoster.png";

import SearchIcon from "@mui/icons-material/Search";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import { useNavigate } from "react-router-dom";
import "./style.scss";
interface BlogPost {
  imgPost: string;
  title: string;
  content: string;
  author: string;
  date: string;
}
const blogs: BlogPost[] = [
  {
    imgPost: imgPost,
    title: "Technology",
    content:
      "Những công nghệ hot nhất hiện nay trong lĩnh vực IT lương lên đến 10.000$",
    author: "Quang Trường",
    date: "25 August 2024",
  },
  {
    imgPost: imgPost,
    title: "Technology",
    content:
      "Những đổi mới trong ngành Marketing đã làm cho nhiều sinh viên có thêm nhiều việc làm",
    author: "Quang Trường",
    date: "25 August 2024",
  },
  {
    imgPost: imgPost,
    title: "Technology",
    content:
      "Những công nghệ hot nhất hiện nay trong lĩnh vực IT lương lên đến 10.000$",
    author: "Quang Trường",
    date: "25 August 2024",
  },
  {
    imgPost: imgPost,
    title: "Technology",
    content:
      "Những đổi mới trong ngành Marketing đã làm cho nhiều sinh viên có thêm nhiều việc làm",
    author: "Quang Trường",
    date: "25 August 2024",
  },
  {
    imgPost: imgPost,
    title: "Technology",
    content:
      "Những đổi mới trong ngành Marketing đã làm cho nhiều sinh viên có thêm nhiều việc làm",
    author: "Quang Trường",
    date: "25 August 2024",
  },
  {
    imgPost: imgPost,
    title: "Technology",
    content:
      "Những đổi mới trong ngành Marketing đã làm cho nhiều sinh viên có thêm nhiều việc làm",
    author: "Quang Trường",
    date: "25 August 2024",
  },
];
export const BlogCategoryComponent = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterBlogs, setFilterBlogs] = useState<BlogPost[]>(blogs);
  const navigate = useNavigate();

  const handleReadBlogClick = () => {
    navigate("/blog-detail");
  };
  const handleSearch = () => {
    const filtered = blogs.filter(
      (blog: BlogPost) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilterBlogs(filtered);
  };
  return (
    <div className="blog-category-container">
      <div className="section-banner">
        <img src={ImgBanner} alt="" />
      </div>
      <div className="layout-container blog-category-box ">
        <div className="main">
          <div className="section-search">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon onClick={handleSearch} />
            </div>
          </div>
          <p className="title-page">Bài Đăng Mới Nhất</p>
          <div className="section-list-blog">
            <div className="list-blog">
              {filterBlogs.map((blog: BlogPost, index: number) => (
                <div className="item-blog" key={index}>
                  <div className="img-wrap">
                    <img src={imgPost} alt="" onClick={handleReadBlogClick} />
                  </div>
                  <div className="item-title">{blog.title}</div>
                  <p className="item-content">{blog.content}</p>
                  <div className="info-person-posting">
                    <div className="person-contact">
                      <img src={avatarPost} alt="" />
                      <div className="name-author">{blog.author}</div>
                    </div>
                    <p className="date">{blog.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="btn-show-all">
            <button>Tất cả bài viết</button>
          </div>
        </div>
      </div>
      <div className="section-about-us">
        <div className="layout-container about-us-box">
          <div className="info">
            <p className="title">About</p>
            <p className="describe">
              Chúng tôi rất vui khi được mọi người <br />
              đón nhận và quan tâm,đội ngũ của chúng <br />
              tôi luôn luôn hỗ trợ hết mình trong công cuộc <br />
              tìm kiếm việc làm
            </p>
            <br />
            <div className="info-contact">
              <p className="title">Email:</p>
              <p className="describe">nguyenqtthangbinh@gmail.com</p>
            </div>
            <div className="info-contact">
              <p className="title">Phone:</p>
              <p className="describe">0925306503</p>
            </div>
          </div>
          <div className="link-page">
            <div className="link-page-box">
              <p className="link-page-title">Liên kết nhanh</p>
              <p className="link-page-item">Trang chủ</p>
              <p className="link-page-item">Tìm việc</p>
              <p className="link-page-item">Blog</p>
              <p className="link-page-item">Trắc nghiêmm</p>
            </div>
            <div className="link-page-box">
              <p className="link-page-title">Việc làm phổ biến</p>
              <p className="link-page-item">Travel</p>
              <p className="link-page-item">Marketing</p>
              <p className="link-page-item">Blog</p>
              <p className="link-page-item">sale</p>
            </div>
          </div>
          <div className="send-email">
            <p className="title">Nhập Email</p>
            <p className="describe">
              Tôi sẽ câp nhập cho bạn những thông tin mới nhất
            </p>
            <div className="field-email">
              <input type="text" placeholder="Nhập Email..." />
              <MailOutlinedIcon />
            </div>
            <div className="btn-subscribe">
              <button>Đăng ký</button>
            </div>
          </div>
        </div>
      </div>
      <div className="section-footer">
        <div className="footer-box">
          <div className="footer-logo">
            <img src={logo} alt="" />
            <span>Toptimviec.com</span>
          </div>
          <div className="footer-info-other">
            <p>Đội ngũ Adim</p>
            <p>Terms member</p>
            <p>Cookie Policy</p>
            <p>Terms of Use</p>
          </div>
        </div>
      </div>
      {/* <div className={styles.end}></div> */}
    </div>
  );
};
