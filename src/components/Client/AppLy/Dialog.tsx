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
export type IEditDialogProps = {
  open?: boolean;
  title?: string;
  handleClose: () => void;
  itemApply: IApplyData | null;
};
export const FroFile = (props: IEditDialogProps) => {
  const currentUser = props.itemApply?.id || "";
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
            overflowY: "auto", // Cho phép cuộn theo chiều dọc
            maxHeight: "100vh", // Đặt chiều cao tối đa cho dialog
          },
          "& .MuiDialog-paperWidthSm": {
            width: "1000px !important", // Chiều rộng tối đa cho dialog nhỏ
            maxWidth: "none", // Vô hiệu hóa maxWidth mặc định
          },
          "& .MuiDialogContent-root": {
            overflowY: "clip",
          },
        }}
      >
        <div className="item">
          <DialogTitle
            style={{ textAlign: "center" }}
            id="responsive-dialog-title"
          >
            Thông tin tuyển dụng
          </DialogTitle>
          <DialogContent
            sx={{
              height: "1000px", // Xóa hoặc đặt height là auto cho DialogContent
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
                        src={props.itemApply.userData.avatar as string}
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
                        <p>{props.itemApply.fullName}</p>
                      </div>
                      <div className="text_name">
                        <p className="full_name">Email:</p>
                        <p>{props.itemApply.email}</p>
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
                        <p>{props.itemApply.phone}</p>
                      </div>
                    </div>

                    <div>
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
                        <img src={CV} alt="" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* {proFileState?.applyDataList.map(
                (proFile: IApplyData, index: number) => (
                 
                )
              )} */}
            </Box>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export type BrowseDialogProps = {
  open?: boolean;
  title?: string;
  handleClose: () => void;
  handleAccept: () => void;
};
export const BrowseDialog = (props: BrowseDialogProps) => {
  return (
    <Dialog
      open={props.open ?? false}
      onClose={props.handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Xác nhận</DialogTitle>
      <DialogContent>
        <DialogContentText>Bạn có muốn duyệt CV không</DialogContentText>
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
