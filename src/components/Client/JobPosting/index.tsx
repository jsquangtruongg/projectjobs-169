import "./style.scss";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

export const JobPostingComponent = () => {
  const jobState = useAppSelector((state) => state.job);

  return <div className="job-posting-container"></div>;
};
