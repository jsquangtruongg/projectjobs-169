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
    Education: "",
    Grade: "",
    positions_needed: "",
    work_type: "",
    experience: "",
    location: "",
    createdAt: "",
    updatedAt: "",
    jobCategory_id: 1,
    like_count: 0,
    userData: {
      id: 2,
      avatar: "",
      email: "",
      firstName: "",
      lastName: "",
    },
    categoryData: {
      id: 1,
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
