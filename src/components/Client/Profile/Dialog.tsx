import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { IUserData } from "../../../redux/reducers/user";
import { useAppSelector } from "../../../redux/store";
import { motion } from "framer-motion";

import "./style.scss";
export type DialogProps = {
  open?: boolean;
  title?: string;
  userData: IUserData | null;
  handleAccept: (user: IUserData, file: File | null) => void;
  handleClose: () => void;
};

export default function AlertDialog(props: DialogProps) {
  const [user, setUser] = useState<IUserData | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const userState = useAppSelector((state) => state.user);

  const container = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newValue = name === "field" ? String(value) : value;

    console.log(`Trường: ${name}, Giá trị: ${newValue}`);

    setUser((prevData) => {
      if (!prevData) return prevData;
      const updatedUser = { ...prevData, [name]: newValue };
      console.log("Sau khi cập nhật:", updatedUser);
      return updatedUser;
    });
  };

  const handleAccepts = () => {
    if (!user || (!file && !user.avatar)) {
      console.log("Dữ liệu chưa đầy đủ: user hoặc avatar");
      return;
    }

    console.log("Lưu dữ liệu: ", user, file);

    props.handleAccept(user, file);
    props.handleClose();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setUser((prev) => (prev ? { ...prev, avatar: previewUrl } : prev));
    }
  };

  useEffect(() => {
    if (
      props.userData &&
      JSON.stringify(props.userData) !== JSON.stringify(user)
    ) {
      setUser(props.userData);
    }
  }, [props.userData]);
  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const { width, height, left, top } =
      e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    e.currentTarget.style.transform = `scale(1.08) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLImageElement>) => {
    e.currentTarget.style.transform = "scale(1) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <Dialog
      open={props.open ?? false}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
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
          width: "1200px !important",
          maxWidth: "none",
        },
        "& .MuiDialogContent-root": {
          overflowY: "clip",
        },
      }}
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
          <motion.label
            htmlFor="upload-avatar"
            className="from-avt-profile"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.img
              variants={item}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              src={user?.avatar || ""}
              alt="Avatar"
              className="img-profile"
              style={{}}
            />
          </motion.label>
          <div className="header-main">
            <input
              className="item-enter"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <motion.div
              className="from-input-profile"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <TextField
                onChange={handleChange}
                value={user?.lastName || ""}
                label="Họ và tên"
                name="lastName"
                size="small"
              />
              <TextField
                label="Học Vấn"
                name="education_levels"
                size="small"
                onChange={handleChange}
                value={user?.education_levels || ""}
              />
            </motion.div>
            <motion.div
              className="from-input-profile"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <TextField
                label="Email"
                name="email"
                size="small"
                onChange={handleChange}
                value={user?.email || ""}
              />
              <TextField
                label="Mô tả"
                name="description"
                size="small"
                onChange={handleChange}
                value={user?.description || ""}
              />
            </motion.div>

            {userState.userData &&
              (userState.userData.roleData?.id === 1 ||
                userState.userData.roleData?.id === 2) && (
                <>
                  <motion.div
                    className="from-input-profile"
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    <TextField
                      label="Quy Mô"
                      name="scale"
                      size="small"
                      onChange={handleChange}
                      value={user?.scale || ""}
                    />

                    <TextField
                      label="Địa Chỉ"
                      name="address"
                      size="small"
                      onChange={handleChange}
                      value={user?.address || ""}
                    />
                  </motion.div>

                  <motion.div
                    className="from-input-profile"
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    <TextField
                      label="Lĩnh Vực"
                      name="field"
                      size="small"
                      onChange={handleChange}
                      value={user?.field || ""}
                    />
                  </motion.div>
                </>
              )}
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Hủy</Button>
        <Button onClick={handleAccepts}>Lưu</Button>
      </DialogActions>
    </Dialog>
  );
}
