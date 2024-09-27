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

import { IUserData } from "../../../redux/reducers/user";
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
  userData: IUserData | null;
  handleClose: () => void;
  handleAccept: (user: IUserData) => void;
};
export const EditDialog = (props: IEditDialogProps) => {
  const [user, setUser] = useState<IUserData | null>(null);

  useEffect(() => {
    if (props.userData) {
      setUser(props.userData);
    }
  }, [props.userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAccepts = () => {
    if (!user) return;
    props.handleAccept(user);
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
            label="Họ"
            name="firstName"
            value={user?.firstName}
            onChange={handleChange}
            size="small"
          />
          <TextField
            label="Tên"
            name="lastName"
            value={user?.lastName}
            onChange={handleChange}
            size="small"
          />
          <TextField
            label="Vai trò"
            name="role_code"
            value={user?.role_code}
            onChange={handleChange}
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
