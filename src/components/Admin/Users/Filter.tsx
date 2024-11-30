import { Box, Button, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { IUserData } from "../../../redux/reducers/user";

export interface IFilterComponentProps {
  userData: IUserData;
  handleAccept: (searchCriteria: IUserData) => void;
}

export default function FilterComponent(props: IFilterComponentProps) {
  const [searchUser, setSearchUser] = useState<IUserData>({
    firstName: "",
    lastName: "",
    role_code: "",
  });

  useEffect(() => {
    if (props.userData) {
      setSearchUser(props.userData);
    }
  }, [props.userData]);

  const handleAccepts = () => {
    if (!searchUser) return;
    props.handleAccept(searchUser);
  };

  const ariaLabel = { "aria-label": "description" };

  return (
    <div style={{ display: "flex" }}>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1 } }}
        noValidate
        autoComplete="off"
      >
        <Input
          placeholder="First name"
          inputProps={ariaLabel}
          value={searchUser.firstName}
          onChange={(event) =>
            setSearchUser({ ...searchUser, firstName: event.target.value })
          }
        />
        <Input
          placeholder="Last name"
          inputProps={ariaLabel}
          value={searchUser.lastName}
          onChange={(event) =>
            setSearchUser({ ...searchUser, lastName: event.target.value })
          }
        />
        <Input
          placeholder="Role"
          inputProps={ariaLabel}
          value={searchUser.role_code}
          onChange={(event) =>
            setSearchUser({ ...searchUser, role_code: event.target.value })
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
