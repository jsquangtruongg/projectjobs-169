import { useEffect, useState } from "react";
import icon from "../../../assets/images/Rectangle25.png";
import { BrowseDialog, FroFile, RefuseDialog } from "./Dialog";
import "./style.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { getIdApply } from "../../../redux/actions/applyAction";
import { IApplyData } from "../../../redux/reducers/apply";

export const AppLyComponent = () => {
  const [openProFile, setOpenProFile] = useState(false);
  const [openBrowse, setOpenBrowse] = useState(false);
  const [openRefuse, setOpenRefuse] = useState(false);
  const proFileState = useAppSelector((state) => state.apply);
  const [itemApply, setItemApply] = useState<IApplyData | null>(null);

  const handleClickOpen = (item: IApplyData) => {
    setItemApply(item);
    setOpenProFile(true);
  };
  console.log();
  const handleClickClose = () => {
    setOpenProFile(false);
  };

  const handleClickOpenBrowse = () => {
    setOpenBrowse(true);
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
  const getTextFromHTML = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.innerText;
  };
  return (
    <div className="heading-apply">
      {proFileState.applyDataList.map((proFile: IApplyData, index: number) => (
        <div className="from-check-apply" key={index}>
          <div className="from-click-app">
            <img src={icon} alt="" />
            <div className="item-text-title">
              <p className="title-source">Từ bài đăng:</p>
              <p>
                {" "}
                {getTextFromHTML(proFile.jobs.content).length > 20
                  ? `${getTextFromHTML(proFile.jobs.content).slice(0, 20)}...`
                  : getTextFromHTML(proFile.jobs.content)}
              </p>
            </div>
            <div className="item-text-title">
              <p className="title-source">Ứng tuyển:</p>
              <p>{proFile.fullName}</p>
            </div>
            <div className="from-click-btn">
              <button type="button" onClick={() => handleClickOpen(proFile)}>
                {" "}
                Xem Hồ Sơ
              </button>
              <button type="button" onClick={handleClickOpenBrowse}>
                {" "}
                Duyệt
              </button>
              <button type="button" onClick={handleClickRefuse}>
                {" "}
                Từ Chối
              </button>
            </div>
          </div>
        </div>
      ))}
      <FroFile
        open={openProFile}
        handleClose={handleClickClose}
        itemApply={itemApply}
      />
      <BrowseDialog
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
};
