import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { BrowseDialog, FroFile, RefuseDialog } from "./Dialog";
import { IApplyData } from "../../../redux/reducers/apply";
import { IApplyMemberData } from "../../../redux/reducers/browseApplyManager";
import { getAllBrowseApplyManager } from "../../../redux/actions/browseApplyManagerAction";

export default function BrowseApplyComponent() {
  const [openProFile, setOpenProFile] = useState(false);
  const [openBrowse, setOpenBrowse] = useState(false);
  const [openRefuse, setOpenRefuse] = useState(false);
  const proFileState = useAppSelector((state) => state.browseApplyManager);
  const currentUser = useAppSelector((state) => state.user.userData?.id);
  const [itemApply, setItemApply] = useState<IApplyMemberData | null>(null);
  const [applyItem, setApplyItem] = useState<IApplyMemberData | null>(null);
  const handleClickOpen = (item: IApplyMemberData) => {
    setItemApply(item);
    setOpenProFile(true);
  };
  console.log();
  const handleClickClose = () => {
    setOpenProFile(false);
  };

  const handleAcceptBrowse = () => {
    setOpenBrowse(false);
  };
  const handleClosetBrowse = () => {
    setOpenBrowse(false);
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
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllBrowseApplyManager());
  }, []);

  const getTextFromHTML = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.innerText;
  };
  return (
    <div className="heading-apply">
      {proFileState.browseApplyManagerDataList
        .filter(
          (proFile: IApplyMemberData) => proFile.userData.id === currentUser
        )
        .map((proFile: IApplyMemberData, index: number) => (
          <div className="from-check-apply" key={index}>
            <div className="img-job">
              {" "}
              <img src={proFile.jobs.img as string} alt="" />
            </div>
            <div className="item-text-title">
              <p className="title-source">Từ bài đăng:</p>
              <p
                style={{
                  fontFamily: `"Times New Roman", Times, serif`,
                  fontSize: "17px",
                  fontWeight: "600",
                }}
              >
                {" "}
                {getTextFromHTML(proFile.jobs.content).length > 18
                  ? `${getTextFromHTML(proFile.jobs.content).slice(0, 18)}...`
                  : getTextFromHTML(proFile.jobs.content)}
              </p>
            </div>
            <div className="item-text-title">
              <p className="title-source">Ứng tuyển:</p>
              <p
                style={{
                  fontFamily: `"Times New Roman", Times, serif`,
                  fontSize: "17px",
                  fontWeight: "600",
                }}
              >
                {proFile.Applies.fullName}
              </p>
            </div>
            <div className="from-click-btn">
              <button type="button" onClick={() => handleClickOpen(proFile)}>
                {" "}
                Xem Hồ Sơ
              </button>

              <button
                type="button"
                style={{ backgroundColor: "red" }}
                onClick={handleClickRefuse}
              >
                {" "}
                Từ Chối
              </button>
            </div>
          </div>
        ))}
      <FroFile
        open={openProFile}
        handleClose={handleClickClose}
        itemApply={itemApply}
      />
      <BrowseDialog
        ItemApply={applyItem}
        open={openBrowse}
        handleAccept={handleAcceptBrowse}
        handleClose={handleClosetBrowse}
      />
      <RefuseDialog
        open={openRefuse}
        handleAccept={handleAcceptRefuse}
        handleClose={handleCloseRefuse}
      />
    </div>
  );
}
