import "./style.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { getIdJobCategoryAction } from "../../../redux/actions/jobCategoryActions";
import ScrollToTop from "../../../layout/Scroll";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { AddDialog } from "./Dialog";
import { IJob, IJobCategoryData } from "../../../redux/reducers/jobCategory";
export const JobsComponent = () => {
  const stateIdJobCategory = useAppSelector((state) => state.jobCategory);
  const [selectedExperience, setSelectedExperience] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(getIdJobCategoryAction(Number(id)));
    }
  }, [dispatch, id]);
  const jobs = stateIdJobCategory.jobCategoryData?.jobs || [];

  const normalize = (text: any) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s/g, "")
      .toLowerCase();

  const filteredJobs = jobs.filter((job: any) => {
    let matchExperience = false;
    if (selectedExperience === "all") {
      matchExperience = true;
    } else if (selectedExperience === "none") {
      matchExperience =
        normalize(job.experience).includes(normalize("Không yêu cầu")) ||
        normalize(job.experience).includes(normalize("Không Cần Kinh Nghiệm"));
    } else if (selectedExperience === "5plus") {
      matchExperience = normalize(job.experience).includes(
        normalize("Trên 5 năm")
      );
    } else {
      matchExperience = normalize(job.experience).includes(
        normalize(`${selectedExperience} năm`)
      );
    }

    let matchLevel = false;
    if (selectedLevel === "all") {
      matchLevel = true;
    } else {
      matchLevel = normalize(job.Grade).includes(normalize(selectedLevel));
    }

    return matchExperience && matchLevel;
  });
  const [open, setOpen] = useState(false);

  const [jobItem, setJobItem] = useState<IJob | null>(null);
  const handleOpen = (item: IJob) => {
    setOpen(true);
    setJobItem(item);
  };

  const handleCloseAdd = () => setOpen(false);
  const handleAcceptAdd = () => setOpen(false);
  return (
    <>
      <ScrollToTop />
      <div className="header-job">
        <div className="from-main-job">
          <div className="from-main-lef">
            <div className="from-filter">
              <FilterAltOutlinedIcon className="icon-filter" />

              <h4 className="txt-filter">Lọc Nâng Cao</h4>
            </div>
            <div className="filter-section">
              <div className="filter-group">
                <h4>Kinh nghiệm</h4>
                <div className="from-filter-option">
                  <div className="filter-option">
                    <input
                      type="radio"
                      name="exp"
                      id="exp-all"
                      value="all"
                      checked={selectedExperience === "all"}
                      onChange={(e) => setSelectedExperience(e.target.value)}
                      defaultChecked
                    />
                    <label htmlFor="exp-all">Tất cả</label>
                  </div>

                  <div className="filter-option">
                    <input
                      type="radio"
                      name="exp"
                      id="exp-none"
                      value="none"
                      checked={selectedExperience === "none"}
                      onChange={(e) => setSelectedExperience(e.target.value)}
                    />
                    <label htmlFor="exp-none">Không yêu cầu</label>
                  </div>

                  <div className="filter-option">
                    <input
                      type="radio"
                      name="exp"
                      id="exp-1"
                      value="1"
                      checked={selectedExperience === "1"}
                      onChange={(e) => setSelectedExperience(e.target.value)}
                    />
                    <label htmlFor="exp-1">1 năm</label>
                  </div>

                  <div className="filter-option">
                    <input
                      type="radio"
                      name="exp"
                      id="exp-2"
                      value="2"
                      checked={selectedExperience === "2"}
                      onChange={(e) => setSelectedExperience(e.target.value)}
                    />
                    <label htmlFor="exp-2">2 năm</label>
                  </div>

                  <div className="filter-option">
                    <input
                      type="radio"
                      name="exp"
                      id="exp-3"
                      value="3"
                      checked={selectedExperience === "3"}
                      onChange={(e) => setSelectedExperience(e.target.value)}
                    />
                    <label htmlFor="exp-3">3 năm</label>
                  </div>

                  <div className="filter-option">
                    <input
                      type="radio"
                      name="exp"
                      id="exp-4"
                      value="4"
                      checked={selectedExperience === "4"}
                      onChange={(e) => setSelectedExperience(e.target.value)}
                    />
                    <label htmlFor="exp-4">4 năm</label>
                  </div>

                  <div className="filter-option">
                    <input
                      type="radio"
                      name="exp"
                      id="exp-5"
                      value="5"
                      checked={selectedExperience === "5"}
                      onChange={(e) => setSelectedExperience(e.target.value)}
                    />
                    <label htmlFor="exp-5">5 năm</label>
                  </div>

                  <div className="filter-option">
                    <input
                      type="radio"
                      name="exp"
                      id="exp-5plus"
                      value="5plus"
                      checked={selectedExperience === "5plus"}
                      onChange={(e) => setSelectedExperience(e.target.value)}
                    />
                    <label htmlFor="exp-5plus">Trên 5 năm</label>
                  </div>
                </div>
              </div>

              <div className="divider"></div>

              <div className="filter-group">
                <h4>Cấp bậc</h4>
                <div className="from-filter-option">
                  <div className="filter-option">
                    <input
                      type="radio"
                      name="level"
                      id="level-all"
                      defaultChecked
                      value="all"
                      checked={selectedLevel === "all"}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                    />
                    <label htmlFor="level-all">Tất cả</label>
                  </div>
                  <div className="filter-option">
                    <input
                      type="radio"
                      name="level"
                      id="staff"
                      value="nhân viên"
                      checked={selectedLevel === "nhân viên"}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                    />
                    <label htmlFor="staff">Nhân viên</label>
                  </div>
                  <div className="filter-option">
                    <input
                      type="radio"
                      name="level"
                      id="lead"
                      value="Trưởng nhóm"
                      checked={selectedLevel === "Trưởng nhóm"}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                    />
                    <label htmlFor="lead">Trưởng nhóm</label>
                  </div>
                  <div className="filter-option">
                    <input
                      type="radio"
                      name="level"
                      id="intern"
                      value="Thực tập"
                      checked={selectedLevel === "Thực tập"}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                    />
                    <label htmlFor="intern">Thực tập</label>
                  </div>
                  <div className="filter-option">
                    <input
                      type="radio"
                      name="level"
                      id="partTime"
                      value="Part time"
                      checked={selectedLevel === "Part time"}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                    />
                    <label htmlFor="partTime">Part time</label>
                  </div>
                  <div className="filter-option">
                    <input
                      type="radio"
                      name="level"
                      id="online"
                      value="remote"
                      checked={selectedLevel === "remote"}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                    />
                    <label htmlFor="online">Trực tuyến</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="from-main-right">
            {filteredJobs.map((category, index) => (
              <div className="from-jobs" key={category.id || index}>
                <div className="from-avt">
                  <img src={category.img} alt="" className="item-img" />
                </div>
                <div className="from-concat-detail">
                  <div className="from-concat-job">
                    <div className="from-concat">
                      <p className="txt-content">{category.title}</p>

                      <p className="txt-company">{category.experience}</p>
                    </div>
                    <div className="from-total-salary">{category.salary}</div>
                  </div>
                  <div className="from-concat-date">
                    <div className="item-concat-date">
                      <p className="item-location">{category.location}</p>
                      <p className="item-location">{category.Grade}</p>
                    </div>
                    <div
                      className="from-save-apply"
                      onClick={() => handleOpen(category)}
                    >
                      <button className="btn-apply">Ứng tuyển</button>
                      <div className="item-love">
                        <FavoriteBorderIcon style={{ color: "#00bfa6" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <AddDialog
          open={open}
          jobItem={jobItem}
          handleClose={handleCloseAdd}
          handleAccept={handleAcceptAdd}
        />
      </div>
    </>
  );
};
