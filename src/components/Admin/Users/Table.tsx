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
import { DeleteDialog, EditDialog } from "./Dialog";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { getUserAll } from "../../../redux/actions/userAction";
import { IListUser } from "../../../redux/reducers/user";

export default function TableComponent() {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  // Delete
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleAcceptDelete = () => {
    //Gọi Dispatch để delete user
    setOpenDelete(false);
  };
  const handleDeleteUser = () => {
    setOpenDelete(true);
  };

  //Edit
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleAcceptEdit = () => {
    //Gọi Dispatch để delete user
    setOpenEdit(false);
  };
  const handleEditUser = () => {
    setOpenEdit(true);
  };
  useEffect(() => {
    dispatch(getUserAll());
  }, []);
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
            {userState.userDataList.map((user: IListUser, index: number) => (
              <TableRow key={index}>
                <TableCell align="center">{user.id}</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="left">{user.firstName}</TableCell>
                <TableCell align="left">{user.lastName}</TableCell>
                <TableCell align="left">{user.createdAt}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton onClick={handleEditUser}>
                      <Edit color="primary" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={handleDeleteUser}>
                      <Delete color="error" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Import */}
      <DeleteDialog
        open={openDelete}
        handleClose={handleCloseDelete}
        handleAccept={handleAcceptDelete}
      />

      <EditDialog
        open={openEdit}
        handleClose={handleCloseEdit}
        handleAccept={handleAcceptEdit}
      />
    </>
  );
}
