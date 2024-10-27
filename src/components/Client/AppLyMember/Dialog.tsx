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
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { IApplyMemberData } from "../../../redux/reducers/applyMember";
import { getAllApplyMember } from "../../../redux/actions/applyMemberAction";

export type IEditDialogProps = {
  open?: boolean;
  title?: string;
  handleClose: () => void;
  itemApply: IApplyMemberData | null;
};

export const FroFileFeedBack = (props: IEditDialogProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllApplyMember());
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
            width: "700px !important",
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
              color: "#fff",
              position: "sticky",
              top: 0,
              backgroundColor: "#00b14f",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
              zIndex: 10,
            }}
            id="responsive-dialog-title"
          >
            Phản Hồi Của Nhà Tuyển Dụng
          </DialogTitle>
          <DialogContent
            sx={{
              height: "1000px",
              flex: "1 1 auto", // Giúp phần nội dung chiếm khoảng trống còn lại
              overflowY: "auto", // Đảm bảo cuộn trong nội dung
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
                      <img src={avatar} alt="avatar" />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="text_name">
                        <p className="full_name">
                          Thông tin phản hồi từ nhà tuyển dụng:
                        </p>
                        <p
                          style={{
                            fontFamily: `"Times New Roman", Times, serif`,
                          }}
                          dangerouslySetInnerHTML={{
                            __html: props.itemApply.content || "",
                          }}
                        ></p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Box>
          </DialogContent>
        </div>
        <div className="style" />
        <div className="style" />
        <div className="style" />
        <div className="style" />
        <div className="style" />
        <div className="style" />
        <div className="style" />
        <div className="style" />
        <div className="style" />
        <div className="style" />
        <div className="style" />
        <div className="style" />
        <div className="style" />
        <div className="style" />
        <div className="style" />
        <div className="style" />
        <div className="style" />
        <div className="style" />
        <div className="style" />
        <div className="style" />
        <div className="style" />
        <DialogTitle
          style={{
            textAlign: "center",
            fontFamily: `"Times New Roman", Times, serif`,
            fontWeight: "600",
            color: "#fff",
            position: "sticky",
            bottom: 0, // Đặt cố định ở dưới
            backgroundColor: "#00b14f",
            boxShadow: "0px -4px 12px rgba(0, 0, 0, 0.2)", // Bóng đổ phía trên
            zIndex: 10,
          }}
          id="responsive-dialog-title"
        >
          Chúc Mừng Bạn Đã Trúng Tuyển
        </DialogTitle>
      </Dialog>
    </div>
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
