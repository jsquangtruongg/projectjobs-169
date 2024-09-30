import { Box } from "@mui/material";
import FilterComponent from "./Fillter";
import TableComponent from "./Table";

export default function BlogCategoryComponent() {
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
