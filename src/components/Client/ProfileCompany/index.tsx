import { useState } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { motion } from "framer-motion";
import logo from "../../../assets/images/logo.png";
import React, { useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { getIdDataUserAction } from "../../../redux/actions/userAction";
import ScrollToTop from "../../../layout/ScrollLayout";

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
const ProfileCompanyComponent = () => {
  const dispatch = useAppDispatch();

  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const stateJobProfile = useAppSelector((state) => state.user);
  console.log("first", stateJobProfile);
  const { id } = useParams<{ id: string }>(); // Lấy từ URL

  useEffect(() => {
    if (id) {
      dispatch(getIdDataUserAction(Number(id))); // Chuyển đổi sang số nếu cần
    }
  }, [dispatch, id]);
  return (
    <>
      <ScrollToTop />

      <div className="from-header-top">
        <div className="from-heading">
          {stateJobProfile.userIdData && (
            <div className="">
              <div className="from-banner-profile">
                <div className="banner-content">
                  <div className="logo-profile">
                    <img
                      src={stateJobProfile.userIdData.avatar as string}
                      alt="CADIVI Logo"
                    />
                  </div>
                  <div className="info">
                    <h2>{stateJobProfile.userIdData.lastName}</h2>
                    <div className="details">
                      <span className="tag">Pro Company</span>
                      <span>
                        <i className="material-icons">Email:</i>
                        {stateJobProfile.userIdData.email}
                      </span>
                      <span>
                        <i className="material-icons">Số lượng:</i>{" "}
                        {stateJobProfile.userIdData.scale}
                      </span>
                      <span>
                        <i className="material-icons">Lĩnh Vực:</i>{" "}
                        {stateJobProfile.userIdData.field}
                      </span>
                    </div>
                  </div>
                  <div className="follow">
                    <button>+ Theo dõi công ty</button>
                  </div>
                </div>
              </div>
              <div className="from-introduce">
                <div className="from-profile-lef">
                  <div className="company-intro">
                    <div className="intro-header">Giới thiệu công ty</div>
                    <div className="intro-content">
                      <p>
                        Công ty Dây cáp điện Việt Nam được thành lập từ ngày
                        06/10/1975 với thương hiệu CADIVI, là một doanh nghiệp
                        chuyên sản xuất các loại dây và cáp điện. Sau khi được
                        cổ phần hóa, CADIVI trở thành một công ty cổ phần từ
                        tháng 9 năm 2007.
                      </p>
                      <p>
                        Hiện nay, CADIVI có một lực lượng cán bộ công nhân viên
                        có trình độ chuyên môn cao. Trên 50% nhân viên của Công
                        ty là các công nhân kỹ thuật, phần còn lại, bên cạnh các
                        nhà quản lý trung và cao cấp là các cán bộ, nhân viên
                        thuộc các phòng chức năng giàu kinh nghiệm.
                      </p>
                      <p className={expanded ? "" : "collapsed"}>
                        Hiện tại, CADIVI có 3 nhà máy, 2 công ty thành viên cùng
                        hệ thống phân phối bao gồm hơn 200 đại lý cấp 1 trải
                        rộng khắp cả nước. CADIVI sở hữu các công nghệ hàng đầu
                        trong ngành sản xuất dây cáp điện tại Việt Nam, được
                        trang bị các máy móc, thiết bị từ châu Âu, Mỹ và các
                        nước phát triển trong khu vực.
                      </p>
                      {!expanded && <div className="fade-effect"></div>}

                      <span
                        className="see-more"
                        onClick={() => setExpanded(!expanded)}
                      >
                        {expanded ? "Thu gọn" : "Xem thêm"}
                      </span>
                    </div>
                  </div>
                  <div className="company-intro">
                    <div className="intro-header">Tuyển Dụng</div>
                    <div className="intro-content">
                      {stateJobProfile.userIdData.Jobs &&
                      stateJobProfile.userIdData.Jobs.length > 0 ? (
                        stateJobProfile.userIdData.Jobs.map((job, index) => (
                          <div key={index} className="from-jobs">
                            <div className="from-avt">
                              <img
                                src={job.img as string}
                                alt=""
                                className="item-img"
                              />
                            </div>
                            <div className="from-concat-detail">
                              <div className="from-concat-job">
                                <div className="from-concat">
                                  <p className="txt-content">{job.title}</p>
                                  <p className="txt-company">
                                    {job.experience}
                                  </p>
                                </div>
                                <div className="from-total-salary">
                                  {job.salary}
                                </div>
                              </div>
                              <div className="from-concat-date">
                                <div className="item-concat-date">
                                  <p className="item-location">
                                    {job.location}
                                  </p>
                                </div>
                                <div className="from-save-apply">
                                  <button className="btn-apply">
                                    Ứng tuyển
                                  </button>
                                  <div className="item-love">
                                    <FavoriteBorderIcon
                                      style={{ color: "#00bfa6" }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>Chưa có công việc nào được đăng tuyển.</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="from-profile-right">
                  <div className="contact-info-box">
                    <div className="contact-header">Thông tin liên hệ</div>

                    <div className="contact-location">
                      <LocationOnOutlinedIcon className="icon-map" />
                      <strong className="str-location">Địa chỉ công ty</strong>
                    </div>
                    <p className="txt-location-company">
                      {stateJobProfile.userIdData.address}
                    </p>

                    <hr className="divider" />

                    <div className="map-link">
                      <MapOutlinedIcon className="icon-map" />
                      <span>Xem bản đồ</span>
                    </div>

                    <div className="map-frame">
                      <iframe
                        title="Google Map"
                        src={`https://www.google.com/maps?q=${encodeURIComponent(stateJobProfile.userIdData.address ?? "")}&output=embed`}
                        width="100%"
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                  <div className="from-information-company">
                    <Box
                      sx={{
                        borderRadius: 2,
                        boxShadow: 2,
                        p: 2,
                        maxWidth: 400,
                        bgcolor: "white",
                      }}
                    >
                      <div className="contact-header">Thông tin liên hệ</div>

                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Sao chép đường dẫn
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <TextField
                          inputRef={inputRef}
                          value={currentUrl}
                          variant="outlined"
                          size="small"
                          fullWidth
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <IconButton onClick={copyLink} sx={{ ml: 1 }}>
                          <ContentCopyIcon />
                        </IconButton>
                      </Box>

                      <Typography
                        variant="subtitle2"
                        sx={{ mb: 1 }}
                        className=""
                      >
                        Chia sẻ qua mạng xã hội
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton color="primary">
                          <FacebookIcon />
                        </IconButton>
                        <IconButton color="primary">
                          <TwitterIcon />
                        </IconButton>
                        <IconButton color="primary">
                          <LinkedInIcon />
                        </IconButton>
                      </Box>

                      <Snackbar
                        open={openSnackbar}
                        autoHideDuration={2000}
                        onClose={handleCloseSnackbar}
                        message="Đã sao chép liên kết!"
                      />
                    </Box>
                  </div>
                </div>
              </div>
            </div>
          )}
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
        </div>
      </div>
    </>
  );
};
export default ProfileCompanyComponent;
