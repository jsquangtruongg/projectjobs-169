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
import "react-quill/dist/quill.snow.css";
import ReactQuill, { Quill } from "react-quill";
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
  const [theme] = useState<string>("snow");
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
    props.handleAccept(blog);
    props.handleClose();
  };
  const handleEditorChange = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const images = doc.querySelectorAll("img");
    images.forEach((img) => {
      img.classList.add("resizable-img"); // Áp dụng class cho hình ảnh
    });
    setBlog((prevData) => (prevData ? { ...prevData, content: html } : null));
  };
  const lineHeights = [
    { value: "1", label: "1" },
    { value: "1.5", label: "1.5" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ];
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
          <ReactQuill
            theme={theme}
            value={blog?.content || ""}
            onChange={handleEditorChange}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                [{ align: [] }],
                [{ lineHeight: lineHeights }],
                ["link", "image", "video"],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "indent",
              "link",
              "image",
              "video",
              "align",
              "lineHeight",
            ]}
            bounds={"#root"}
            placeholder="Nội dung bài viết..."
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
  const [editorHtml, setEditorHtml] = useState<string>("");
  const [theme] = useState<string>("snow");
  const [addBlog, setAddBlog] = useState<IBlogData>({
    id: 3,
    title: "",
    content: "",
    img: "",
    user_id: 2,
    salary: "",
    blog_category_id: 4,
    createdAt: new Date().toISOString().split("T")[0],
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

  const createBlogWrapper = (blogData: IBlogData, file: File | null) => {
    return postCreateBlog(blogData, file as File);
  };
  const handleAccepts = async () => {
    if (!addBlog) return;
    await dispatch(createBlogWrapper(addBlog, file));
    props.handleClose();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };
  const handleQuillChange = (html: string) => {
    setAddBlog((prevData) => ({
      ...prevData,
      content: html,
    }));
  };
  const handleEditorChange = (html: string) => {
    setEditorHtml(html);
    handleQuillChange(html);
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
            value={addBlog?.title}
            label="Tên bài viết"
            name="title"
            size="small"
            onChange={(event) =>
              setAddBlog({ ...addBlog, title: event.target.value })
            }
          />

          <TextField
            value={addBlog?.id}
            label="ID"
            name="id"
            size="small"
            onChange={(event) =>
              setAddBlog({ ...addBlog, id: parseInt(event.target.value) })
            }
          />

          <ReactQuill
            theme={theme}
            value={editorHtml}
            onChange={handleEditorChange}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                [{ align: [] }],
                ["link", "image", "video"],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "indent",
              "link",
              "image",
              "video",
              "align",
            ]}
            bounds={"#root"}
            placeholder="Nội dung bài viết..."
          />
          <input type="file" accept="image/*" onChange={handleFileChange} />
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
            value={addBlog?.createdAt.split("T")[0]}
            label="Ngày tạo"
            name="createdAt"
            type="date"
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
