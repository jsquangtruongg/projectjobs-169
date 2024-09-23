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

export default function TableComponent() {
  return (
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
          <TableRow>
            <TableCell align="center">1</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="left">Nguyen</TableCell>
            <TableCell align="left">Trương</TableCell>
            <TableCell align="left">Admin</TableCell>
            <TableCell align="center">
              <Tooltip title="Edit">
                <IconButton>
                  <Edit color="primary" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton>
                  <Delete color="error" />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
