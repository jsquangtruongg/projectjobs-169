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
import { useAppDispatch } from "../../../redux/store";
import { postCreateBlog } from "../../../redux/actions/blogActions";

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

export type IAddDialogProps = {
  open?: boolean;
  handleClose: () => void;
  handleAccept: () => void;
};

export const AddDialog = (props: IAddDialogProps) => {
  const [addBlog, setAddBlog] = useState<IBlogData>({
    id: 3,
    title: "",
    content: "",
    img: "",
    user_id: 2,
    salary: "",
    blog_category_id: 2,
    createdAt: "",
    updatedAt: "",
    userData: {
      email: "",
      firstName: "",
      lastName: "",
      id: 1,
    },
    categoryData: {
      describe: "",
      title: "",
    },
  });
  const dispatch = useAppDispatch();

  const handleAccepts = async () => {
    if (!addBlog) return;

    await dispatch(postCreateBlog(addBlog));
    props.handleClose();
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
            value={addBlog?.id}
            label="ID"
            name="id"
            size="small"
            onChange={(event) =>
              setAddBlog({ ...addBlog, id: parseInt(event.target.value) })
            }
          />
          <TextField
            value={addBlog?.title}
            label="Tên bài viết"
            name="title"
            size="small"
            onChange={(event) =>
              setAddBlog({ ...addBlog, title: event.target.value })
            }
          />
          <TextField
            value={addBlog?.content}
            label="Nội dung"
            name="content"
            size="small"
            onChange={(event) =>
              setAddBlog({ ...addBlog, content: event.target.value })
            }
          />
          <TextField
            value={addBlog?.img}
            label="Hình ảnh"
            name="img"
            size="small"
            onChange={(event) =>
              setAddBlog({ ...addBlog, img: event.target.value })
            }
          />
          <TextField
            value={addBlog?.user_id}
            label="User ID"
            name="user_id"
            size="small"
            onChange={(event) =>
              setAddBlog({ ...addBlog, user_id: parseInt(event.target.value) })
            }
          />
         
          <TextField
            value={addBlog?.blog_category_id}
            label="Danh mục ID"
            name="blog_category_id"
            size="small"
            onChange={(event) =>
              setAddBlog({
                ...addBlog,
                blog_category_id: parseInt(event.target.value),
              })
            }
          />
          <TextField
            value={addBlog?.createdAt}
            label="Ngày tạo"
            name="createdAt"
            size="small"
            onChange={(event) =>
              setAddBlog({ ...addBlog, createdAt: event.target.value })
            }
          />
          <TextField
            value={addBlog?.userData.firstName}
            label="Tên người dùng"
            name="firstName"
            size="small"
            onChange={(event) =>
              setAddBlog({
                ...addBlog,
                userData: {
                  ...addBlog.userData,
                  firstName: event.target.value,
                },
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
