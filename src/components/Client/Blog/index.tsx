import { useEffect, useState } from "react";
import styles from "./style.module.css";
import logo from "../../../assets/imgs/logo.png";
import imgPost from "../../../assets/imgs/Rectangle25.png";
import avatarPost from "../../../assets/imgs/avatar.jpg";

import SearchIcon from "@mui/icons-material/Search";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import { useNavigate } from "react-router-dom";

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
];
export const Blog = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterBlogs, setFilterBlogs] = useState<BlogPost[]>(blogs);

  const navigate = useNavigate();

  const handleReadBlogClick = () => {
    navigate("/ReadBlogPage");
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
    <div className={styles.heading_post}>
      <div className={styles.from_heading_post}>
        <div className={styles.from_heading_padding}>
          <div className={styles.from_background}>
            <div className={styles.background_poster}></div>
          </div>
          <div className={styles.from_search}>
            <div className={styles.from_search_input}>
              <input
                type="text"
                placeholder="Search"
                className={styles.input_search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon onClick={handleSearch} />
            </div>
          </div>
          <p className={styles.text_new_post}>Bài Đăng Mới Nhất</p>
          <div className={styles.heading_body}>
            <div className={styles.from_blog_main}>
              {filterBlogs.map((blog: BlogPost, index: number) => (
                <div className={styles.form_item_blog} key={index}>
                  <div>
                    <img
                      src={imgPost}
                      alt=""
                      className={styles.img_class_post}
                      onClick={handleReadBlogClick}
                    />
                  </div>
                  <div className={styles.item_click}>{blog.title}</div>
                  <p className={styles.text_blog_hot}>{blog.content}</p>
                  <div className={styles.item_information}>
                    <div className={styles.from_style_contact}>
                      <img
                        src={avatarPost}
                        alt=""
                        className={styles.img_poster}
                      />
                      <div className={styles.text_name_member}>
                        {blog.author}
                      </div>
                    </div>
                    <p className={styles.text_date}>{blog.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.form_btn_click}>
            <div className={styles.btn_click_post}>Tất cả bài viết</div>
          </div>
        </div>

        <div className={styles.form_information}>
          <div className={styles.form_information_connect}>
            <div className={styles.from_text_information}>
              <div className={styles.item_text_information}>
                <p className={styles.text_about}>About</p>
                <p className={styles.item_describe}>
                  Chúng tôi rất vui khi được mọi người đón nhận và quan tâm,đội
                  ngũ của chúng tôi luôn luôn hỗ trợ hết mình trong công cuộc
                  tìm kiếm việc làm
                </p>
                <div className={styles.from_describe_information}>
                  <p className={styles.text_email}>Email:</p>
                  <p className={styles.text_describe_information}>
                    nguyenqtthangbinh@gmail.com
                  </p>
                </div>
                <div className={styles.from_describe_information}>
                  <p className={styles.text_email}>Phone:</p>
                  <p className={styles.text_describe_information}>0925306503</p>
                </div>
              </div>
              <div className={styles.form_select_fun}>
                <div className={styles.items_select_fun}>
                  <p className={styles.text_link}>Liên kết nhanh</p>
                  <p className={styles.select_fun}>Trang chủ</p>
                  <p className={styles.select_fun}>Tìm việc</p>
                  <p className={styles.select_fun}>Blog</p>
                  <p className={styles.select_fun}>Trắc nghiêmm</p>
                </div>
                <div>
                  <p className={styles.text_link}>Việc làm phổ biến</p>
                  <p className={styles.select_fun}>Travel</p>
                  <p className={styles.select_fun}>Marketing</p>
                  <p className={styles.select_fun}>Blog</p>
                  <p className={styles.select_fun}>sale</p>
                </div>
              </div>
              <div className={styles.from_enter_email}>
                <p className={styles.text_title}>Nhập Email</p>
                <p className={styles.text_describe_email}>
                  Tôi sẽ câp nhập cho bạn những thông tin mới nhất
                </p>
                <div className={styles.from_email}>
                  <div className={styles.item_enter_email}>
                    <input
                      type="text"
                      className={styles.input_email}
                      placeholder="Nhập Email..."
                    />
                    <MailOutlinedIcon />
                  </div>
                </div>
                <div className={styles.form_btn_subscribe}>
                  <button className={styles.btn_subscribe}>Đăng ký</button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.from_logo_web}>
            <div className={styles.item_logo_web}>
              <div className={styles.Logo}>
                <img src={logo} alt="" />
                <span className={styles.top_search}>Toptimviec.com</span>
              </div>
              <div className={styles.form_text_member}>
                <p className={styles.member_team}>Đội ngũ Adim</p>
                <p className={styles.member_team}>Terms member</p>
                <p className={styles.member_team}>Cookie Policy</p>
                <p className={styles.member_team}>Terms of Use</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.end}></div>
      </div>
    </div>
  );
};
