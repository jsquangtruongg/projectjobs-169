import { Box } from "@mui/material";
import FilterComponent from "./Fillter";
import TableComponent from "./Table";
import { useState } from "react";
import { IBlogCategoryData } from "../../../redux/reducers/blogCategory";

export default function BlogCategoryComponent() {
  const [searchCriteria, setSearchCriteria] = useState<IBlogCategoryData>({
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
  const handleSearch = (criteria: IBlogCategoryData) => {
    setSearchCriteria(criteria);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <FilterComponent handleAccept={handleSearch} blogData={searchCriteria} />
      <TableComponent searchCriteria={searchCriteria} />
    </Box>
  );
}
