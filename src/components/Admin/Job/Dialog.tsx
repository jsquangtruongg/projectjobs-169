import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { IJobData } from "../../../redux/reducers/job";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux/store";
import { createJob } from "../../../redux/actions/jobActions";

export type IDeleteDialogProps = {
  open?: boolean;
  title?: string;
  handleClose: () => void;
  handleAccept: () => void;
};
export const DeleteDialog = (props: IDeleteDialogProps) => {
  return (
    <Dialog
      open={props.open ?? false}
      onClose={props.handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Xác nhận</DialogTitle>
      <DialogContent>
        <DialogContentText>Bạn có muốn xoá không</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.handleClose}>
          Huỷ
        </Button>
        <Button onClick={props.handleAccept} autoFocus>
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export type IEditDialogProps = {
  open?: boolean;
  title?: string;
  jobData: IJobData | null;
  handleClose: () => void;
  handleAccept: (job: IJobData) => void;
};
export const EditDialog = (props: IEditDialogProps) => {
  const [job, setJob] = useState<IJobData | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJob((prevData) => (prevData ? { ...prevData, [name]: value } : null));
  };
  useEffect(() => {
    if (props.jobData) {
      setJob(props.jobData);
    }
  }, [props.jobData]);
  const handleAccepts = () => {
    if (!job) return;
    props.handleAccept(job);
    props.handleClose();
  };

  return (
    <Dialog
      open={props.open ?? false}
      onClose={props.handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Chỉnh sửa thông tin khách hàng
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
            label="Nội dung bài viết"
            name="content"
            size="small"
            value={job?.content}
            onChange={handleChange}
          />
          <TextField
            label="Ngày đăng"
            name="createdAt"
            size="small"
            value={job?.createdAt}
            onChange={handleChange}
          />
          <TextField
            label="Người đăng"
            name="lastName"
            size="small"
            value={job?.userData.lastName}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.handleClose}>
          Huỷ
        </Button>
        <Button onClick={handleAccepts} autoFocus>
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export type IAddDialogProps = {
  open?: boolean;
  handleClose: () => void;
  handleAccept: () => void;
};

export const AddDialog = (props: IAddDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [addJob, setAddJob] = useState<IJobData>({
    id: 3,
    content: "",
    img: "",
    user_id: 2,
    JobCategory_id: 1,
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: "",
    userData: {
      id: 2,
      avatar: null,
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const dispatch = useAppDispatch();

  const handleAccepts = async () => {
    if (!addJob || !file) return;
    await dispatch(createJob(addJob, file));
    props.handleClose();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddJob((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Dialog
      open={props.open ?? false}
      onClose={props.handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title" style={{ textAlign: "center" }}>
        Thêm mới thông tin blog
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
            label="Nội dung bài viết"
            name="content"
            size="small"
            value={addJob.content}
            onChange={handleChange}
          />
          <input type="file" accept="image/*" onChange={handleFileChange} />

          <TextField
            label="Ngày tạo"
            name="createdAt"
            size="small"
            type="date"
            value={addJob.createdAt.split("T")[0]}
            onChange={handleChange}
          />
          <TextField
            label="User_id"
            name="user_id"
            size="small"
            value={addJob.user_id}
            onChange={handleChange}
          />
          <TextField
            label="Danh Mục Job"
            name="JobCategory_id"
            size="small"
            value={addJob.JobCategory_id}
            onChange={handleChange}
          />

          <TextField
            label="Họ người dùng"
            name="lastName"
            size="small"
            value={addJob.userData.lastName}
            onChange={(e) =>
              setAddJob({
                ...addJob,
                userData: { ...addJob.userData, lastName: e.target.value },
              })
            }
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.handleClose}>
          Huỷ
        </Button>
        <Button onClick={handleAccepts} autoFocus>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};