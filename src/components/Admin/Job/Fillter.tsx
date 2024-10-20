import { Box, Input } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import { useEffect, useState } from "react";

import { AddDialog } from "./Dialog";
import { IJobData } from "../../../redux/reducers/job";
export interface IFilterComponentProps {
  jobData: IJobData;
  handleAccept: (searchCriteria: IJobData) => void;
}

export default function FilterComponent(props: IFilterComponentProps) {
  const ariaLabel = { "aria-label": "description" };
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [searchJob, setSearchJob] = useState<IJobData>({
    id: 3,
    content: "",
    img: "",
    user_id: 2,
    salary:"",
    title:"",
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
    categoryData:{
       title: "",
       describe: "",

    }
  });

  useEffect(() => {
    if (props.jobData) {
      setSearchJob(props.jobData);
    }
  }, [props.jobData]);
  const handleAccepts = () => {
    if (!searchJob) return;
    props.handleAccept(searchJob);
  };

  const handleOpenAddDialog = () => {
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
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
          value={searchJob.content}
          onChange={(event) =>
            setSearchJob({ ...searchJob, content: event.target.value })
          }
        />
        <Input
          placeholder="Tiêu đề"
          inputProps={ariaLabel}
          value={searchJob.createdAt}
          onChange={(event) =>
            setSearchJob({ ...searchJob, createdAt: event.target.value })
          }
        />
        <Input
          placeholder="Người đăng"
          inputProps={ariaLabel}
          value={searchJob.userData.lastName}
          onChange={(event) =>
            setSearchJob({
              ...searchJob,
              userData: {
                ...searchJob.userData,
                lastName: event.target.value,
              },
            })
          }
        />
      </Box>
      <Box>
        <Button variant="contained" onClick={handleOpenAddDialog}>
          Thêm mới
          <AddIcon />
        </Button>
        <AddDialog
          open={isAddDialogOpen}
          handleClose={handleCloseAddDialog}
          handleAccept={handleAcceptAddDialog}
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
