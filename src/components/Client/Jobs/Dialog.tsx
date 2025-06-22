import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import MoveToInboxOutlinedIcon from "@mui/icons-material/MoveToInboxOutlined";
import WarningOutlinedIcon from "@mui/icons-material/WarningOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

import { IApplyData } from "../../../redux/reducers/apply";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { createApply } from "../../../redux/actions/applyAction";

import {
  InputFromText,
  InputFromEmail,
} from "../../common/InputComponent/InputComponents";
import { IJob, IJobCategoryData } from "../../../redux/reducers/jobCategory";

export type IEditDialogProps = {
  open?: boolean;
  title?: string;
  handleAccept: () => void;
  handleClose: () => void;
  jobItem: IJob | null;
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
  const currentUser = props.jobItem?.user_id || "";
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

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0 || !addApply || !file) return;

    try {
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
          overflowY: "auto",
          maxHeight: "90vh",
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
              <div style={{ position: "absolute", zIndex: "-9999" }}>
                <TextField
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
                />
              </div>

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
