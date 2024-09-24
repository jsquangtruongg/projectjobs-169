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
  handleClose: () => void;
  handleAccept: () => void;
};
export const EditDialog = (props: IEditDialogProps) => {
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
          <TextField label="Họ" defaultValue={""} size="small" />
          <TextField label="Tên" defaultValue={""} size="small" />
          <TextField label="Email" defaultValue={""} size="small" />
          <TextField label="Vai trò" defaultValue={""} size="small" />
        </Box>
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
