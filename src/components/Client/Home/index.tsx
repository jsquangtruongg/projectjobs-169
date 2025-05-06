import avatarPost from "../../../assets/images/avatar.jpg";
import map from "../../../assets/images/danh_dau.png";
import logo from "../../../assets/images/logo.png";
import poster19 from "../../../assets/images/Rectangle19.png";
import poster20 from "../../../assets/images/Rectangle20.png";
import poster22 from "../../../assets/images/Rectangle22.png";
import poster23 from "../../../assets/images/Rectangle23.png";
import iconTrave from "../../../assets/images/traveloka_logo 2.png";
import iconTicked from "../../../assets/images/traveloka_logo 3.png";
import iconAirbnb from "../../../assets/images/traveloka_logo 4.png";
import iconTripadvisor from "../../../assets/images/traveloka_logo 5.png";
import styles from "./style.module.css";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailIcon from "@mui/icons-material/Mail";
import BuildIcon from "@mui/icons-material/Build";
import SchoolIcon from "@mui/icons-material/School";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ChatIcon from "@mui/icons-material/Chat";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import "./style.scss";
import Tabs from "./Tabs";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useEffect, useRef } from "react";
import { getJobALLCategory } from "../../../redux/actions/jobCategoryActions";
import { getJob, getJobAll } from "../../../redux/actions/jobActions";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Pagination, Navigation } from "swiper/modules";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import slush from "../../../assets/images/slush.png";
import pum from "../../../assets/images/pum.png";
import phuclong from "../../../assets/images/phuc-long.png";
import water from "../../../assets/images/logo-nuoc-uong.jpg";
import koithe from "../../../assets/images/koithe.png";
import hura from "../../../assets/images/hura.jpg";
import trasua from "../../../assets/images/logo-tra-sua-10.jpg";
import tea from "../../../assets/images/chatea.jpg";
import pata from "../../../assets/images/fanta.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";
import "swiper/css/navigation";

import { Mousewheel, Keyboard, Autoplay } from "swiper/modules";
import vpBank from "../../../assets/images/ptbank.jpg";
import It from "../../../assets/images/tuyenIt.jpg";
import Seo from "../../../assets/images/Seo.jpg";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import SwiperCore from "swiper";
import { getAllJobsAction } from "../../../redux/actions/userAction";
import { getBlogAll } from "../../../redux/actions/blogActions";

