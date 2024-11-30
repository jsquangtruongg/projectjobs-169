import { Box, Input } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import { useEffect, useState } from "react";
import { AddDialog } from "./Dialog";
import { IBlogCategoryData } from "../../../redux/reducers/blogCategory";

export interface IFilterComponentProps {
  blogData: IBlogCategoryData;
  handleAccept: (SearchCriteria: IBlogCategoryData) => void;
}

export default function FilterComponent(props: IFilterComponentProps) {
  const ariaLabel = { "aria-label": "description" };
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [searchBlogCategory, setSearchBlogCategory] =
    useState<IBlogCategoryData>({
      id: 1,
      title: "",
      img: "",
      describe: "",
      user_id: 1,
      createdAt: "",
      updatedAt: "",
      userData: {
        email: "",
        firstName: "",
        lastName: "",
        id: 1,
      },
      blogData: {
        id: 1,
        content: "",
        title: "",
      },
    });
  const handleOpenAddDialog = () => {
    setAddDialogOpen(true);
  };

  useEffect(() => {
    if (props.blogData) {
      setSearchBlogCategory(props.blogData);
    }
  }, [props.blogData]);
  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
  };
  const handleAccepts = () => {
    if (!searchBlogCategory) return;
    props.handleAccept(searchBlogCategory);
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
          value={searchBlogCategory.title}
          onChange={(event) =>
            setSearchBlogCategory({
              ...searchBlogCategory,
              title: event.target.value,
            })
          }
        />
        <Input
          placeholder="Tiêu đề"
          inputProps={ariaLabel}
          value={searchBlogCategory.describe}
          onChange={(event) =>
            setSearchBlogCategory({
              ...searchBlogCategory,
              describe: event.target.value,
            })
          }
        />
        <Input
          placeholder="Người đăng"
          inputProps={ariaLabel}
          value={searchBlogCategory.userData.lastName}
          onChange={(event) =>
            setSearchBlogCategory({
              ...searchBlogCategory,
              userData: {
                ...searchBlogCategory.userData,
                lastName: event.target.value,
              },
            })
          }
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
