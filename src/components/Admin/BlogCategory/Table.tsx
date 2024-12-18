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
  deleteBlogCategory,
  getBlogCategory,
  putUpdateBlogCategory,
} from "../../../redux/actions/blogCategoryAction";
import { IBlogCategoryData } from "../../../redux/reducers/blogCategory";
interface ITableComponentProps {
  searchCriteria: IBlogCategoryData;
}
export default function TableComponent({ searchCriteria }: ITableComponentProps) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IBlogCategoryData | null>(
    null
  );
  const dispatch = useAppDispatch();
  const blogState = useAppSelector((state) => state.blogCategory);
  useEffect(() => {
    dispatch(getBlogCategory());
  }, []);
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleAcceptDelete = () => {
    if (selectedUser) {
      dispatch(deleteBlogCategory(selectedUser.id as number));
    }
    setSelectedUser(null);
    setOpenDelete(false);
  };
  const handleDeleteUser = (blog: IBlogCategoryData) => {
    setSelectedUser(blog);
    setOpenDelete(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleAcceptEdit = (blog: IBlogCategoryData) => {
    dispatch(putUpdateBlogCategory(blog));
    console.log(blog);
    setSelectedUser(null);
    setOpenEdit(false);
  };

  const handleEditUser = (blog: IBlogCategoryData) => {
    setSelectedUser(blog);
    setOpenEdit(true);
  };

    useEffect(() => {
      if (
        searchCriteria.title ||
        searchCriteria.describe ||
        searchCriteria.userData.lastName
      ) {
        dispatch(
          getBlogCategory(
            searchCriteria.title,
            searchCriteria.describe,
            searchCriteria.userData.lastName
          )
        );
      }
    }, [dispatch, searchCriteria]);
  return (
    <div>
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">STT</TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell align="left">Tên bài viết</TableCell>
                <TableCell align="left">Tiêu đề</TableCell>
                <TableCell align="left">Người đăng</TableCell>
                <TableCell align="center">Hành động</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {blogState.blogCategoryDataList.map(
                (blog: IBlogCategoryData, index: number) => (
                  <TableRow key={index}>
                    <TableCell align="center">{blog.id}</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="left">{blog.title}</TableCell>
                    <TableCell align="left">{blog.describe}</TableCell>
                    <TableCell align="left">
                      {" "}
                      {blog.userData ? `${blog.userData.lastName}` : "Ẩn danh"}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleEditUser(blog)}>
                          <Edit color="primary" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDeleteUser(blog)}>
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
          blogCategoryData={selectedUser}
        />
      </>
    </div>
  );
}
