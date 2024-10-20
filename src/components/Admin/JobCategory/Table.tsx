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

import { DeleteDialog, EditDialog } from "./Dialog";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { IJobCategoryData } from "../../../redux/reducers/jobCategory";
import {
  deleteJobCategory,
  getJobALLCategory,
  updateJobCategory,
} from "../../../redux/actions/jobCategoryActions";
interface ITableComponentProps {}

export default function TableComponent({}: ITableComponentProps) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectJobCategory, setSelectJobCategory] =
    useState<IJobCategoryData | null>(null);
  const dispatch = useAppDispatch();
  const jobState = useAppSelector((state) => state.jobCategory);

  useEffect(() => {
    dispatch(getJobALLCategory());
  }, []);
  // Hàm đóng Dialog Delete
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  // Hàm xử lý xóa người dùng
  const handleAcceptDelete = () => {
    if (selectJobCategory) {
      dispatch(deleteJobCategory(selectJobCategory.id as number));
    }
    setSelectJobCategory(null);
    setOpenDelete(false);
  };

  // Hàm mở Dialog Delete
  const handleDeleteUser = (jobCategory: IJobCategoryData) => {
    setSelectJobCategory(jobCategory);
    setOpenDelete(true);
  };

  // Hàm đóng Dialog Edit
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  // Hàm xử lý cập nhật người dùng
  const handleAcceptEdit = (jobCategory: IJobCategoryData) => {
    dispatch(updateJobCategory(jobCategory));
    setOpenEdit(false);
  };

  // Hàm mở Dialog Edit
  const handleEditUser = (jobCategory: IJobCategoryData) => {
    setSelectJobCategory(jobCategory);
    setOpenEdit(true);
  };

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
            {jobState.jobCategoryDataList.map(
              (jobCategory: IJobCategoryData, index: number) => (
                <TableRow key={index}>
                  <TableCell align="center">{jobCategory.id}</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="left">{jobCategory.title}</TableCell>
                  <TableCell align="left">
                    {jobCategory.userData.lastName}
                  </TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="center">
                    <Tooltip title="Chỉnh sửa">
                      <IconButton onClick={() => handleEditUser(jobCategory)}>
                        <Edit color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <IconButton onClick={() => handleDeleteUser(jobCategory)}>
                        <Delete color="error" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              )
            )}
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
        jobCategoryData={selectJobCategory}
      />
    </>
  );
}
