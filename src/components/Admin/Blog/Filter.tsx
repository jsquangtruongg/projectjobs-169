import { Box, Input } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import { useEffect, useState } from "react";

import { AddDialog } from "./Dialog";
import { IBlogData } from "../../../redux/reducers/blog";

export interface IFilterComponentProps {
  userData: IBlogData;
  handleAccept: (SearchCriteria: IBlogData) => void;
}

export default function FilterComponent(props: IFilterComponentProps) {
  const ariaLabel = { "aria-label": "description" };
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [searchBlog, setSearchBlog] = useState<IBlogData>({
    id: 3,
    title: "",
    content: "",
    img: "",
    user_id: 2,
    salary: "",
    blog_category_id: 2,
    createdAt: "",
    updatedAt: "",
    userData: {
      email: "",
      firstName: "",
      lastName: "",
      id: 1,
    },
    categoryData: {
      describe: "",
      title: "",
    },
  });
  useEffect(() => {
    if (props.userData) {
      setSearchBlog(props.userData);
    }
  }, [props.userData]);
  const handleAccepts = () => {
    if (!searchBlog) return;
    props.handleAccept(searchBlog);
  };
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
        <Input
          placeholder="Tên bài viết"
          inputProps={ariaLabel}
          value={searchBlog.title}
          onChange={(event) =>
            setSearchBlog({ ...searchBlog, title: event.target.value })
          }
        />
        <Input
          placeholder="Tiêu đề"
          inputProps={ariaLabel}
          value={searchBlog.content}
          onChange={(event) =>
            setSearchBlog({ ...searchBlog, content: event.target.value })
          }
        />
        <Input
          placeholder="Người đăng"
          inputProps={ariaLabel}
          value={searchBlog.userData.lastName}
          onChange={(event) =>
            setSearchBlog({
              ...searchBlog,
              userData: {
                ...searchBlog.userData,
                lastName: event.target.value,
              },
            })
          }
        />
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
        <Button variant="contained" onClick={handleAccepts}>
          Tìm kiếm
        </Button>
      </Box>
    </div>
  );
}
