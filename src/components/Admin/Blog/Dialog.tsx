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
import { IBlogData } from "../../../redux/reducers/blog";
import { useEffect, useState } from "react";

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
  blogData: IBlogData | null;
  handleClose: () => void;
  handleAccept: (blog: IBlogData) => void;
};
export const EditDialog = (props: IEditDialogProps) => {
  const [blog, setBlog] = useState<IBlogData | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBlog((prevData) => (prevData ? { ...prevData, [name]: value } : null));
  };
  useEffect(() => {
    if (props.blogData) {
      setBlog(props.blogData);
    }
  }, [props.blogData]);

  const handleAccepts = () => {
    if (!blog) return;
    console.log("Blog data:", blog);
    props.handleAccept(blog);
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
            onChange={handleChange}
            value={blog?.title}
            label="Tên bài viết"
            name="title"
            size="small"
          />
          <TextField
            onChange={handleChange}
            label="Danh mục"
            value={blog?.content || ""}
            name="content"
            size="small"
          />
          <TextField
            onChange={handleChange}
            value={blog?.userData.lastName}
            label="Tên"
            name="lastName"
            size="small"
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
