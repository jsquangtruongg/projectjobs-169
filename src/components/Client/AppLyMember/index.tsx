import { useEffect, useState } from "react";
import { FroFileFeedBack, RefuseDialog } from "./Dialog";
import "../AppLyMember/style.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { IApplyMemberData } from "../../../redux/reducers/applyMember";
import { getAllApplyMember } from "../../../redux/actions/applyMemberAction";
import { IApplyData } from "../../../redux/reducers/apply";

export const AppLyMemberComponent = () => {
  const [openProFile, setOpenProFile] = useState(false);
  const [openRefuse, setOpenRefuse] = useState(false);
  const feedBackState = useAppSelector((state) => state.applyMember);
  console.log(feedBackState);
  const currentCV = useAppSelector((state) => state.user.userData?.id);

  const [itemApplyMember, setItemApplyMember] =
    useState<IApplyMemberData | null>(null);

  const handleClickOpen = (item: IApplyMemberData) => {
    setItemApplyMember(item);
    setOpenProFile(true);
  };
  console.log();
  const handleClickClose = () => {
    setOpenProFile(false);
  };

  const handleClickRefuse = () => {
    setOpenRefuse(true);
  };
  const handleAcceptRefuse = () => {
    setOpenRefuse(false);
  };
  const handleCloseRefuse = () => {
    setOpenRefuse(false);
  };
  const getTextFromHTML = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.innerText;
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllApplyMember());
  }, []);

  return (
    <div className="heading-apply">
      {feedBackState.applyMemberDataList
        .filter(
          (feedBack: IApplyMemberData) => feedBack.userApply_id === currentCV
        )
        .map((feedBack: IApplyMemberData, index: number) => (
          <div className="from-check-apply" key={index}>
            <div className="img-job">
              {" "}
              <img src={feedBack.jobs.img} alt="" />
            </div>
            <div className="item-text-title">
              <p className="title-source">Từ bài đăng:</p>
              <p style={{ marginTop: "2px" }}>
                {" "}
                {getTextFromHTML(feedBack.jobs.content).length > 18
                  ? `${getTextFromHTML(feedBack.jobs.content).slice(0, 18)}...`
                  : getTextFromHTML(feedBack.jobs.content)}
              </p>
            </div>
            <div className="item-text-title">
              <p className="title-source">Ứng tuyển:</p>
              <p></p>
            </div>
            <div className="from-click-btn">
              <button
                type="button"
                className="item-Information"
                onClick={() => handleClickOpen(feedBack)}
              >
                Xem Thông Tin
              </button>

              <button
                className="item-refuse"
                type="button"
                onClick={handleClickRefuse}
              >
                {" "}
                Từ Chối
              </button>
            </div>
          </div>
        ))}

      <FroFileFeedBack
        open={openProFile}
        handleClose={handleClickClose}
        itemApply={itemApplyMember}
      />

      <RefuseDialog
        open={openRefuse}
        handleAccept={handleAcceptRefuse}
        handleClose={handleCloseRefuse}
      />
    </div>
  );
};
