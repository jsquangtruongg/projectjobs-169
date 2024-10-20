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
import { IApplyData } from "../../../redux/reducers/apply";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { createApply } from "../../../redux/actions/applyAction";
import { IJobData } from "../../../redux/reducers/job";
export type IEditDialogProps = {
  open?: boolean;
  title?: string;
  handleAccept: () => void;
  handleClose: () => void;
  jobItem: IJobData | null;
};
export const AddDialog = (props: IEditDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const currentUser = props.jobItem?.userData.id || "";
  const currentJob = props.jobItem?.id || "";
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
    userData: {
      id: 1,
      firstName: "",
      lastName: "",
      email: "",
      avatar: "",
    },
    jobs: {
      id: 1,
      img: "",
      content: "",
    },
  });

  useEffect(() => {
    setAddApply({ ...addApply, job_id: currentJob, user_id: currentUser });
  }, [currentUser, currentJob]);
  const dispatch = useAppDispatch();
  const handleAccepts = async () => {
    if (!addApply) return;
    await dispatch(createApply(addApply));
    props.handleClose();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddApply((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
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
          maxHeight: "100vh", // Đặt chiều cao tối đa cho dialog
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
          <TextField
            label="Họ & Tên hiển thị cho NTD"
            name="fullName"
            size="small"
            value={addApply.fullName}
            onChange={handleChange}
          />
          <TextField
            label="Email hiển thị cho NTD"
            name="email"
            size="small"
            value={addApply.email}
            onChange={handleChange}
          />
          <TextField
            label="SĐT hiển thị cho NTD"
            name="phone"
            size="small"
            value={addApply.phone}
            onChange={handleChange}
          />
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

          <label
            htmlFor="file-upload"
            style={{
              padding: "12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              display: "block",
              width: "100%",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Chọn CV :
              <MoveToInboxOutlinedIcon />
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
      <DialogActions>
        <Button
          autoFocus
          onClick={props.handleClose}
          style={{ backgroundColor: "#f2f4f5", color: "#263a4d" }}
        >
          Huỷ
        </Button>
        <Button
          autoFocus
          onClick={handleAccepts}
          style={{ backgroundColor: "#00b14f", color: "#FFF" }}
        >
          Nộp hồ sơ ứng tuyển
        </Button>
      </DialogActions>
    </Dialog>
  );
};
