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
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { createJob } from "../../../redux/actions/jobActions";

import "react-quill/dist/quill.snow.css";
import ReactQuill, { Quill } from "react-quill";

import "./style.scss";
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
  const [theme] = useState<string>("snow");
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

  const handleEditorChange = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const images = doc.querySelectorAll("img");
    images.forEach((img) => {
      img.classList.add("resizable-img"); // Áp dụng class cho hình ảnh
    });
    setJob((prevData) => (prevData ? { ...prevData, content: html } : null));
  };
  const lineHeights = [
    { value: "1", label: "1" },
    { value: "1.5", label: "1.5" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ];
  const handleLineHeightChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const lineHeight = event.target.value;
    const quill = document.querySelector(".ql-editor") as HTMLElement;
    if (quill) {
      quill.style.lineHeight = lineHeight;
    }
  };
  return (
    <Dialog
      open={props.open ?? false}
      onClose={props.handleClose}
      aria-labelledby="responsive-dialog-title"
      maxWidth="md"
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
          <div id="toolbar">
            <select
              className="ql-line-height"
              onChange={handleLineHeightChange}
            >
              <option value="">Line Height</option>
              {lineHeights.map((height) => (
                <option key={height.value} value={height.value}>
                  {height.label}
                </option>
              ))}
            </select>
          </div>
          <ReactQuill
            theme={theme}
            value={job?.content || ""}
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
            label="Ngày đăng"
            name="createdAt"
            size="small"
            value={
              job?.createdAt
                ? new Date(job.createdAt).toLocaleDateString("en-GB")
                : ""
            }
            onChange={handleChange}
          />
          <TextField
            label="Người đăng"
            name="lastName"
            size="small"
            value={job?.userData.lastName}
            onChange={handleChange}
          />
          <TextField
            label="Lương"
            name="salary"
            size="small"
            value={job?.salary}
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
  const [editorHtml, setEditorHtml] = useState<string>("");
  const [theme] = useState<string>("snow");
  const currentUser = useAppSelector((state) => state.user.userData?.id);
  const [addJob, setAddJob] = useState<IJobData>({
    id: 3,
    title: "",
    content: "",
    img: "",
    user_id: currentUser || 1,
    JobCategory_id: 3,
    salary: "",

    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: "",
    userData: {
      id: 2,
      avatar: null,
      firstName: "",
      lastName: "",
      email: "",
    },
    categoryData: {
      title: "",
      describe: "",
    },
  });
  const dispatch = useAppDispatch();

  const createJobWrapper = (jobData: IJobData, file: File | null) => {
    return createJob(jobData, file as File);
  };
  const handleAccepts = async () => {
    if (!addJob) return;
    const salaryFormatted = addJob.salary.trim();
    setAddJob((prev) => ({ ...prev, salary: salaryFormatted }));

    await dispatch(createJobWrapper(addJob, file));
    props.handleClose();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValue = name === "salary" ? value : value;
    setAddJob((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleQuillChange = (html: string) => {
    setAddJob((prevData) => ({
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
            value={addJob?.title}
            label="Tên bài viết"
            name="title"
            size="small"
            onChange={(event) =>
              setAddJob({ ...addJob, title: event.target.value })
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
            label="Ngày tạo"
            name="createdAt"
            size="small"
            type="date"
            value={addJob.createdAt.split("T")[0]}
            onChange={handleChange}
          />
          <TextField
            label="Lương"
            name="salary"
            size="small"
            value={addJob.salary}
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
