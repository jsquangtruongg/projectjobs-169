import avatarPost from "../../../assets/images/avatar.jpg";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import WaterfallChartOutlinedIcon from "@mui/icons-material/WaterfallChartOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import logo from "../../../assets/images/logo.png";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { getJobAll } from "../../../redux/actions/jobActions";
import { AddDialog, JobType } from "./Dialog";
import { Comment } from "./Dialog";
import { IJobData } from "../../../redux/reducers/job";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Mousewheel, Pagination } from "swiper/modules";
import vpBank from "../../../assets/images/ptbank.jpg";
import It from "../../../assets/images/tuyenIt.jpg";
import Seo from "../../../assets/images/Seo.jpg";
import BanHang from "../../../assets/images/banhang.jpg";

import {
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import { API, socket } from "../../../api/config";
import "./style.scss";
import ScrollToTop from "../../../layout/ScrollLayout";

const locations: Record<string, string[]> = {
  "Hà Nội": [
    "Ba Đình",
    "Ba Vì",
    "Bắc Từ Liêm",
    "Cầu Giấy",
    "Chương Mỹ",
    "Đan Phượng",
  ],
  "Hồ Chí Minh": ["Quận 1", "Quận 2", "Quận 3", "Quận 4", "Quận 7", "Thủ Đức"],
  "Bình Dương": ["Dĩ An", "Thuận An", "Tân Uyên", "Bến Cát", "Phú Giáo"],
};

export const JobPostingComponent = () => {
  const jobState = useAppSelector((state) => state.job);
  console.log(jobState);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState(false);
  const [jobItem, setJobItem] = useState<IJobData | null>(null);
  const [searchJob, setSearchJob] = useState<string>("");
  const [filteredJobs, setFilteredJobs] = useState<IJobData[]>(
    jobState.jobData
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const jobRef = useRef<HTMLDivElement | null>(null);
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  useEffect(() => {
    dispatch(getJobAll());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    setFilteredJobs(jobState.jobDataList);
  }, [jobState.jobDataList]);

  const handleSearch = () => {
    const filtered = jobState.jobDataList?.filter(
      (job: IJobData) =>
        job.title.toLowerCase().includes(searchJob.toLowerCase()) ||
        job.content.toLowerCase().includes(searchJob.toLowerCase())
    );
    setFilteredJobs(filtered || []);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchJob(event.target.value);
  };

  const jobItemData = jobState.jobData.find((job) => job.id === Number(id));
  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        jobRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [location.state?.scrollTo, jobItemData]);

  const handleOpen = (item: IJobData) => {
    setOpen(true);
    setJobItem(item);
  };

  const handleCloseAdd = () => setOpen(false);
  const handleAcceptAdd = () => setOpen(false);
  const handleCommentAdd = () => setComment(false);
  const handleCommentClose = () => setComment(false);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setSelectedDistricts([]);
  };

  const handleDistrictToggle = (district: string) => {
    setSelectedDistricts((prev) =>
      prev.includes(district)
        ? prev.filter((d) => d !== district)
        : [...prev, district]
    );
  };

  const clearSelection = () => {
    setSelectedCity("");
    setSelectedDistricts([]);
  };

  useEffect(() => {
    setFilteredJobs(jobState.jobDataList);
  }, [jobState.jobDataList]);
  useEffect(() => {
    socket.on("updateLike", ({ jobId, likeCount }) => {
      setFilteredJobs((prevJobs) =>
        prevJobs.map((job) => (job.id === jobId ? { ...job, likeCount } : job))
      );
    });

    return () => {
      socket.off("updateLike");
    };
  }, []);

  const [likedJobs, setLikedJobs] = useState<number[]>([]);

  const handleLike = async (jobId: number) => {
    try {
      const response = await API.post(`/jobs/${jobId}/like`);
      console.log("API trả về:", response.data);

      setFilteredJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId
            ? { ...job, likeCount: response.data.likeCount }
            : job
        )
      );

      setLikedJobs((prev) =>
        prev.includes(jobId)
          ? prev.filter((id) => id !== jobId)
          : [...prev, jobId]
      );

      socket.emit("likeJob", { jobId });
    } catch (error) {
      console.error("Lỗi khi gọi API like:", error);
    }
  };
  const [selectedJob, setSelectedJob] = useState<JobType[]>([]);
  const getTextFromHTML = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.innerText;
  };
  const navigate = useNavigate();
  const handleClickProfile = () => {
    navigate("/profile");
  };
  const handleClickBoards = () => {
    navigate("/boards");
  };

  const handleClickJobDetail = (id: number | string) => {
    navigate(`/job-detail/${id}`);
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

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <>
      <ScrollToTop />

      <div className="job-posting-container">
        <div className="from-line-banner"></div>
        <div className="from-banner">
          <p className="txt-big-size">
            Tìm việc làm nhanh 24h, việc làm mới nhất trên toàn quốc.
          </p>
          <p className="txt-small-size">
            Tiếp cận 40,000+ tin tuyển dụng việc làm mỗi ngày từ hàng nghìn
            doanh nghiệp uy tín tại Việt Nam
          </p>
          <div className="field-search">
            <input
              placeholder="Tìm kiếm việc làm bạn muốn!"
              className="input-search"
              onChange={handleChange}
            />
            <Box sx={{ borderLeft: 1, height: "30px", color: "#b3b7b9" }} />

            <div className="location-dropdown" ref={dropdownRef}>
              <button
                style={{ height: "50px", width: "140px" }}
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                {selectedCity
                  ? `${selectedCity} (${selectedDistricts.length})`
                  : "Chọn địa điểm"}{" "}
                {isDropdownOpen ? "▲" : "▼"}
              </button>

              {isDropdownOpen && (
                <div className="popover-content">
                  <div className="location-list">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Tìm tỉnh/thành phố..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-input"
                      />
                      <FmdGoodIcon />
                    </div>

                    {Object.keys(locations)
                      .filter((city) =>
                        city.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((city) => (
                        <button
                          key={city}
                          onClick={() => handleCitySelect(city)}
                          className="selected"
                        >
                          {city}
                        </button>
                      ))}
                  </div>

                  <div className="district-list">
                    {selectedCity ? (
                      locations[selectedCity].map((district) => (
                        <FormControlLabel
                          key={district}
                          control={
                            <Checkbox
                              checked={selectedDistricts.includes(district)}
                              onChange={() => handleDistrictToggle(district)}
                            />
                          }
                          label={district}
                        />
                      ))
                    ) : (
                      <p className="hint-text">Chọn tỉnh/thành phố trước</p>
                    )}
                  </div>

                  <div className="dropdown-actions">
                    <button onClick={clearSelection}>Bỏ chọn tất cả</button>
                    <button onClick={() => setIsDropdownOpen(false)}>
                      Áp dụng
                    </button>
                  </div>
                </div>
              )}
            </div>
            <Box sx={{ borderLeft: 1, height: "30px", color: "#b3b7b9" }} />

            <div className="btn-search" onClick={handleSearch}>
              Search
              <ArrowForwardIosOutlinedIcon
                style={{ fontSize: 15, marginLeft: 10 }}
              />
            </div>
          </div>
          <Swiper
            style={{
              left: "25%",
              top: "37%",
              position: "absolute",
              height: "275px",
              overflow: "hidden",
              width: "50%",
              borderRadius: "20px",
              marginTop: "20px",
              marginRight: "20px",
            }}
            cssMode={true}
            mousewheel={true}
            keyboard={true}
            spaceBetween={0}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Mousewheel, Keyboard, Autoplay]}
            className="mySwiper-sidle"
          >
            <SwiperSlide className="from-sidle-item">
              <img src={vpBank} alt="Slide 1" className="item-img-banner" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={It} alt="Slide 2" className="item-img-banner" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={Seo} alt="Slide 3" className="item-img-banner" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={BanHang} alt="Slide 4" className="item-img-banner" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="job-posting-box">
          <motion.div
            className="from-nav"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <div onClick={handleClickProfile} className="item-concat">
              <img src={avatarPost} alt="" className="img-avt" />
              <p className="txt-name">Nguyen Admin</p>
            </div>
            <div className="item-concat">
              <MailOutlinedIcon className="img-boards" />
              <p className="txt-name">Tin nhắn</p>
            </div>
            <div className="item-concat" onClick={handleClickBoards}>
              <DashboardCustomizeOutlinedIcon className="img-boards" />
              <p className="txt-name">Bảng báo cáo</p>
            </div>
            <div className="item-concat">
              <AccessTimeOutlinedIcon className="img-boards" />
              <p className="txt-name">Cập Nhập</p>
            </div>

            <div className="item-concat">
              <PaymentOutlinedIcon className="img-boards" />
              <p className="txt-name">Tiền điện tử</p>
            </div>
            <div className="item-concat">
              <DashboardCustomizeOutlinedIcon className="img-boards" />
              <p className="txt-name">Công việc</p>
            </div>
            <div className="item-concat">
              <SettingsOutlinedIcon className="img-boards" />
              <p className="txt-name">Cài đặt</p>
            </div>
            <div className="item-concat">
              <CloudUploadOutlinedIcon className="img-boards" />
              <p className="txt-name">Tải File</p>
            </div>
            <div className="item-concat">
              <WaterfallChartOutlinedIcon className="img-boards" />
              <p className="txt-name">Phân tích</p>
            </div>
          </motion.div>
          <motion.div
            className="from-main"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <div className="from-show-job">
              {jobState.jobDataList.length === 0 ? (
                <div className="loading-data">
                  <CircularProgress />
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <div
                    className="posting-item"
                    key={job.id}
                    ref={job.id === Number(id) ? jobRef : null}
                  >
                    <div className="author-information">
                      <div className="author-info">
                        <img src={avatarPost} alt="" />
                        <div className="author-name">
                          <p className="item-name">
                            {job.userData
                              ? `${job.userData.lastName}`
                              : "Ẩn danh"}
                          </p>{" "}
                          <p className="item-date">
                            {new Date(job.createdAt).toLocaleDateString(
                              "vi-VN",
                              {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                      <ClearOutlinedIcon className="icon-block" />
                    </div>
                    <div
                      className=""
                      onClick={() => handleClickJobDetail(job.id)}
                    >
                      <p className="item-title-dev">{job.title}</p>
                      <div className="from-location-time">
                        <div className="item-location">
                          <FavoriteBorderOutlinedIcon className="icon_feeling" />
                          <p className="txt-location">{job.location}</p>
                        </div>
                        <div className="item-location">
                          <AccessTimeOutlinedIcon className="icon_feeling" />
                          <p className="txt-location">{job.work_type}</p>
                        </div>
                      </div>
                      <div className="posting-content">
                        <div className="content-container">
                          {getTextFromHTML(job.content).length > 50
                            ? `${getTextFromHTML(job.content).slice(0, 50)}... -> xem chi tiết hơn`
                            : getTextFromHTML(job.content)}
                        </div>
                      </div>
                    </div>
                    <div className="group-icon-action">
                      <div
                        className="item-action"
                        onClick={() => handleOpen(job)}
                      >
                        <p>Tham Gia</p>
                      </div>
                      <div
                        className={`item-action-like ${likedJobs.includes(job.id) ? "liked" : ""}`}
                        onClick={() => handleLike(job.id)}
                      >
                        <FavoriteBorderOutlinedIcon className="icon_feeling" />
                        {/* <p>({job.like_count})</p> */}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
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
        </motion.div>
        <AddDialog
          open={open}
          jobItem={jobItem}
          handleClose={handleCloseAdd}
          handleAccept={handleAcceptAdd}
        />

        <Comment
          handleClose={handleCommentAdd}
          handleAccept={handleCommentClose}
          open={comment}
          filteredJob={selectedJob}
        />
      </div>
    </>
  );
};
