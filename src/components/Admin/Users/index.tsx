import { Box } from "@mui/material";
import { useState } from "react";
import FilterComponent from "./Filter";
import TableComponent from "./Table";
import { IUserData } from "../../../redux/reducers/user";

export default function UserComponent() {
  const [searchCriteria, setSearchCriteria] = useState<IUserData>({
    firstName: "",
    lastName: "",
    role_code: "",
  });

 
  const handleSearch = (criteria: IUserData) => {
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
      <FilterComponent handleAccept={handleSearch} userData={searchCriteria} />
      <TableComponent searchCriteria={searchCriteria} />
    </Box> 
  );
}
