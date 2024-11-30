import styles from "./style.module.css";
import avatarPost from "../../../assets/images/avatar.jpg";
import poster23 from "../../../assets/images/Rectangle23.png";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ReplySharpIcon from "@mui/icons-material/ReplySharp";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import "./style.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { getJobAll } from "../../../redux/actions/jobActions";
import { AddDialog } from "./Dialog";
import { IJobData } from "../../../redux/reducers/job";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import map from "../../../assets/images/danh_dau.png";
export const JobPostingComponent = () => {
  const jobState = useAppSelector((state) => state.job);
  const [open, setOpen] = useState(false);
  const [jobItem, setJobItem] = useState<IJobData | null>(null);
  const [searchJob, setSearchJob] = useState<string>("");

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getJobAll());
  }, []);

  const handleOpen = (item: IJobData) => {
    setOpen(true);
    setJobItem(item);
  };
  const handleCloseAdd = () => {
    setOpen(false);
  };
  const handleAcceptAdd = () => {
    setOpen(false);
  };

  return (
    <div className="job-posting-container">
      <div className="layout-container job-posting-box">
        <div className="field-search">
          <img src={map} alt="" />
          <input placeholder="Tìm kiếm việc làm bạn muốn!" value={searchJob} />
          <div className="btn-search">
            Search
            <ArrowForwardIosOutlinedIcon
              style={{ fontSize: 15, marginLeft: 10 }}
            />
          </div>
        </div>
        {jobState.jobDataList.map((job, index: number) => (
          <div className="posting-item" key={index}>
            <div className="author-information">
              <div className="author-info">
                <img src={avatarPost} alt="" />
                <div className="author-name">
                  <div></div>
                  <p>
                    {job.userData ? `${job.userData.lastName}` : "Ẩn danh"}
                  </p>{" "}
                  <p>
                    {new Date(job.createdAt).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <ClearOutlinedIcon />
            </div>
            <div className="posting-content">
              {/* <p>{job.content}</p> */}
              <div
                className="content-container"
                dangerouslySetInnerHTML={{ __html: job?.content || "" }}
              ></div>
            </div>
            <div className="group-icon-action">
              <div className="item-action">
                <ThumbUpOutlinedIcon className={styles.icon_feeling} />
                <p>Thích</p>
              </div>
              <div className="item-action">
                <ModeCommentOutlinedIcon className={styles.icon_feeling} />
                <p>Bình Luận</p>
              </div>
              <div className="item-action" onClick={() => handleOpen(job)}>
                <FavoriteSharpIcon className={styles.icon_feeling} />
                <p>Tham Gia</p>
              </div>
              <div className="item-action">
                <ReplySharpIcon className={styles.icon_feeling} />
                <p>Chia sẻ</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.end}></div>
      <AddDialog
        open={open}
        jobItem={jobItem}
        handleClose={handleCloseAdd}
        handleAccept={handleAcceptAdd}
      />
    </div>
  );
};
