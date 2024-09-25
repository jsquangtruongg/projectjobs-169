import styles from "./style.module.css";
import avatarPost from "../../../assets/images/avatar.jpg";
import poster23 from "../../../assets/images/Rectangle23.png";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ReplySharpIcon from "@mui/icons-material/ReplySharp";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import "./style.scss";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { getJob } from "../../../redux/actions/jobActions";
import { IJobData } from "../../../redux/reducers/job";
export const JobPostingComponent = () => {
  const jobState = useAppSelector((state) => state.job);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getJob());
  }, []);
  return (
    <div className="job-posting-container">
      <div className="layout-container job-posting-box">
        {jobState.jobData.map((job: IJobData, index: number) => (
          <div className="posting-item" key={index}>
            <div className="author-information">
              <div className="author-info">
                <img src={avatarPost} alt="" />
                <div className="author-name">
                  <p>{job.userData ? `${job.userData.lastName}` : "Ẩn danh"}</p>{" "}
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
              <p>{job.content}</p>
              <img src={poster23} alt="" />
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
              <div className="item-action">
                <FavoriteSharpIcon className={styles.icon_feeling} />
                <p>Quan Tâm</p>
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
    </div>
  );
};
