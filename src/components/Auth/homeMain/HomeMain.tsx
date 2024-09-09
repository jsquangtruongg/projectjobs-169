import styles from "./HomeMain.module.css";
import logo from "../../../assets/imgs/logo.png";
import map from "../../../assets/imgs/danh_dau.png";
import iconTrave from "../../../assets/imgs/traveloka_logo 2.png";
import iconTicked from "../../../assets/imgs/traveloka_logo 3.png";
import iconAirbnb from "../../../assets/imgs/traveloka_logo 4.png";
import iconTripadvisor from "../../../assets/imgs/traveloka_logo 5.png";
import poster18 from "../../../assets/imgs/Rectangle18.png";
import poster19 from "../../../assets/imgs/Rectangle19.png";
import poster20 from "../../../assets/imgs/Rectangle20.png";
import poster22 from "../../../assets/imgs/Rectangle22.png";
import poster23 from "../../../assets/imgs/Rectangle23.png";
import avatarPost from "../../../assets/imgs/avatar.jpg";
import poster1 from "../../../assets/imgs/Rectangle 15.png";

import posterJob from "../../../assets/imgs/RectangleJob.png";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import EdgesensorLowRoundedIcon from "@mui/icons-material/EdgesensorLowRounded";
import KeyboardHideRoundedIcon from "@mui/icons-material/KeyboardHideRounded";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import Woman2RoundedIcon from "@mui/icons-material/Woman2Rounded";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import MarginRoundedIcon from "@mui/icons-material/MarginRounded";
import RamenDiningRoundedIcon from "@mui/icons-material/RamenDiningRounded";
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import WatchLaterSharpIcon from "@mui/icons-material/WatchLaterSharp";
import MailIcon from "@mui/icons-material/Mail";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import {
  ButtonComponent,
  ButtonDropComponent,
} from "../../common/ButtonComponent/ButtonComponent";
export const HomeMain = () => {
  return (
    <div className={styles.heading_page}>
      <div className={styles.heading_padding}>
        <div className={styles.heading_lef}>
          <div className={styles.Logo}>
            <img src={logo} alt="" />
            <span className={styles.top_search}>Toptimviec.com</span>
          </div>
          <div className={styles.from_search}>
            <span className={styles.text_search}>
              Bạn Muốn Tìm Việc Làm <br />
              Theo Sở Thích
            </span>
            <p className={styles.text_search_job}>
              Mọi thứ bạn cần tìm việc làm sẽ có ở đây, nơi bạn sẽ dễ dàng hơn
              <br /> bao giờ hết
            </p>
            <div className={styles.from_input_search}>
              <img src={map} alt="" />
              <input
                className={styles.input_search}
                placeholder="Tìm kiếm việc làm bạn muốn!"
              />
              <div className={styles.item_search}>
                Search
                <ArrowForwardIosOutlinedIcon
                  style={{ fontSize: 15, marginLeft: 10 }}
                />
              </div>
            </div>
            <p className={styles.text_relationship}>
              Quan hệ đối tác của chúng tôi
            </p>
            <div className={styles.form_logo_}>
              <img src={iconTrave} alt="" />
              <img src={iconTicked} alt="" />
              <img src={iconAirbnb} alt="" />
              <img src={iconTripadvisor} alt="" />
            </div>
          </div>
        </div>
        <div className={styles.heading_right}>
          <div className={styles.heading_img}>
            <div className={styles.header_nav}>
              <ButtonComponent name="Trắc Nghiệm" />
              <ButtonComponent name="Tuyển Dụng" />

              <ButtonDropComponent
                name="Diễn Đàn"
                items={["Lộ Trình", "Blog Việc "]}
              />
              <ButtonComponent name="Hồ Sơ"  />
              <ButtonDropComponent name="Đăng ký!" />
            </div>
            <div className={styles.form_form_member}>
              <div className={styles.from_item_member}>
                <div className={styles.from_image_avatar}>
                  <img src={posterJob} alt="" className={styles.name_avatar1} />
                  <img src={posterJob} alt="" className={styles.name_avatar2} />
                  <img src={posterJob} alt="" className={styles.name_avatar3} />
                </div>
                <div className={styles.from_text_member}>
                  <p className={styles.result_member}>1K+ Thành Viên</p>
                  <span className={styles.text_job}>Tìm việc thành công</span>
                </div>
              </div>
              <div className={styles.from_item_member}>
                <div className={styles.from_image_avatar}>
                  <img src={posterJob} alt="" className={styles.name_avatar3} />
                </div>
                <div className={styles.from_text_member}>
                  <p className={styles.result_member}>100+ Job</p>
                  <span className={styles.text_job}>Tuyển hàng tháng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.form_outstanding_job}>
        <div className={styles.outstanding_job}>
          <p className={styles.line}>____</p>
          <p className={styles.text_recommended}>Khuyến cáo của chúng tôi</p>
        </div>
        <div className={styles.bar_item_employer}>
          <p className={styles.employer_job}>Nhà Tuyển Dụng Nỗi Bật</p>
          <div className={styles.from_item_employer}>
            <div className={styles.item_employer}>
              <HomeOutlinedIcon style={{ marginRight: 10 }} />
              Kinh Doanh
            </div>
            <div className={styles.item_sponsor}>
              <HomeWorkRoundedIcon style={{ marginRight: 10 }} />
              Marketiing
            </div>
            <div className={styles.item_sponsor}>
              <EdgesensorLowRoundedIcon style={{ marginRight: 10 }} />
              Công Nghệ
            </div>
            <div className={styles.item_sponsor}>
              <KeyboardHideRoundedIcon style={{ marginRight: 10 }} />
              Truyền Thông
            </div>
            <div className={styles.enter_item}>
              <NavigateBeforeRoundedIcon />
            </div>
            <div className={styles.enter_item}>
              <NavigateNextRoundedIcon />
            </div>
          </div>
        </div>
        <div className={styles.form_recruitment_post}>
          <div className={styles.form_poster}>
            <img src={poster1} alt="" className={styles.poster_job} />
            <p className={styles.text_title}>Tuyển Nhân Viên Kinh Doanh </p>
            <span className={styles.salary_received}>$ 20.000.000</span>
            <div className={styles.from_img_avt_post}>
              <img src={avatarPost} alt="" className={styles.avatar_post} />
              <div className={styles.from_text_name}>
                <p className={styles.text_name_post}>Quang Trường</p>
                <span>Trưởng phòng nhân sự</span>
              </div>
            </div>
          </div>
          <div className={styles.form_poster}>
            <img src={poster1} alt="" className={styles.poster_job} />
            <p className={styles.text_title}>Tuyển Nhân Viên Kinh Doanh </p>
            <span className={styles.salary_received}>$ 20.000.000</span>
            <div className={styles.from_img_avt_post}>
              <img src={avatarPost} alt="" className={styles.avatar_post} />
              <div className={styles.from_text_name}>
                <p className={styles.text_name_post}>Quang Trường</p>
                <span>Trưởng phòng nhân sự</span>
              </div>
            </div>
          </div>
          <div className={styles.form_poster}>
            <img src={poster1} alt="" className={styles.poster_job} />
            <p className={styles.text_title}>Tuyển Nhân Viên Kinh Doanh </p>
            <span className={styles.salary_received}>$ 20.000.000</span>
            <div className={styles.from_img_avt_post}>
              <img src={avatarPost} alt="" className={styles.avatar_post} />
              <div className={styles.from_text_name}>
                <p className={styles.text_name_post}>Quang Trường</p>
                <span>Trưởng phòng nhân sự</span>
              </div>
            </div>
          </div>
          <div className={styles.form_poster}>
            <img src={poster1} alt="" className={styles.poster_job} />
            <p className={styles.text_title}>Tuyển Nhân Viên Kinh Doanh </p>
            <span className={styles.salary_received}>$ 20.000.000</span>
            <div className={styles.from_img_avt_post}>
              <img src={avatarPost} alt="" className={styles.avatar_post} />
              <div className={styles.from_text_name}>
                <p className={styles.text_name_post}>Quang Trường</p>
                <span>Trưởng phòng nhân sự</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.form_contact_job}>
          <div className={styles.outstanding_job_lef}>
            <div className={styles.outstanding_job}>
              <p className={styles.line}>____</p>
              <p className={styles.text_recommended}>Liên hệ đối tác</p>
            </div>
            <div className={styles.from_lef_contact}>
              <p className={styles.employer_job}>Hãy Liên Hệ Với Chúng Tôi!</p>
              <span className={styles.text_EPCO}>
                EPCO xin hân hạnh được chào đón các bạn đồng <br />
                hành với nhà hàng chúng tôi,môi trường thân thiện <br /> và năng
                động
              </span>
              <p className={styles.text_recruitment}>Chi tiết tuyển dụng</p>
              <div className={styles.form_contact}>
                <div className={styles.from_job_needed}>
                  <div className={styles.jobs_needed}>
                    <Woman2RoundedIcon style={{ marginRight: 7 }} />4 Chạy bàn
                  </div>
                  <div className={styles.jobs_needed}>
                    <Person2RoundedIcon style={{ marginRight: 7 }} />2 Lễ Tân
                  </div>
                </div>
                <div className={styles.from_job_needed}>
                  <div className={styles.jobs_needed}>
                    <MarginRoundedIcon style={{ marginRight: 7 }} />1 Quản lí
                  </div>
                  <div className={styles.jobs_needed}>
                    <RamenDiningRoundedIcon style={{ marginRight: 7 }} />2 Đầu
                    bếp
                  </div>
                </div>
              </div>
              <span className={styles.line_book}>
                ____________________________________________
              </span>
              <div>
                <div className={styles.from_img_avt_post}>
                  <img src={avatarPost} alt="" className={styles.avatar_post} />
                  <div className={styles.from_text_name}>
                    <p className={styles.text_name_post}>Quang Trường</p>
                    <span>Trưởng phòng nhân sự</span>
                  </div>
                  <div className={styles.enter_call}>
                    <PhoneInTalkRoundedIcon style={{ marginRight: 7 }} />
                    Liên hệ ngay
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.outstanding_job_right}>
            <div className={styles.image_restaurant}>
              <img src={poster18} alt="" className={styles.icon_restaurant} />
              <img src={poster19} alt="" className={styles.icon_restaurant2} />
              <img src={poster20} alt="" className={styles.icon_restaurant3} />
            </div>
          </div>
        </div>
        <div className={styles.from_new_job}>
          <div className={styles.item_line_job}>
            <p className={styles.line_dash}>______</p>
            <p className={styles.text_new_job}>Tuyển dụng mới nhất</p>
            <span className={styles.text_tile_job}>
              tìm hiểu thêm về các công việc
              <br /> đang tuyển dụng
            </span>
          </div>
          <div className={styles.item_btn_welcome}>
            <div className={styles.item_welcome}>Welcome</div>
          </div>
          <div className={styles.from_job_apply}>
            <div className={styles.form_job_apply_lef}>
              <div className={styles.item_job_apply}>
                <img src={poster22} alt="" className={styles.img_poster_job} />
                <div className={styles.form_contact_apply}>
                  <div className={styles.from_style_contact}>
                    <img
                      src={avatarPost}
                      alt=""
                      className={styles.img_poster}
                    />
                    <div className={styles.text_name_menber}>Linh Nhi</div>
                  </div>
                  <p className={styles.text_recruitment_job}>
                    nhà hàng đang tuyển dụng các vị
                    <br /> trí lễ tân,chạy bàn...lương cao
                  </p>
                  <div className={styles.item_clock}>
                    <WatchLaterSharpIcon style={{ marginRight: 7 }} />
                    <p className={styles.text_date}>
                      4 min read | 25 August 2024
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.item_job_apply}>
                <img src={poster22} alt="" className={styles.img_poster_job} />
                <div className={styles.form_contact_apply}>
                  <div className={styles.from_style_contact}>
                    <img
                      src={avatarPost}
                      alt=""
                      className={styles.img_poster}
                    />
                    <div className={styles.text_name_menber}>Linh Nhi</div>
                  </div>
                  <p className={styles.text_recruitment_job}>
                    nhà hàng đang tuyển dụng các vị
                    <br /> trí lễ tân,chạy bàn...lương cao
                  </p>
                  <div className={styles.item_clock}>
                    <WatchLaterSharpIcon style={{ marginRight: 7 }} />
                    <p className={styles.text_date}>
                      4 min read | 25 August 2024
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.item_job_apply}>
                <img src={poster22} alt="" className={styles.img_poster_job} />
                <div className={styles.form_contact_apply}>
                  <div className={styles.from_style_contact}>
                    <img
                      src={avatarPost}
                      alt=""
                      className={styles.img_poster}
                    />
                    <div className={styles.text_name_menber}>Linh Nhi</div>
                  </div>
                  <p className={styles.text_recruitment_job}>
                    nhà hàng đang tuyển dụng các vị
                    <br /> trí lễ tân,chạy bàn...lương cao
                  </p>
                  <div className={styles.item_clock}>
                    <WatchLaterSharpIcon style={{ marginRight: 7 }} />
                    <p className={styles.text_date}>
                      4 min read | 25 August 2024
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.form_job_apply_right}>
              <img src={poster23} alt="" className={styles.image_poster} />
              <div className={styles.from_style_contact}>
                <img src={avatarPost} alt="" className={styles.img_poster} />
                <div className={styles.text_name_menber}>Linh Nhi</div>
              </div>
              <p className={styles.text_recruitment_staff}>
                Tuyển Dụng Nhân Viên Thiết Kế Đồ Họa
              </p>
              <p className={styles.text_content_recruitment}>
                Công ty chúng tôi tuyển dụng các vị trí thiết kế game,hoạt
                hình,C#
              </p>
              <div className={styles.item_clock}>
                <WatchLaterSharpIcon style={{ marginRight: 7 }} />
                <p className={styles.text_date}>4 min read | 25 August 2024</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.item_nav_search}>
          <div className={styles.from_nav_search}>
            <h3 className={styles.text_register}>
              Đăng Ký Để Biết Thêm Thông Tin <br />
              Và Cập Nhật Từ Haunter
            </h3>
            <div className={styles.from_email}>
              <div className={styles.from_email_input}>
                <MailIcon />
                <input
                  className={styles.input_email}
                  type="text"
                  placeholder="Đăng ký bằng email"
                />
                <div className={styles.item_btn_subsribe}>Đăng Ký Ngay</div>
              </div>
              <img src={poster23} alt="" className={styles.icon_img_brand} />
              <img src={poster22} alt="" className={styles.icon_img_brand1} />
              <img src={poster20} alt="" className={styles.icon_img_brand2} />
              <img src={poster19} alt="" className={styles.icon_img_brand7} />
              <img src={avatarPost} alt="" className={styles.icon_img_brand3} />
              <img src={avatarPost} alt="" className={styles.icon_img_brand4} />
              <img src={avatarPost} alt="" className={styles.icon_img_brand5} />
              <img src={avatarPost} alt="" className={styles.icon_img_brand6} />
            </div>
          </div>
        </div>
        <div className={styles.from_end_contact}>
          <div className={styles.from_information}>
            <div className={styles.from_end_lef}>
              <div className={styles.Logo}>
                <img src={logo} alt="" />
                <span className={styles.top_search}>Toptimviec.com</span>
              </div>
              <p className={styles.text_describe}>
                Chúng tôi cung cấp thông tin về các việc làm <br /> giúp bạn
                thuận tiện hơn trong việc tìm kiếm <br />
                công việc,chúng tôi thường xuyên cung cấp
                <br />
                các việc làm như,nhân viên sale,kinh
                <br /> doanh,bán hàng
              </p>
              <div>
                <FacebookIcon style={{ marginRight: 30 }} />
                <InstagramIcon style={{ marginRight: 30 }} />
                <EmailIcon />
              </div>
            </div>
            <div className={styles.from_end_right}>
              <div className={styles.from_profession_popular}>
                <p className={styles.tex_popular}>Công Việc</p>
                <p className={styles.text_profession}>Sale Bán Hàng</p>
                <p className={styles.text_profession}>Công Nghệ Thông Tin</p>
                <p className={styles.text_profession}>Truyền Thông</p>
              </div>
              <div className={styles.from_profession_popular}>
                <p className={styles.tex_popular}>Bài báo</p>
                <p className={styles.text_profession}>Bài viết phổ biến</p>
                <p className={styles.text_profession}>Đọc nhiều nhất</p>
                <p className={styles.text_profession}>đánh giá Cao</p>
                <p className={styles.text_profession}>Bài viết mới</p>
              </div>
              <div>
                <p className={styles.tex_popular}>Liên hệ</p>
                <p className={styles.text_profession}>
                  01 2/9 Quận Hải Châu ,Thành Pho đà nẵng
                </p>
                <p className={styles.text_profession}>0925306503</p>
                <p className={styles.text_profession}>
                  nguyenqtthangbinh@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.end}></div>
      </div>
    </div>
  );
};
