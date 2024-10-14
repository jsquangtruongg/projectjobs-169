import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Box, TextField } from "@mui/material";
import ReactQuill from "react-quill";
import { useState } from "react";
import { IUserData } from "../../../redux/reducers/user";

export type DialogProps = {
  open?: boolean;
  handleClose: () => void;
  handleAccept: () => void;
};
export default function AlertDialog(props: DialogProps) {
  const [addProfile, setAddProFile] = useState<IUserData>();

  const handleQuillChange = (value: string) => {
    setAddProFile((prevData) => ({
      ...prevData,
      content: value,
    }));
  };
  return (
    <Dialog
      open={props.open ?? false}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
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
          <input type="file" accept="image/*" />
          <ReactQuill
            value=""
            onChange={handleQuillChange}
            placeholder="Nội dung mô tả..."
          />
          <TextField label="" name="createdAt" size="small" type="date" />
          <TextField label="Họ và tên" name="user_id" size="small" />
          <TextField label="Email" name="JobCategory_id" size="small" />

          <TextField label="Trình độ học vấn" name="lastName" size="small" />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Hủy</Button>
        <Button onClick={props.handleAccept}>Lưu</Button>
      </DialogActions>
    </Dialog>
  );
}
