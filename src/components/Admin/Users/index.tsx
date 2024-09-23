import { Box } from "@mui/material";
import FilterComponent from "./Filter";
import TableComponent from "./Table";

export default function UserComponent() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <FilterComponent />
      <TableComponent />
    </Box>
  );
}
