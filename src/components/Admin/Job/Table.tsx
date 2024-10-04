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
import {
  deleteJob,
  getJobAll,
  updateJob,
} from "../../../redux/actions/jobActions";
import { IJobData } from "../../../redux/reducers/job";

export default function TableComponent() {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IJobData | null>(null);
  const jobState = useAppSelector((state) => state.job);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getJobAll());
  }, []);
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleAcceptDelete = () => {
    if (selectedUser) {
      dispatch(deleteJob(selectedUser.id as number));
    }
    setSelectedUser(null);
    setOpenDelete(false);
  };
  const handleDeleteUser = (job: IJobData) => {
    setSelectedUser(job);
    setOpenDelete(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleAcceptEdit = (job: IJobData) => {
    dispatch(updateJob(job));
    setSelectedUser(null);
    setOpenEdit(false);
  };

  const handleEditUser = (job: IJobData) => {
    setSelectedUser(job);
    setOpenEdit(true);
  };
  return (
    <div>
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">STT</TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell align="left">Nội dung bài viết</TableCell>
                <TableCell align="left">Ngày đăng</TableCell>
                <TableCell align="left">Người đăng</TableCell>
                <TableCell align="center">Hành động</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {jobState.jobDataList.map((job: IJobData, index: number) => (
                <TableRow key={index}>
                  <TableCell align="center">{job.id}</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="left">{job.content}</TableCell>
                  <TableCell align="left">
                    {" "}
                    {new Date(job.createdAt).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </TableCell>
                  <TableCell align="left">
                    {" "}
                    {job.userData ? `${job.userData.lastName}` : "Ẩn danh"}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEditUser(job)}>
                        <Edit color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDeleteUser(job)}>
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
          jobData={selectedUser}
        />
      </>
    </div>
  );
}