export const HomeComponent = () => {
  const navigate = useNavigate();
  const stateBlog = useAppSelector((state) => state.blog);
  const jobCategoryState = useAppSelector((state) => state.jobCategory);
  const jobState = useAppSelector((state) => state.job);
  const jobStateJob = useAppSelector((state) => state.user);
  const stateJobCategory = useAppSelector((state) => state.jobCategory);
  const jobRef = useRef<HTMLDivElement | null>(null);

  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const onClickJob = (id: string | number) => {
    navigate(`/job/${id}`, { state: { scrollTo: id } });
  };
  const handleClickProfileCompany = (companyId: number | undefined) => {
    navigate(`/profile-company/${companyId}`);
  };
  const handleBlogClick = () => {
    navigate("/blog");
  };
  const onClickJobDetail = (id: number | string) => {
    navigate(`/blog-details/${id}`);
  };

  const swiperRef = useRef<SwiperCore | null>(null);
  useEffect(() => {
    dispatch(getJobALLCategory());
  }, []);

  useEffect(() => {
    dispatch(getBlogAll());
  }, []);
  useEffect(() => {
    dispatch(getJobAll());
  }, []);
  useEffect(() => {
    dispatch(getAllJobsAction());
  }, []);
  const updateNavigation = (swiper: SwiperCore) => {
    const prevBtn = document.querySelector(".icon-pagination-left");
    const nextBtn = document.querySelector(".icon-pagination-right");

    if (prevBtn && nextBtn) {
      if (swiper.isBeginning) {
        prevBtn.classList.add("disabled");
      } else {
        prevBtn.classList.remove("disabled");
      }

      if (swiper.isEnd) {
        nextBtn.classList.add("disabled");
      } else {
        nextBtn.classList.remove("disabled");
      }
    }
  };
  const getTextFromHTML = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.innerText;
  };
  const NavigationPage = (swiper: SwiperCore) => {
    const prevBtn = document.querySelector(".icon-pagination-list");
    const nextBtn = document.querySelector(".icon-pagination-next");

    if (prevBtn && nextBtn) {
      if (swiper.isBeginning) {
        prevBtn.classList.add("disabled");
      } else {
        prevBtn.classList.remove("disabled");
      }

      if (swiper.isEnd) {
        nextBtn.classList.add("disabled");
      } else {
        nextBtn.classList.remove("disabled");
      }
    }
  };
  const logos = [slush, pum, phuclong, water, koithe, hura, trasua, tea, pata];
  const verticalOffsets = ["up", "down", "mid", "up", "down"];
  const data = [
    {
      title: "Sản xuất",
      jobs: "3.099 việc làm",
      icon: <BuildIcon fontSize="large" color="success" />,
    },
    {
      title: "Giáo dục - Đào tạo",
      jobs: "1.884 việc làm",
      icon: <SchoolIcon fontSize="large" color="success" />,
    },
    {
      title: "Bán lẻ - Dịch vụ đời sống",
      jobs: "783 việc làm",
      icon: <LocalOfferIcon fontSize="large" color="success" />,
    },
    {
      title: "Phim & Truyền hình",
      jobs: "323 việc làm",
      icon: <LiveTvIcon fontSize="large" color="success" />,
    },
    {
      title: "Điện - Điện tử - Viễn thông",
      jobs: "1.538 việc làm",
      icon: <WifiIcon fontSize="large" color="success" />,
    },
    {
      title: "Logistics - Thu mua",
      jobs: "2.245 việc làm",
      icon: <LocalShippingIcon fontSize="large" color="success" />,
    },
    {
      title: "Tư vấn chuyên môn",
      jobs: "115 việc làm",
      icon: <ChatIcon fontSize="large" color="success" />,
    },
    {
      title: "Dược - Y tế",
      jobs: "816 việc làm",
      icon: <MedicalServicesIcon fontSize="large" color="success" />,
    },
    {
      title: "Dược - Y tế",
      jobs: "816 việc làm",
      icon: <MedicalServicesIcon fontSize="large" color="success" />,
    },
    {
      title: "Dược - Y tế",
      jobs: "816 việc làm",
      icon: <MedicalServicesIcon fontSize="large" color="success" />,
    },
    {
      title: "Dược - Y tế",
      jobs: "816 việc làm",
      icon: <MedicalServicesIcon fontSize="large" color="success" />,
    },
    {
      title: "Dược - Y tế",
      jobs: "816 việc làm",
      icon: <MedicalServicesIcon fontSize="large" color="success" />,
    },
    {
      title: "Dược - Y tế",
      jobs: "816 việc làm",
      icon: <MedicalServicesIcon fontSize="large" color="success" />,
    },
    {
      title: "Dược - Y tế",
      jobs: "816 việc làm",
      icon: <MedicalServicesIcon fontSize="large" color="success" />,
    },
  ];
  return (
    <div className="home-container">
      <div className="from-container-top">
        <div className="banner-container">
          <div className="banner-box">
            <div style={{ display: "flex" }}>
              <div className="form-search">
                <span className="banner-title">
                  Bạn Muốn Tìm Việc Làm Theo Sở Thích
                </span>
                <p className="banner-sub-title">
                  Mọi thứ bạn cần tìm việc làm sẽ có ở đây, nơi bạn sẽ dễ dàng
                  hơn
                  <br /> bao giờ hết
                </p>
                <div className="field-search">
                  <img src={map} alt="" className="icon-map" />
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
                  mousewheel={true}
                  keyboard={true}
                  loop={true}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                  modules={[Pagination, Mousewheel, Keyboard, Autoplay]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    {" "}
                    <img src={vpBank} alt="" className="from-img-home" />
                  </SwiperSlide>
                  <SwiperSlide>
                    {" "}
                    <img src={It} alt="" className="from-img-home" />
                  </SwiperSlide>
                  <SwiperSlide>
                    {" "}
                    <img src={Seo} alt="" className="from-img-home" />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="job-category">
        <div className="from-job-category">
          <div className="from-job-top">
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
                            <div
                              className={styles.from_list_job}
                              key={index}
                              onClick={() => onClickJob(jobItem.id)}
                              ref={item.id === Number(id) ? jobRef : null}
                            >
                              <div className={styles.form_poster}>
                                {jobItem.img && (
                                  <img
                                    src={jobItem.img as string}
                                    alt="Job"
                                    className="poster-background"
                                  />
                                )}
                              </div>
                              <p className={styles.text_title}>
                                {jobItem.title}
                              </p>
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
          </div>
        </div>
        <div className="from-branch-job">
          <div className="from-company-top">
            <div className="item-company">
              <div className="from-banner-job">
                <div className="header-img">
                  <div className="from-trademark">
                    <p className="header-trademark">
                      Thương hiệu lớn tiêu biểu
                    </p>
                    <p className="note-detail">
                      Những thương hiệu tuyển dụng đã khẳng định được vị thế
                      trên thị trường.
                    </p>
                  </div>
                </div>
              </div>
              <div className="from-sidle-main">
                <Swiper
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    updateNavigation(swiper);
                  }}
                  onSlideChange={(swiper) => updateNavigation(swiper)}
                  slidesPerView={3}
                  grid={{
                    rows: 3,
                    fill: "row",
                  }}
                  navigation={{
                    prevEl: ".custom-prev",
                    nextEl: ".custom-next",
                  }}
                  spaceBetween={30}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Grid, Navigation]}
                  className="mySwiper"
                >
                  {jobStateJob.jobDataUser
                    .filter(
                      (jobUser) =>
                        jobUser.role_code === "R1" || jobUser.role_code === "R2"
                    )
                    .map((jobUser, index) => (
                      <SwiperSlide key={index}>
                        <div
                          className="company-card"
                          onClick={() => handleClickProfileCompany(jobUser.id)}
                        >
                          <div className="item-cart-job">
                            <div className="from-card">
                              <div className="logo">
                                <img src={avatarPost} alt="Company Logo" />
                              </div>
                              <div className="info">
                                <h3>
                                  {jobUser.firstName} {jobUser.lastName}
                                </h3>
                                <p className="industry">{jobUser.email}</p>
                              </div>
                            </div>
                          </div>
                          <div className="item-icon-wor">
                            <BusinessCenterOutlinedIcon className="icon-word" />
                            <p className="jobs">{jobUser.Jobs?.length}</p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
                <div className="from-pagination">
                  <div className="custom-prev">
                    <ArrowBackIosNewIcon className="icon-pagination-left" />
                  </div>
                  <div className="custom-next">
                    <ArrowForwardIosIcon className="icon-pagination-right" />
                  </div>
                </div>
              </div>
              <div className="from-btn-more">
                <button className="btn-more">Xem thêm</button>
              </div>
            </div>
          </div>
        </div>
        <div className="from-information-global">
          <div className="item-information-global">
            <div className="form_contact_job">
              <div className="outstanding_job_lef">
                <div className="from_lef_contact">
                  <p className="employer_job">
                    Hổ Trợ Tìm Kiếm Việc Làm Toàn Quốc
                  </p>
                  <div className="item_EPCO">
                    <span className="text_EPCO">
                      Chúng tôi mang đến giải pháp kết nối việc làm trên toàn
                      quốc, giúp bạn dễ dàng tìm thấy cơ hội phù hợp ở mọi ngành
                      nghề, mọi tỉnh thành. Với hàng nghìn tin tuyển dụng được
                      cập nhật mỗi ngày, bạn có thể tìm kiếm, ứng tuyển và kết
                      nối với nhà tuyển dụng một cách nhanh chóng, thuận tiện và
                      hoàn toàn miễn phí. Hãy để chúng tôi đồng hành cùng bạn
                      trên hành trình phát triển sự nghiệp.
                    </span>
                  </div>
                </div>
              </div>
              <div className="outstanding_job_right">
                <div className="image_restaurant"></div>
              </div>
            </div>
          </div>
          <div className="item-information-global">
            <div className="form_contact_job">
              <div className="outstanding_job_right">
                <div className="image_global"></div>
              </div>
              <div className="outstanding_job_lef">
                <div className="from_lef_contact">
                  <p className="employer_job">
                    Hỗ Trợ Tìm Kiếm Việc Làm Freelance Toàn Cầu
                  </p>
                  <div className="item_EPCO">
                    <span className="text_EPCO">
                      Chúng tôi cung cấp nền tảng kết nối freelancer với khách
                      hàng trên khắp cả nước, giúp bạn dễ dàng tiếp cận những dự
                      án phù hợp với chuyên môn và đam mê. Hàng ngàn cơ hội làm
                      việc linh hoạt được cập nhật liên tục, cho phép bạn chủ
                      động tìm kiếm, thương lượng và hợp tác chỉ trong vài bước
                      đơn giản. Hãy để chúng tôi trở thành cầu nối vững chắc,
                      đồng hành cùng bạn chinh phục những cột mốc mới trong sự
                      nghiệp freelance.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.item_news_job}>
          <div className={styles.from_new_job}>
            <div className={styles.item_line_job}>
              <p className={styles.line_dash}>______</p>
              <p className={styles.text_new_job}>Tin Tức mới nhất</p>
              <span className={styles.text_tile_job}>
                tìm hiểu thêm về các công việc
                <br /> đang tuyển dụng
              </span>
            </div>

            <div className="from-blog-hot">
              <div className="item-new-blog">
                <div className="item-blog-hot">
                  <h2 className="title-blog">Những tin tức mới về việc làm</h2>
                  <div className="from-pagination-blog">
                    <button className="custom-prev-list">
                      <ArrowBackIosNewIcon className="icon-pagination-list" />
                    </button>
                    <button className="custom-next-list">
                      <ArrowForwardIosIcon className="icon-pagination-next" />
                    </button>
                  </div>
                </div>
                <Swiper
                  modules={[Grid, Navigation]}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    NavigationPage(swiper);
                  }}
                  onSlideChange={(swiper) => NavigationPage(swiper)}
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1025: { slidesPerView: 4 },
                  }}
                  spaceBetween={30}
                  slidesPerView={3}
                  grid={{
                    rows: 1,
                    fill: "row",
                  }}
                  navigation={{
                    prevEl: ".custom-prev-list",
                    nextEl: ".custom-next-list",
                  }}
                >
                  {stateBlog.blogDataList.slice(0, 4).map((blog) => (
                    <SwiperSlide key={blog.id} className="item-swiperSlide">
                      <div className="card-blog">
                        <div className="icon-blog">
                          <img src={blog.img} className="img-blog" />
                        </div>
                        <h3 className="name-blog">{blog.title}</h3>
                        <p className="item-detail">
                          {" "}
                          {getTextFromHTML(blog.content).length > 100
                            ? `${getTextFromHTML(blog.content).slice(0, 100)}...`
                            : getTextFromHTML(blog.content)}
                        </p>
                        <p
                          className="btn-blog"
                          onClick={() => onClickJobDetail(blog.id)}
                        >
                          Chi Tiết
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="item-learn-more">
                  <p onClick={handleBlogClick} className="Learn-more">
                    Xem Thêm
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="from-banner-main">
          <div className="from-banner-img"></div>
        </div>
        <div className="from-job-hot">
          <div className="top-nganh-nghe">
            <div className="item-job-hot">
              <h2 className="title">Top ngành nghề nổi bật</h2>
              <div className="from-pagination">
                <button className="custom-prev-list">
                  <ArrowBackIosNewIcon className="icon-pagination-list" />
                </button>
                <button className="custom-next-list">
                  <ArrowForwardIosIcon className="icon-pagination-next" />
                </button>
              </div>
            </div>
            <Swiper
              modules={[Grid, Navigation]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                NavigationPage(swiper);
              }}
              onSlideChange={(swiper) => NavigationPage(swiper)}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 5 },
              }}
              spaceBetween={30}
              slidesPerView={3}
              grid={{
                rows: 2,
                fill: "row",
              }}
              navigation={{
                prevEl: ".custom-prev-list",
                nextEl: ".custom-next-list",
              }}
            >
              {stateJobCategory.jobCategoryDataList.map(
                (blogCategory, index) => (
                  <SwiperSlide key={index} className="item-swiperSlide">
                    <div className="card">
                      <div className="icon-job"></div>
                      <h3 className="name">{blogCategory.title}</h3>
                      <p className="jobs">{blogCategory.Jobs?.length}</p>
                    </div>
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </div>
        </div>
        <div className="logo-slider">
          <div className="logo-track">
            {[...logos, ...logos].map((logo, index) => {
              const offsetClass =
                verticalOffsets[index % verticalOffsets.length];
              const delay = (index % 5) * 0.3; // Mỗi logo trễ thêm 0.3s

              return (
                <div
                  className={`logo-item ${offsetClass} wave`}
                  style={{ animationDelay: `${delay}s` }}
                  key={index}
                >
                  <img src={logo} alt="" />
                </div>
              );
            })}
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
