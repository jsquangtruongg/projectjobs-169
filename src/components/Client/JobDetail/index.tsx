import "./style.scss";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import SendIcon from "@mui/icons-material/Send";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import avatar from "../../../assets/images/avatar.jpg";
import post from "../../../assets/images/CV.png";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { getJob, getJobAll } from "../../../redux/actions/jobActions";
import { useNavigate, useParams } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import logo from "../../../assets/images/logo.png";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TokenIcon from "@mui/icons-material/Token";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import DiscountIcon from "@mui/icons-material/Discount";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import { setUserInit } from "../../../redux/actions/userAction";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getBlogAll } from "../../../redux/actions/blogActions";
import { getJobALLCategory } from "../../../redux/actions/jobCategoryActions";
import { AddDialog } from "./dialog";
import { IJobData } from "../../../redux/reducers/job";
import { motion } from "framer-motion";
import ScrollToTop from "../../../layout/Scroll";

export type IEditDialogProps = {
  open?: boolean;
  jobItem: IJobData | null;
  title?: string;
  handleAccept: () => void;
  handleClose: () => void;
};
export const JobDetailComponent = () => {
  const jobRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const [jobItem, setJobItem] = useState<IJobData | null>(null);

  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState();
  const UserState = useAppSelector((state) => state.user);
  const JobDetailState = useAppSelector((state) => state.job);
  const blogState = useAppSelector((state) => state.blog);
  const dispatch = useAppDispatch();
  const jobCategoryState = useAppSelector((state) => state.jobCategory);
  const getTextFromHTML = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.innerText;
  };
  const handleOpen = (item: IJobData) => {
    setOpen(true);
    setJobItem(item);
  };
  const navigate = useNavigate();

  const handleCloseAdd = () => setOpen(false);
  const handleAcceptAdd = () => setOpen(false);
  useEffect(() => {
    dispatch(getJobALLCategory());
  }, []);
  useEffect(() => {
    if (id) {
      const jobId = parseInt(id);
      if (!isNaN(jobId)) {
        dispatch(getJob(jobId));
        dispatch(getJobAll());
        dispatch(getBlogAll());
      }
    }
  }, [id, dispatch]);

  const jobId = id ? parseInt(id) : null;
  const otherJobs = JobDetailState.jobDataList.filter(
    (job) => job.id !== jobId
  );
  useEffect(() => {
    if (user) {
      dispatch(setUserInit(user));
      return;
    }
  }, [user]);
  const handleClickJobDetail = (id: number | string) => {
    navigate(`/job-detail/${id}`);
  };
  const handleClickProfileCompany = (companyId: number | undefined) => {
    navigate(`/profile-company/${companyId}`);
  };
  const container = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const handleJobsClick = (id: number | string) => {
    navigate(`/jobs/${id}`);
  };
  return (
    <>
      <ScrollToTop />

      <div className="header-top">
        <div className="header-main">
          <div className="header-lef">
            {JobDetailState.jobData.length === 0 ? (
              <CircularProgress />
            ) : (
              JobDetailState.jobData.map((JobDetail) => (
                <div
                  className="from-company-job"
                  key={JobDetail.id}
                  ref={JobDetail.id === Number(id) ? jobRef : null}
                >
                  <motion.div
                    className="from-content-concat"
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    <div className="title-job">{JobDetail.title}</div>

                    <div className="salary-location">
                      <div className="from-salary">
                        <div className="item-img">
                          <CurrencyExchangeIcon
                            style={{
                              color: "#fff",
                            }}
                          />
                        </div>
                        <div className="from-text-salary">
                          <div className="txt-salary">Thu Nhập</div>
                          <p className="item-show-salary">
                            {" "}
                            {JobDetail.salary}
                          </p>
                        </div>
                      </div>
                      <div className="from-salary">
                        <div className="item-img">
                          <LocationOnIcon
                            style={{
                              color: "#fff",
                            }}
                          />
                        </div>
                        <div className="from-text-salary">
                          <div className="txt-salary">Địa Chỉ</div>
                          <p className="item-show-salary">
                            {JobDetail.location}
                          </p>
                        </div>
                      </div>
                      <div className="from-salary">
                        <div className="item-img">
                          <HourglassBottomIcon
                            style={{
                              color: "#fff",
                            }}
                          />
                        </div>
                        <div className="from-text-salary">
                          <div className="txt-salary">Kinh nghiệm</div>
                          <p className="item-show-salary">
                            {" "}
                            {JobDetail.experience}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="from-limit-date">
                      <AccessTimeFilledIcon />
                      <p className="txt-limit-date">Hạn nộp hồ sơ:</p>
                      <p className="item-date">20/04/2025</p>
                    </div>
                    <div className="from-apply-job">
                      <button
                        className="from-enter-apply"
                        onClick={() => handleOpen(JobDetail)}
                      >
                        <SendIcon
                          style={{
                            color: "#fff",
                            marginRight: "20px",
                          }}
                        />
                        <p className="btn-apply-job">Ứng Tuyển Ngay</p>
                      </button>
                      <button className="item-save-concat">
                        <FavoriteBorderIcon
                          style={{
                            color: "#00b14f",
                            marginRight: "5px",
                            marginTop: "2px",
                          }}
                        />
                        <p className="txt-save-concat">Lưu tin</p>
                      </button>
                    </div>
                  </motion.div>
                  <motion.div
                    className="from-job-detail"
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    <p className="txt-job-detail">Chi tiết tin tuyển dụng</p>
                    <p className="job-description">
                      <strong>Mô tả công việc:</strong> {JobDetail.content}
                    </p>
                    <div className="from-apply">
                      <button
                        className="btn-click-job"
                        onClick={() => handleOpen(JobDetail)}
                      >
                        Ứng Tuyển ngay
                      </button>

                      <p className="txt-save-concat">Lưu tin</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="from-concat-jobs"
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    <p className="txt-item-jobs">Việc làm liên quan</p>
                    {otherJobs.map((job, index) => (
                      <div
                        className="from-jobs"
                        key={index}
                        onClick={() => handleClickJobDetail(job.id)}
                      >
                        <div className="from-avt">
                          <img
                            src={job.userData.avatar}
                            alt=""
                            className="item-img"
                          />
                        </div>
                        <div className="from-concat-detail">
                          <div className="from-concat-job">
                            <div className="from-concat">
                              <p className="txt-content">{job.title}</p>
                              <p className="txt-company">{job.salary}</p>
                            </div>
                            <div className="from-total-salary">
                              {" "}
                              10-50 triệu
                            </div>
                          </div>
                          <div className="from-concat-date">
                            <div className="item-concat-date">
                              <p className="item-location">{job.location}</p>
                            </div>
                            <div className="from-save-apply">
                              <button className="btn-apply">Ứng tuyển</button>
                              <div className="item-love">
                                <FavoriteBorderIcon
                                  style={{ color: "#00bfa6    " }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              ))
            )}

            <motion.div
              className="from-concat-blog"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <div className="from-blog">
                <SchoolIcon className="item-icon" />
                <p className="txt-title-blog">Blog dành cho bạn</p>
              </div>
              <div className="from-swiper-slide">
                <Swiper
                  style={{
                    height: "380px",
                    borderRadius: "0px",
                    marginTop: "20px",
                  }}
                  slidesPerView={3}
                  spaceBetween={30}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                  modules={[Pagination, Navigation, Autoplay]}
                  className="mySwiper"
                >
                  {blogState.blogDataList.length === 0 ? (
                    <CircularProgress />
                  ) : (
                    blogState.blogDataList.map((blogDetail, index) => (
                      <SwiperSlide className="item-swiper-slide" key={index}>
                        <img src={post} alt="" className="img-blog" />
                        <div className="blog-content">
                          <p className="blog-title">
                            {getTextFromHTML(blogDetail.content).length > 100
                              ? `${getTextFromHTML(blogDetail.content).slice(0, 100)}...`
                              : getTextFromHTML(blogDetail.content)}
                          </p>
                          <button className="btn-check">Tìm hiểu ngay</button>
                        </div>
                      </SwiperSlide>
                    ))
                  )}

                  <SwiperSlide className="item-swiper-slide">
                    <img src={post} alt="" className="img-blog" />
                    <div className="blog-content">
                      <p className="blog-title">
                        EXG01: Tuyệt đỉnh Excel | Khóa học Excel online từ cơ
                        bản đến nâng cao
                      </p>
                      <button className="btn-check">Tìm hiểu ngay</button>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="item-swiper-slide">
                    <img src={post} alt="" className="img-blog" />
                    <div className="blog-content">
                      <p className="blog-title">
                        EXG01: Tuyệt đỉnh Excel | Khóa học Excel online từ cơ
                        bản đến nâng cao
                      </p>
                      <button className="btn-check">Tìm hiểu ngay</button>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="item-swiper-slide">
                    <img src={post} alt="" className="img-blog" />
                    <div className="blog-content">
                      <p className="blog-title">
                        EXG01: Tuyệt đỉnh Excel | Khóa học Excel online từ cơ
                        bản đến nâng cao
                      </p>
                      <button className="btn-check">Tìm hiểu ngay</button>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="item-swiper-slide">
                    <img src={post} alt="" className="img-blog" />
                    <div className="blog-content">
                      <p className="blog-title">
                        EXG01: Tuyệt đỉnh Excel | Khóa học Excel online từ cơ
                        bản đến nâng cao
                      </p>
                      <button className="btn-check">Tìm hiểu ngay</button>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="item-swiper-slide">
                    <img src={post} alt="" className="img-blog" />
                    <div className="blog-content">
                      <p className="blog-title">
                        EXG01: Tuyệt đỉnh Excel | Khóa học Excel online từ cơ
                        bản đến nâng cao
                      </p>
                      <button className="btn-check">Tìm hiểu ngay</button>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </motion.div>
          </div>
          <div className="header-right">
            {JobDetailState.jobData.length === 0 ? (
              <CircularProgress />
            ) : (
              JobDetailState.jobData.map((JobDetail) => (
                <motion.div
                  key={JobDetail.id}
                  ref={JobDetail.id === Number(id) ? jobRef : null}
                  className="item-company-concat"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  <div className="from-concat-company">
                    <div className="from-txt-name">
                      <img
                        src={JobDetail.userData.avatar}
                        alt=""
                        className="item-img"
                      />
                      <p className="item-txt-name">
                        {JobDetail.userData.firstName +
                          " " +
                          JobDetail.userData.lastName}
                      </p>
                    </div>
                    <div className="from-scale">
                      <div className="item-scale">
                        <PeopleIcon className="item-icon" />
                        <p className="txt-scale">Quy mô:</p>
                      </div>
                      <div className="item-detail-scale">
                        {JobDetail.userData.scale}
                      </div>
                    </div>
                    <div className="from-scale">
                      <div className="item-scale">
                        <TokenIcon className="item-icon" />
                        <p className="txt-scale">Lĩnh vực:</p>
                      </div>
                      <div className="item-detail-scale">
                        {JobDetail.userData.field}
                      </div>
                    </div>
                    <div className="from-scale">
                      <div className="item-scale">
                        <LocationOnIcon className="item-icon" />
                        <p className="txt-scale">Địa điểm:</p>
                      </div>
                      <div className="item-detail-scale">
                        {JobDetail.userData.address}
                      </div>
                    </div>
                    <button
                      className="from-check-company"
                      onClick={() =>
                        handleClickProfileCompany(JobDetail.userData?.id)
                      }
                    >
                      <p className="txt-check-company">Xem thông tin công ty</p>
                      <NorthEastIcon className="img-icon" />
                    </button>
                  </div>

                  <div className="from-information">
                    <p className="txt-information">Thông tin chung</p>
                    <div className="from-concat-information">
                      <div className="from-icon">
                        <DiscountIcon className="item-icon" />
                      </div>
                      <div className="from-txt-information">
                        <p className="txt-information">Cấp bậc</p>
                        <p className="txt-member">{JobDetail.Grade}</p>
                      </div>
                    </div>
                    <div className="from-concat-information">
                      <div className="from-icon">
                        <SchoolIcon className="item-icon" />
                      </div>
                      <div className="from-txt-information">
                        <p className="txt-information">Học Vấn</p>
                        <p className="txt-member">{JobDetail.Education}</p>
                      </div>
                    </div>
                    <div className="from-concat-information">
                      <div className="from-icon">
                        <GroupIcon className="item-icon" />
                      </div>
                      <div className="from-txt-information">
                        <p className="txt-information">Số lượng người tuyển</p>
                        <p className="txt-member">
                          {JobDetail.positions_needed}
                        </p>
                      </div>
                    </div>
                    <div className="from-concat-information">
                      <div className="from-icon">
                        <WorkIcon className="item-icon" />
                      </div>
                      <div className="from-txt-information">
                        <p className="txt-information">Hình thức làm việc</p>
                        <p className="txt-member">{JobDetail.work_type}</p>
                      </div>
                    </div>
                  </div>

                  <div className="from-category">
                    <p className="txt-title-category">
                      Danh mục nghề liên quan
                    </p>

                    <div className="from-btn-job">
                      {jobCategoryState.jobCategoryDataList.length === 0 ? (
                        <CircularProgress />
                      ) : (
                        jobCategoryState.jobCategoryDataList.map(
                          (jobCategory, index) => (
                            <a
                              className="btn-click"
                              onClick={() => handleJobsClick(jobCategory.id)}
                              key={index}
                            >
                              {jobCategory.title}
                            </a>
                          )
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        <AddDialog
          open={open}
          jobItem={jobItem}
          handleClose={handleCloseAdd}
          handleAccept={handleAcceptAdd}
        />
      </div>
      <motion.div
        className="section-footer-end"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="layout-container footer-box">
          <div className="footer-left">
            <div className="logo-white">
              <img src={logo} alt="" />
              <span className="txt-company">Toptimviec.com</span>
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
      </motion.div>
    </>
  );
};
