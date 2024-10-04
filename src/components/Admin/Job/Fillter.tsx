import { Box, Input } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import { useEffect, useState } from "react";

import { AddDialog } from "./Dialog";
export interface IFilterComponentProps {}

export default function FilterComponent(props: IFilterComponentProps) {
  const ariaLabel = { "aria-label": "description" };
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);

  const handleOpenAddDialog = () => {
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
  };

  const handleAcceptAddDialog = () => {
    setAddDialogOpen(false);
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1 } }}
        noValidate
        autoComplete="off"
      >
        <Input placeholder="Tên bài viết" inputProps={ariaLabel} />
        <Input placeholder="Tiêu đề" inputProps={ariaLabel} />
        <Input placeholder="Người đăng" inputProps={ariaLabel} />
      </Box>
      <Box>
        <Button variant="contained" onClick={handleOpenAddDialog}>
          Thêm mới
          <AddIcon />
        </Button>
        <AddDialog
          open={isAddDialogOpen}
          handleClose={handleCloseAddDialog}
          handleAccept={handleAcceptAddDialog}
        />
      </Box>

      <Box>
        <Button variant="contained">Tìm kiếm</Button>
      </Box>
    </div>
  );
}
