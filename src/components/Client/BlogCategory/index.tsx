import { useEffect, useState } from "react";
import logo from "../../../assets/images/logo.png";
import imgPost from "../../../assets/images/Rectangle25.png";

import ImgBanner from "../../../assets/images/backgroundPoster.png";

import SearchIcon from "@mui/icons-material/Search";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { getBlogCategory } from "../../../redux/actions/blogCategoryAction";
import { IBlogCategoryData } from "../../../redux/reducers/blogCategory";
import { CircularProgress } from "@mui/material";
export const BlogCategoryComponent = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dispatch = useAppDispatch();
  const blogCategoryState = useAppSelector((state) => state.blogCategory);
  const [filterBlogs, setFilterBlogs] = useState<IBlogCategoryData[]>([]);
  useEffect(() => {
    dispatch(getBlogCategory());
  }, []);

  useEffect(() => {
    setFilterBlogs(blogCategoryState.blogCategoryDataList);
  }, [blogCategoryState.blogCategoryDataList]);

  const navigate = useNavigate();

  const handleReadBlogClick = (blogCategoryId: number) => {
    navigate(`/blog-detail/${blogCategoryId}`);
  };
  const handleSearch = () => {
    const filtered = blogCategoryState.blogCategoryDataList?.filter(
      (blog: IBlogCategoryData) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.describe.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilterBlogs(filtered || []);
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
          <p className="title-page"> Danh Mục Bài Đăng Mới Nhất</p>
          <div className="section-list-blog">
            <div className="list-blog">
              {blogCategoryState.blogCategoryDataList.length === 0 ? (
                <div className="loading-data">
                  <CircularProgress />
                </div>
              ) : (
                filterBlogs.map(
                  (blogCategoryItem: IBlogCategoryData, index: number) => (
                    <div className="item-blog" key={index}>
                      <div className="img-wrap">
                        <img
                          src={imgPost}
                          alt=""
                          onClick={() =>
                            handleReadBlogClick(blogCategoryItem.id)
                          }
                        />
                      </div>
                      <div className="item-title">{blogCategoryItem.title}</div>
                      <p className="item-content">
                        {blogCategoryItem.describe}
                      </p>
                    </div>
                  )
                )
              )}
            </div>
          </div>
          <div className="btn-show-all">
            <button>Tất cả bài viết</button>
          </div>
        </div>
      </div>
      {/* Footer */}
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
    </div>
  );
};
