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
import { IBlogCategoryData } from "../../../redux/reducers/blogCategory";
import { postCreateBlogCategory } from "../../../redux/actions/blogCategoryAction";

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
  blogCategoryData: IBlogCategoryData | null;
  handleClose: () => void;
  handleAccept: (blog: IBlogCategoryData) => void;
};
export const EditDialog = (props: IEditDialogProps) => {
  const [blog, setBlog] = useState<IBlogCategoryData | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBlog((prevData) => (prevData ? { ...prevData, [name]: value } : null));
  };

  useEffect(() => {
    if (props.blogCategoryData) {
      setBlog(props.blogCategoryData);
    }
  }, [props.blogCategoryData]);

  const handleAccepts = () => {
    if (!blog) return;
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
            value={blog?.describe}
            name="describe"
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
  const [file, setFile] = useState<File | null>(null);
  const [addBlogCategory, setAddBlogCategory] = useState<IBlogCategoryData>({
    id: 1,
    title: "",
    img: "",
    describe: "",
    user_id: 1,
    createdAt: "",
    updatedAt: "",
    userData: {
      email: "",
      firstName: "",
      lastName: "",
      id: 1,
    },
    blogData: {
      id: 1,
      content: "",
      title: "",
    },
  });
  const dispatch = useAppDispatch();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };
  const handleAccepts = async () => {
    if (!addBlogCategory || !file) return;
    await dispatch(postCreateBlogCategory(addBlogCategory, file));
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
            label="ID"
            name="id"
            size="small"
            value={addBlogCategory.id}
            onChange={(event) =>
              setAddBlogCategory({
                ...addBlogCategory,
                id: parseInt(event.target.value),
              })
            }
          />
          <TextField
            label="Tên bài viết"
            name="title"
            size="small"
            value={addBlogCategory.title}
            onChange={(event) =>
              setAddBlogCategory({
                ...addBlogCategory,
                title: event.target.value,
              })
            }
          />
          <TextField
            label="Mô tả"
            name="describe"
            size="small"
            value={addBlogCategory.describe}
            onChange={(event) =>
              setAddBlogCategory({
                ...addBlogCategory,
                describe: event.target.value,
              })
            }
          />
          <input type="file" accept="image/*" onChange={handleFileChange} />
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
