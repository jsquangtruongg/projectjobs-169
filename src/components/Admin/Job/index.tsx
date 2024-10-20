import { Box } from "@mui/material";
import FilterComponent from "./Fillter";
import TableComponent from "./Table";
import { IJobData } from "../../../redux/reducers/job";
import { useState } from "react";

export default function JobComponent() {
  const [searchCriteria, setSearchCriteria] = useState<IJobData>({
    id: 3,
    content: "",
    img: "",
    user_id: 2,
    salary: "",
    title: "",
    createdAt: "",
    updatedAt: "",
    JobCategory_id: 1,
    userData: {
      id: 2,
      avatar: null,
      email: "",
      firstName: "",
      lastName: "",
    },
    categoryData: {
      title: "",
      describe: "",
    },
  });

  const handleSearch = (criteria: IJobData) => {
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
      <FilterComponent handleAccept={handleSearch} jobData={searchCriteria} />
      <TableComponent searchCriteria={searchCriteria} />
    </Box>
  );
}
