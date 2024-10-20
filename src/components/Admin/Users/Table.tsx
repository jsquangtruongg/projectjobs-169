import { Delete, Edit } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  deleteUser,
  getUserAll,
  putUpdateUser,
} from "../../../redux/actions/userAction";
import { IUserData } from "../../../redux/reducers/user";
import { DeleteDialog, EditDialog } from "./Dialog";

interface ITableComponentProps {
  searchCriteria: IUserData;
}

export default function TableComponent({
  searchCriteria,
}: ITableComponentProps) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUserData | null>(null);

  const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // Hàm đóng Dialog Delete
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  // Hàm xử lý xóa người dùng
  const handleAcceptDelete = () => {
    if (selectedUser) {
      dispatch(deleteUser(selectedUser.id as number));
    }
    setOpenDelete(false);
    setSelectedUser(null);
  };

  // Hàm mở Dialog Delete
  const handleDeleteUser = (user: IUserData) => {
    setSelectedUser(user);
    setOpenDelete(true);
  };

  // Hàm đóng Dialog Edit
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  // Hàm xử lý cập nhật người dùng
  const handleAcceptEdit = (user: IUserData , file:File) => {
    dispatch(putUpdateUser(user ,file));
    setSelectedUser(null);
    setOpenEdit(false);
  };

  // Hàm mở Dialog Edit
  const handleEditUser = (user: IUserData) => {
    setSelectedUser(user);
    setOpenEdit(true);
  };

  useEffect(() => {
    dispatch(getUserAll());
  }, [dispatch]);
useEffect(() => {
  if (
    searchCriteria.firstName ||
    searchCriteria.lastName ||
    searchCriteria.role_code
  ) {
    dispatch(
      getUserAll(
        searchCriteria.firstName,
        searchCriteria.lastName,
        searchCriteria.role_code
      )
    );
  }
}, [dispatch, searchCriteria]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">STT</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell align="left">Họ</TableCell>
              <TableCell align="left">Tên</TableCell>
              <TableCell align="left">Vai trò</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {userState.userDataList.map((user: IUserData, index: number) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="right">{/* Thêm avatar nếu có */}</TableCell>
                <TableCell align="left">{user.firstName}</TableCell>
                <TableCell align="left">{user.lastName}</TableCell>
                <TableCell align="left">{user.role_code}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Chỉnh sửa">
                    <IconButton onClick={() => handleEditUser(user)}>
                      <Edit color="primary" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Xóa">
                    <IconButton onClick={() => handleDeleteUser(user)}>
                      <Delete color="error" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog xóa */}
      <DeleteDialog
        open={openDelete}
        handleClose={handleCloseDelete}
        handleAccept={handleAcceptDelete}
      />

      {/* Dialog chỉnh sửa */}
      <EditDialog
        open={openEdit}
        handleClose={handleCloseEdit}
        handleAccept={handleAcceptEdit}
        userData={selectedUser}
      />
    </>
  );
}
