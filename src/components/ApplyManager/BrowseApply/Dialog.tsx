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
import "./style.scss";
import avatar from "../../../assets/images/avatar.jpg";
import CV from "../../../assets/images/CV.png";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { getAllApply } from "../../../redux/actions/applyAction";
import { IApplyData } from "../../../redux/reducers/apply";
import ReactQuill from "react-quill";
import { createApplyMember } from "../../../redux/actions/applyMemberAction";
import { IApplyMemberData } from "../../../redux/reducers/applyMember";
import { IDeleteApplyData } from "../../../redux/reducers/deleteApply";
export type IEditDialogProps = {
  open?: boolean;
  title?: string;
  handleClose: () => void;
  itemApply: IApplyMemberData | null;
};
export const FroFile = (props: IEditDialogProps) => {
  const proFileState = useAppSelector((state) => state.apply);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllApply());
  }, []);
  return (
    <div className="form-item">
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
            display: "flex",
            flexDirection: "column",
          },
          "& .MuiDialog-paperWidthSm": {
            width: "900px !important",
            maxWidth: "none",
          },
          "& .MuiDialogContent-root": {
            overflowY: "clip",
          },
        }}
      >
        <div className="item">
          <DialogTitle
            style={{
              textAlign: "center",
              fontFamily: `"Times New Roman", Times, serif`,
              fontWeight: "600",
              color: "#00b14f",
              position: "sticky",
              top: 0,
              backgroundColor: "#f2f4f5",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
              zIndex: 10,
            }}
            id="responsive-dialog-title"
          >
            Thông Tin Tuyển Dụng
          </DialogTitle>
          <DialogContent
            sx={{
              height: "1000px",
              flex: "1 1 auto",
              overflowY: "auto",
              padding: "10px",
            }}
          >
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
              <div>
                {props.itemApply && (
                  <div>
                    <div className="from-CV">
                      <img
                        src={props.itemApply.userApply.avatar as string}
                        alt="avatar"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="text_name">
                        <p className="full_name">Họ và tên:</p>
                        <p>{props.itemApply.Applies.fullName}</p>
                      </div>
                      <div className="text_name">
                        <p className="full_name">Email:</p>
                        <p>{props.itemApply.Applies.email}</p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="text_name">
                        <p className="full_name">Số điện thoại:</p>
                        <p>{props.itemApply.Applies.phone}</p>
                      </div>
                    </div>

                    <div style={{ marginBottom: "40px" }}>
                      <p
                        style={{
                          marginTop: "30px",
                          fontWeight: "600",
                          fontSize: "16px",
                        }}
                      >
                        CV xin việc:
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "10px",
                        }}
                      >
                        <img
                          src={props.itemApply.Applies.img as string  }
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Box>
          </DialogContent>
        </div>
        <DialogTitle
          style={{
            textAlign: "center",
            fontFamily: `"Times New Roman", Times, serif`,
            fontWeight: "600",
            color: "#00b14f",
            position: "sticky",
            bottom: 0, // Đặt cố định ở dưới
            backgroundColor: "#f2f4f5",
            boxShadow: "0px -4px 12px rgba(0, 0, 0, 0.2)", // Bóng đổ phía trên
            zIndex: 10,
          }}
          id="responsive-dialog-title"
        >
          Chúc Bạn Sớm Tìm Được Người Phù Hợp Với Mình Nhé!!!
        </DialogTitle>
      </Dialog>
    </div>
  );
};

export type BrowseDialogProps = {
  open?: boolean;
  title?: string;
  handleClose: () => void;
  handleAccept: () => void;
  ItemApply: IApplyMemberData | null;
};
export const BrowseDialog = (props: BrowseDialogProps) => {
  const currentUser = props.ItemApply?.userData.id || "";
  const currentJob = props.ItemApply?.job_id || "";
  const currentApply = props.ItemApply?.id || "";
  const currentUserApply = props.ItemApply?.userApply.id || "";
  const [addApplyMember, setAddApplyMember] = useState<IApplyMemberData>({
    id: 1,
    content: "",
    createdAt: "",
    updatedAt: "",
    user_id: 1,
    job_id: currentJob,
    apply_id: currentApply,
    userApply_id: currentUserApply,
    userData: {
      id: currentUser,
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
    Applies: {
      id: 1,
      fullName: "",
      email: "",
      phone: "",
      img: "",
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
    setAddApplyMember({
      ...addApplyMember,
      apply_id: currentApply,
      userApply_id: currentUserApply,
      job_id: currentJob,
      user_id: currentUser,
    });
  }, [currentApply, currentUser, currentJob]);
  const dispatch = useAppDispatch();

  const handleAccepts = async () => {
    if (!addApplyMember) return;
    await dispatch(createApplyMember(addApplyMember));

    props.handleClose();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddApplyMember((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleQuillChange = (value: string) => {
    setAddApplyMember((prevData) => ({ ...prevData, content: value }));
  };

  const [theme] = useState<string>("snow");

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
        Gửi phản hồi cho thí sinh
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
          <ReactQuill
            theme={theme}
            value={addApplyMember.content}
            onChange={handleQuillChange}
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
            label="apply_id"
            name="apply_id"
            size="small"
            value={addApplyMember.apply_id}
            onChange={handleChange}
          />
          <TextField
            label="user_id"
            name="user_id"
            size="small"
            value={addApplyMember.user_id}
            onChange={handleChange}
          />
          <TextField
            label="job_id"
            name="job_id"
            size="small"
            value={addApplyMember.job_id}
            onChange={handleChange}
          />
          <TextField
            label="userApply_id"
            name="userApply_id"
            size="small"
            value={addApplyMember.userApply_id}
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

export type RefuseDialogProps = {
  open?: boolean;
  title?: string;
  handleClose: () => void;
  handleAccept: () => void;
};
export const RefuseDialog = (props: RefuseDialogProps) => {
  return (
    <Dialog
      open={props.open ?? false}
      onClose={props.handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Xác nhận</DialogTitle>
      <DialogContent>
        <DialogContentText>Bạn muốn từ chối CV</DialogContentText>
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
