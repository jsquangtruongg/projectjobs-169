import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import MoveToInboxOutlinedIcon from "@mui/icons-material/MoveToInboxOutlined";
import { IApplyData } from "../../../redux/reducers/apply";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import WarningOutlinedIcon from "@mui/icons-material/WarningOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { createApply } from "../../../redux/actions/applyAction";
import { IJobData } from "../../../redux/reducers/job";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import avatarPost from "../../../assets/images/avatar.jpg";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ReplySharpIcon from "@mui/icons-material/ReplySharp";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import EmojiPicker from "emoji-picker-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  InputFromText,
  InputFromEmail,
} from "../../common/InputComponent/InputComponents";
import styles from "./style.module.css";
import { API, socket } from "../../../api/config";
import { useParams } from "react-router-dom";
import "./main.scss";
import SendSharpIcon from "@mui/icons-material/SendSharp";

export type IEditDialogProps = {
  open?: boolean;
  title?: string;
  handleAccept: () => void;
  handleClose: () => void;
  jobItem: IJobData | null;
};
export type Errors = {
  fullName?: string;
  email?: string;
  phone?: string;
  img?: string;
};
export const AddDialog = (props: IEditDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const currentUser = props.jobItem?.userData.id || "";
  const currentJob = props.jobItem?.id || "";
  const userApplyState = useAppSelector(
    (state) => state.user.userData?.id || ""
  );

  const [addApply, setAddApply] = useState<IApplyData>({
    id: 1,
    fullName: "",
    email: "",
    phone: "",
    img: "",
    createdAt: "",
    updatedAt: "",
    user_id: currentUser,
    job_id: currentJob,
    userApply_id: userApplyState,
    userData: {
      id: 1,
      firstName: "",
      lastName: "",
      email: "",
      avatar: "",
    },
    job: {
      id: 1,
      img: "",
      content: "",
    },
    userApply: {
      id: 1,
      firstName: "",
      lastName: "",
      email: "",
      avatar: "",
    },
  });
  useEffect(() => {
    setAddApply({
      ...addApply,
      userApply_id: userApplyState,
      job_id: currentJob,
      user_id: currentUser,
    });
  }, [currentUser, currentJob]);

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log(id, value);
    setAddApply((prevData) => ({ ...prevData, [id]: value }));
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const validateForm = (): Errors => {
    const newErrors: Errors = {};
    if (!addApply.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(addApply.email)
    ) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!addApply.fullName.trim()) {
      newErrors.fullName = "Tên không được để trống";
    }
    if (!addApply.phone.trim()) {
      newErrors.phone = "SDT không được để trống";
    }
    return newErrors;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const formErrors = validateForm();
    setErrors(formErrors);

    // Check for errors
    if (Object.keys(formErrors).length > 0 || !addApply || !file) return;

    try {
      // Dispatch action
      await dispatch(createApply(addApply, file as File));
      props.handleClose(); // Close modal on success
    } catch (error) {
      console.error(error);
      setErrors({ email: "Failed to submit the form" }); // Set submission error
    }
  };

  return (
    <Dialog
      open={props.open ?? false}
      onClose={props.handleClose}
      aria-labelledby="responsive-dialog-title"
      sx={{
        "& .MuiDialog-container": {
          overflow: "hidden",
          height: "auto",
          marginTop: "50px",
        },
        "& .MuiDialog-paper": {
          maxWidth: "100%",
          margin: "0",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          overflowY: "auto", // Cho phép cuộn theo chiều dọc
          maxHeight: "90vh", // Đặt chiều cao tối đa cho dialog
        },
        "& .MuiDialog-paperWidthSm": {
          width: "650px !important", // Chiều rộng tối đa cho dialog nhỏ
          maxWidth: "none", // Vô hiệu hóa maxWidth mặc định
        },
        "& .MuiDialogContent-root": {
          overflowY: "clip",
        },
      }}
    >
      <DialogTitle id="responsive-dialog-title">
        Thông tin tuyển dụng
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <div className="edit-form">
          <DialogContent>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { width: "100%" },
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                padding: "10px",
              }}
              noValidate
              autoComplete="off"
            >
              <InputFromText
                name="Tên hiển thị cho nhà tuyển dụng"
                id="fullName"
                value={addApply.fullName}
                onChange={handleChange}
                error={errors.fullName}
              />

              <InputFromEmail
                name="email"
                id="email"
                value={addApply.email}
                onChange={handleChange}
                error={errors.email}
              />
              <InputFromText
                name="Tên hiển SDT cho nhà tuyển dụng"
                id="phone"
                value={addApply.phone}
                onChange={handleChange}
                error={errors.phone}
              />

              {/* <TextField
                  label="user_id"
                  name="user_id"
                  size="small"
                  value={addApply.user_id}
                  onChange={handleChange}
                />
                <TextField
                  label="job_id"
                  name="job_id"
                  size="small"
                  value={addApply.job_id}
                  onChange={handleChange}
                />
                <TextField
                  label="userApply_id"
                  name="userApply_id"
                  size="small"
                  value={userApplyState}
                  onChange={handleChange}
                /> */}

              <label htmlFor="file-upload" className="item-file-upload">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Chọn CV :
                  <MoveToInboxOutlinedIcon style={{ color: "#00c9a7" }} />
                </div>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{
                  display: "none",
                }}
              />
            </Box>
          </DialogContent>
        </div>
        <div className="from-letters">
          <div className="item-letters">
            <BorderColorOutlinedIcon className="item-pen" />
            <p className="txt-letters">Thư giới thiệu:</p>
          </div>
          <p className="item-detail">
            Một thư giới thiệu ngắn gọn, chỉn chu sẽ giúp bạn trở nên chuyên
            nghiệp và gây ấn tượng hơn với nhà tuyển dụng.
          </p>
          <div>
            <textarea
              name="letter"
              id=""
              className="item-input"
              placeholder="Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu) và nêu rõ mong muốn, lý do bạn muốn ứng tuyển cho vị trí này."
            ></textarea>
          </div>
          <div className="from-waring">
            <div className="item-waring">
              <WarningOutlinedIcon className="icon-waring" />
              <p className="txt-waring">Lưu ý:</p>
            </div>
            <p className="txt-note">
              1.TopCV khuyên tất cả các bạn hãy luôn cẩn trọng trong quá trình
              tìm việc và chủ động nghiên cứu về thông tin công ty, vị trí việc
              làm trước khi ứng tuyển. Ứng viên cần có trách nhiệm với hành vi
              ứng tuyển của mình. Nếu bạn gặp phải tin tuyển dụng hoặc nhận được
              liên lạc đáng ngờ của nhà tuyển dụng, hãy báo cáo ngay cho TopCV
              qua email hotro@topcv.vn để được hỗ trợ kịp thời.
            </p>
          </div>
        </div>
        <DialogActions style={{ padding: "20px 20px" }}>
          <Button
            autoFocus
            onClick={props.handleClose}
            style={{ backgroundColor: "#f2f4f5", color: "#263a4d" }}
          >
            Huỷ
          </Button>
          <Button
            type="submit"
            autoFocus
            style={{
              backgroundColor: "#00c9a7",
              color: "#FFF",
              width: "550px",
            }}
          >
            Nộp hồ sơ ứng tuyển
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export type JobType = {
  id: number;
  content: string;
  userData?: {
    lastName: string;
  };
  createdAt: string;
  like_count: number;
};

