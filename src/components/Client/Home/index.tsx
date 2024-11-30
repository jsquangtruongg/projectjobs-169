import avatarPost from "../../../assets/images/avatar.jpg";
import map from "../../../assets/images/danh_dau.png";
import logo from "../../../assets/images/logo.png";
import poster1 from "../../../assets/images/Rectangle 15.png";
import poster18 from "../../../assets/images/Rectangle18.png";
import poster19 from "../../../assets/images/Rectangle19.png";
import poster20 from "../../../assets/images/Rectangle20.png";
import poster22 from "../../../assets/images/Rectangle22.png";
import poster23 from "../../../assets/images/Rectangle23.png";
import iconTrave from "../../../assets/images/traveloka_logo 2.png";
import iconTicked from "../../../assets/images/traveloka_logo 3.png";
import iconAirbnb from "../../../assets/images/traveloka_logo 4.png";
import iconTripadvisor from "../../../assets/images/traveloka_logo 5.png";
import styles from "./style.module.css";
import posterJob from "../../../assets/images/RectangleJob.png";
import imgPost from "../../../assets/images/Rectangle25.png";

import ImgBanner from "../../../assets/images/backgroundPoster.png";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailIcon from "@mui/icons-material/Mail";
import MarginRoundedIcon from "@mui/icons-material/MarginRounded";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import RamenDiningRoundedIcon from "@mui/icons-material/RamenDiningRounded";
import WatchLaterSharpIcon from "@mui/icons-material/WatchLaterSharp";
import "./style.scss";
import Tabs from "./Tabs";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useEffect } from "react";
import { getJobALLCategory } from "../../../redux/actions/jobCategoryActions";
import { getJob, getJobAll } from "../../../redux/actions/jobActions";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";
export const HomeComponent = () => {
  const jobCategoryState = useAppSelector((state) => state.jobCategory);
  const jobState = useAppSelector((state) => state.job);
  console.log("wswsws", jobState.jobData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getJobALLCategory());
  }, []);

  useEffect(() => {
    dispatch(getJobAll());
  }, []);

  return (
    <div className="home-container">
      <div className="banner-container">
        <div className="banner-box">
          <div style={{ display: "flex", paddingTop: "50px" }}>
            <div className="form-search">
              <span className="banner-title">
                Bạn Muốn Tìm Việc Làm Theo Sở Thích
              </span>
              <p className="banner-sub-title">
                Mọi thứ bạn cần tìm việc làm sẽ có ở đây, nơi bạn sẽ dễ dàng hơn
                <br /> bao giờ hết
              </p>
              <div className="field-search">
                <img src={map} alt="" />
                <input placeholder="Tìm kiếm việc làm bạn muốn!" />
                <div className="btn-search">
                  Search
                  <ArrowForwardIosOutlinedIcon
                    style={{ fontSize: 15, marginLeft: 10 }}
                  />
                </div>
              </div>
              <p className="label-relationship">
                Quan hệ đối tác của chúng tôi
              </p>
              <div className="ground-logo-relationship">
                <img src={iconTrave} alt="" />
                <img src={iconTicked} alt="" />
                <img src={iconAirbnb} alt="" />
                <img src={iconTripadvisor} alt="" />
              </div>
            </div>
            <div className="statistical">
              <Swiper
                cssMode={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                loop={true}
                autoplay={{
                  delay: 2000, // 1 giây
                  disableOnInteraction: false, // Không dừng autoplay khi tương tác
                }}
                modules={[Pagination, Mousewheel, Keyboard, Autoplay]}
                className="mySwiper"
              >
                <SwiperSlide>
                  {" "}
                  <img src={ImgBanner} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <img src={imgPost} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <img src={logo} alt="" />
                </SwiperSlide>
              </Swiper>
            </div>
            {/* <div className="statistical-item">
              <div className="avatar">
                <img src={posterJob} alt="" className="avatar1" />
                <img src={posterJob} alt="" className="avatar2" />
                <img src={posterJob} alt="" className="avatar3" />
              </div>
              <div className="content">
                <p className={styles.result_member}>1K+ Thành Viên</p>
                <span className={styles.text_job}>Tìm việc thành công</span>
              </div>
            </div>
            <div className="statistical-item">
              <div className="avatar">
                <img src={posterJob} alt="" className="avatar3" />
              </div>
              <div className="content">
                <p className={styles.result_member}>100+ Job</p>
                <span className={styles.text_job}>Tuyển hàng tháng</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="job-category">
        <div className="title">
          <p>____</p>
          <p className={styles.recommended}>Khuyến cáo của chúng tôi</p>
        </div>
        <div className={styles.bar_item_employer}>
          {jobCategoryState.jobCategoryDataList.length && (
            <Tabs
              onChangeTab={(id: string) => {
                dispatch(getJob(Number(id) || 0));
              }}
            >
              {jobCategoryState.jobCategoryDataList.map((item) => (
                <div
                  key={item.id}
                  title={item.title}
                  className={styles.item_sponsor}
                >
                  <div className={styles.form_recruitment_post}>
                    {jobState.jobData.length === 0 ? (
                      <div>
                        <p style={{ display: "flex" }}>
                          Không có Bài viết nào được đăng
                        </p>
                        <SentimentDissatisfiedOutlinedIcon />
                      </div>
                    ) : (
                      jobState.jobData.map((jobItem, index) => (
                        <div className={styles.form_poster} key={index}>
                          {jobItem.img && (
                            <img
                              src={jobItem.img as string}
                              alt="Job"
                              className="poster-background"
                            />
                          )}
                          <p className={styles.text_title}>{jobItem.title}</p>
                          <span className={styles.salary_received}>
                            {jobItem.salary}
                          </span>
                          <div className={styles.from_img_avt_post}>
                            <img
                              src={avatarPost}
                              alt=""
                              className={styles.avatar_post}
                            />
                            <div className={styles.from_text_name}>
                              <p className={styles.text_name_post}>
                                {jobItem.userData
                                  ? `${jobItem.userData.lastName}`
                                  : "Tác giả ẩn danh"}
                              </p>
                              <span>
                                {jobItem.userData
                                  ? `${jobItem.userData.email}`
                                  : "Ẩn danh"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </Tabs>
          )}
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
                    <Person2RoundedIcon style={{ marginRight: 7 }} />4 Chạy bàn
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
                <div className="poster">
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
        <div className="section-footer">
          <div className="layout-container footer-box">
            <div className="footer-left">
              <div className="logo-white">
                <img src={logo} alt="" />
                <span>Toptimviec.com</span>
              </div>
              <p className="describe">
                Chúng tôi cung cấp thông tin về các việc làm <br /> giúp bạn
                thuận tiện hơn trong việc tìm kiếm <br />
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
      {/* <LogOut toggleDelete={function (): void {
        throw new Error("Function not implemented.");
      } }/> */}
    </div>
  );
};
