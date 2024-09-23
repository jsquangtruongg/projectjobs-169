import { Box, Input } from "@mui/material";

export interface IFilterComponentProps {}

export default function FilterComponent(props: IFilterComponentProps) {
  const ariaLabel = { "aria-label": "description" };
  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1 } }}
      noValidate
      autoComplete="off"
    >
      <Input placeholder="First name" inputProps={ariaLabel} />
      <Input placeholder="Last name" inputProps={ariaLabel} />
      <Input placeholder="Role" inputProps={ariaLabel} />
    </Box>
  );
}