export type IAddCommentProps = {
  open?: boolean;
  handleAccept: () => void;
  handleClose: () => void;
  filteredJob: JobType[];
};
export const Comment = (props: IAddCommentProps) => {
  const jobState = useAppSelector((state) => state.job);
  const jobRef = useRef<HTMLDivElement | null>(null);
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(false);
  const [jobItem, setJobItem] = useState<IJobData | null>(null);
  const [filteredJobs, setFilteredJobs] = useState<IJobData[]>(
    jobState.jobData
  );
  const handleOpen = (item: IJobData) => {
    setOpen(true);
    setJobItem(item);
  };
  const [commentText, setCommentText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
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
  const [commentingJobId, setCommentingJobId] = useState<number | null>(null);
  const handleLike = async (jobId: number) => {
    try {
      const response = await API.post(`/jobs/${jobId}/like`);
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

  const handleOpenComment = (jobId: number) => {
    setCommentingJobId((prev) => (prev === jobId ? null : jobId));
  };

  const handleEmojiClick = (emojiObject: any) => {
    setCommentText((prev) => prev + emojiObject.emoji);
  };
  useEffect(() => {
    console.log("Filtered Jobs in CommentComponent:", props.filteredJob);
  }, [props.filteredJob]);

  console.log("Danh sách bài đăng:", props.filteredJob);
  return (
    <Dialog
      open={props.open ?? false}
      onClose={props.handleClose}
      aria-labelledby="responsive-dialog-title"
      sx={{
        "& .MuiDialog-container": {
          overflow: "hidden",
          height: "auto",
          marginTop: "50px",
        },
        "& .MuiDialog-paper": {
          maxWidth: "100%",
          margin: "0",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          overflowY: "auto",
          height: "500px",
          maxHeight: "100vh",
        },
        "& .MuiDialog-paperWidthSm": {
          width: "650px !important",
          maxWidth: "none",
        },
        "& .MuiDialogContent-root": {
          overflowY: "clip",
        },
      }}
    >
      {props.filteredJob.map((job) => (
        <div
          className="posting-item"
          key={job.id}
          ref={job.id === Number(id) ? jobRef : null}
        >
          <div className="author-information">
            <div className="author-info">
              <img src={avatarPost} alt="" />
              <div className="author-name">
                <p>{job.userData ? `${job.userData.lastName}` : "Ẩn danh"}</p>
                <p>
                  {new Date(job.createdAt).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <ClearOutlinedIcon
              className="icon-block"
              onClick={props.handleClose}
            />
          </div>
          <div className="posting-content">
            <div
              className="content-container"
              dangerouslySetInnerHTML={{ __html: job?.content || "" }}
            ></div>
          </div>
          <div className="group-icon-action">
            <div
              className={`item-action ${likedJobs.includes(job.id) ? "liked" : ""}`}
              onClick={() => handleLike(job.id)}
            >
              <ThumbUpOutlinedIcon className={styles.icon_feeling} />
              <p>Thích ({job.like_count})</p>
            </div>

            <div
              className="item-action"
              onClick={() => handleOpenComment(job.id)}
            >
              <ModeCommentOutlinedIcon className={styles.icon_feeling} />
              <p>Bình Luận</p>
            </div>

            <div className="item-action">
              <FavoriteSharpIcon className={styles.icon_feeling} />
              <p>Tham Gia</p>
            </div>

            <div className="item-action">
              <ReplySharpIcon className={styles.icon_feeling} />
              <p>Chia sẻ</p>
            </div>
          </div>
          <div className="">
            <div className="from-comment">
              <img src={avatarPost} alt="" className="img-avt" />
              <div className="input-comment">
                <p className="txt-name">Nguyễn Quang Trường</p>
                <p className="item-comment">tôi muốn ứng tuyển</p>
              </div>
            </div>
            <div className="from-interact">
              <p className="item-reComment">3 giờ</p>
              <p className="item-reComment">Thích</p>
              <p className="item-reComment">phản hồi</p>
            </div>
          </div>

          <div className="item-comment">
            <img src={avatarPost} alt="" className="img-avt" />
            <div className="from-comment">
              <div className="input-comment">
                <input
                  type="text"
                  className="txt-comment"
                  placeholder="Viết bình luận..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="btn-icon"
                >
                  😊
                </button>

                <AnimatePresence>
                  {showEmojiPicker && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="emoji-picker"
                    >
                      <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <SendSharpIcon className="icon-send" />
            </div>
          </div>
        </div>
      ))}
    </Dialog>
  );
};
