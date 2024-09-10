import styles from "./style.module.css";
import logo from "../../../assets/imgs/logo.png";
import imgPost from "../../../assets/imgs/Rectangle25.png";
import avatarPost from "../../../assets/imgs/avatar.jpg";

import SearchIcon from "@mui/icons-material/Search";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import { useNavigate } from "react-router-dom";

export const Blog = () => {
  const navigate = useNavigate();

  const handleReadBlogClick = () => {
    navigate("/ReadBlogPage");
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
              />
              <SearchIcon />
            </div>
          </div>
          <p className={styles.text_new_post}>Bài Đăng Mới Nhất</p>
          <div className={styles.heading_body}>
            <div className={styles.from_blog_main}>
              <div
                className={styles.form_item_blog}
                onClick={handleReadBlogClick}
              >
                <div>
                  <img src={imgPost} alt="" className={styles.img_class_post} />
                </div>
                <div className={styles.item_click}>Technology</div>
                <p className={styles.text_blog_hot}>
                  Những công nghệ hot nhất
                  <br /> hiện nay trong lĩnh vực IT
                  <br /> lương lên đến 10.000$
                </p>
                <div className={styles.item_information}>
                  <div className={styles.from_style_contact}>
                    <img
                      src={avatarPost}
                      alt=""
                      className={styles.img_poster}
                    />
                    <div className={styles.text_name_member}>Quang Trường</div>
                  </div>
                  <p className={styles.text_date}>25 August 2024</p>
                </div>
              </div>

              <div className={styles.form_item_blog}>
                <img src={imgPost} alt="" className={styles.img_class_post} />
                <div className={styles.item_click}>Technology</div>
                <p className={styles.text_blog_hot}>
                  Những công nghệ hot nhất
                  <br /> hiện nay trong lĩnh vực IT
                  <br /> lương lên đến 10.000$
                </p>
                <div className={styles.item_information}>
                  <div className={styles.from_style_contact}>
                    <img
                      src={avatarPost}
                      alt=""
                      className={styles.img_poster}
                    />
                    <div className={styles.text_name_member}>Quang Trường</div>
                  </div>
                  <p className={styles.text_date}>25 August 2024</p>
                </div>
              </div>
              <div className={styles.form_item_blog}>
                <img src={imgPost} alt="" className={styles.img_class_post} />
                <div className={styles.item_click}>Technology</div>
                <p className={styles.text_blog_hot}>
                  Những công nghệ hot nhất
                  <br /> hiện nay trong lĩnh vực IT
                  <br /> lương lên đến 10.000$
                </p>
                <div className={styles.item_information}>
                  <div className={styles.from_style_contact}>
                    <img
                      src={avatarPost}
                      alt=""
                      className={styles.img_poster}
                    />
                    <div className={styles.text_name_member}>Quang Trường</div>
                  </div>
                  <p className={styles.text_date}>25 August 2024</p>
                </div>
              </div>
              <div className={styles.form_item_blog}>
                <img src={imgPost} alt="" className={styles.img_class_post} />
                <div className={styles.item_click}>Technology</div>
                <p className={styles.text_blog_hot}>
                  Những công nghệ hot nhất
                  <br /> hiện nay trong lĩnh vực IT
                  <br /> lương lên đến 10.000$
                </p>
                <div className={styles.item_information}>
                  <div className={styles.from_style_contact}>
                    <img
                      src={avatarPost}
                      alt=""
                      className={styles.img_poster}
                    />
                    <div className={styles.text_name_member}>Quang Trường</div>
                  </div>
                  <p className={styles.text_date}>25 August 2024</p>
                </div>
              </div>
              <div className={styles.form_item_blog}>
                <img src={imgPost} alt="" className={styles.img_class_post} />
                <div className={styles.item_click}>Technology</div>
                <p className={styles.text_blog_hot}>
                  Những công nghệ hot nhất
                  <br /> hiện nay trong lĩnh vực IT
                  <br /> lương lên đến 10.000$
                </p>
                <div className={styles.item_information}>
                  <div className={styles.from_style_contact}>
                    <img
                      src={avatarPost}
                      alt=""
                      className={styles.img_poster}
                    />
                    <div className={styles.text_name_member}>Quang Trường</div>
                  </div>
                  <p className={styles.text_date}>25 August 2024</p>
                </div>
              </div>
              <div className={styles.form_item_blog}>
                <img src={imgPost} alt="" className={styles.img_class_post} />
                <div className={styles.item_click}>Technology</div>
                <p className={styles.text_blog_hot}>
                  Những công nghệ hot nhất
                  <br /> hiện nay trong lĩnh vực IT
                  <br /> lương lên đến 10.000$
                </p>
                <div className={styles.item_information}>
                  <div className={styles.from_style_contact}>
                    <img
                      src={avatarPost}
                      alt=""
                      className={styles.img_poster}
                    />
                    <div className={styles.text_name_member}>Quang Trường</div>
                  </div>
                  <p className={styles.text_date}>25 August 2024</p>
                </div>
              </div>
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
                  Chúng tôi rất vui khi được mọi người <br />
                  đón nhận và quan tâm,đội ngũ của chúng <br />
                  tôi luôn luôn hỗ trợ hết mình trong công cuộc <br />
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
