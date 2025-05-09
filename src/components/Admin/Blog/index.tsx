import { Box } from "@mui/material";
import FilterComponent from "./Filter";
import TableComponent from "./Table";
import { useState } from "react";
import { IBlogData } from "../../../redux/reducers/blog";

export default function BlogComponent() {
  const [searchCriteria, setSearchCriteria] = useState<IBlogData>({
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

  const handleSearch = (criteria: IBlogData) => {
    setSearchCriteria(criteria);
  };
  // lỗi
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <FilterComponent handleAccept={handleSearch} userData={searchCriteria} />
      <TableComponent searchCriteria={searchCriteria}  />
    </Box>
  );
}
