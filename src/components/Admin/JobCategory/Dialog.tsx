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
import { useEffect, useState } from "react";
import { IJobCategoryData } from "../../../redux/reducers/jobCategory";
import { postCreateJobCategory } from "../../../redux/actions/jobCategoryActions";
import { useAppDispatch } from "../../../redux/store";

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
  jobCategoryData: IJobCategoryData | null;
  handleClose: () => void;
  handleAccept: (job: IJobCategoryData) => void;
};
export const EditDialog = (props: IEditDialogProps) => {
  const [jobCategory, setJobCategory] = useState<IJobCategoryData | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setJobCategory((prevData) =>
      prevData ? { ...prevData, [name]: value } : null
    );
  };
  useEffect(() => {
    if (props.jobCategoryData) {
      setJobCategory(props.jobCategoryData);
    }
  }, [props.jobCategoryData]);
  const handleAccepts = () => {
    if (!jobCategory) return;
    props.handleAccept(jobCategory);
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
            label="Tên bài viết"
            name="title"
            size="small"
            value={jobCategory?.title}
            onChange={handleChange}
          />
          <TextField label="Tên" name="lastName" size="small" />
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
  const [addJobCategory, setAddJobCategory] = useState<IJobCategoryData>({
    id: 1,
    img: "",
    title: "",
    user_id: 1,
    createdAt: "",
    updatedAt: "",
    userData: {
      email: "",
      firstName: "",
      lastName: "",
      id: 1,
    },
    jobs: {
      id: 1,
      img: "",
      content: "",
    },
  });
  const dispatch = useAppDispatch();

  const createJobWrapper = (
    jobCategoryData: IJobCategoryData,
    file: File | null
  ) => {
    return postCreateJobCategory(jobCategoryData, file as File);
  };
  const handleAccepts = async () => {
    console.log("Dữ liệu gửi lên server:", addJobCategory);

    if (!addJobCategory.title || !addJobCategory.user_id) {
      alert("Vui lòng nhập đầy đủ Tên bài viết và User ID");
      return;
    }

    await dispatch(createJobWrapper(addJobCategory, file));
    props.handleClose();
  };

  const handleChangeTextField = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setAddJobCategory((prevData) => {
      const newData = {
        ...prevData,
        [name]: name === "user_id" ? Number(value) : value,
      };
      console.log("Dữ liệu addJobCategory sau khi đổi:", newData);
      return newData;
    });
  };

  const [file, setFile] = useState<File | null>(null);
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
    >
      <DialogTitle id="responsive-dialog-title" style={{ textAlign: "center" }}>
        Thêm mới thông tin JobCategory
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
            label="ID"
            name="id"
            size="small"
            value={addJobCategory.id}
            onChange={handleChangeTextField}
          />

          <TextField
            label="Tên bài viết"
            name="title"
            size="small"
            value={addJobCategory.title}
            onChange={handleChangeTextField}
          />

          <TextField
            label="User ID"
            name="user_id"
            size="small"
            value={addJobCategory.user_id}
            onChange={handleChangeTextField}
          />

          <input type="file" accept="image/*" onChange={handleFileChange} />

          <TextField
            label="Ngày tạo"
            name="createdAt"
            type="date"
            size="small"
            value={addJobCategory.createdAt}
            onChange={handleChangeTextField}
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
