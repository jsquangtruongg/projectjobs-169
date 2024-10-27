// import { useEffect, useState } from "react";
// import { BrowseDialog, FroFile, RefuseDialog } from "./Dialog";
// import "./style.scss";
// import { useAppDispatch, useAppSelector } from "../../../redux/store";
// import { IApplyData } from "../../../redux/reducers/apply";

// export const AppLyManagerComponent = () => {
//   const [openProFile, setOpenProFile] = useState(false);
//   const [openBrowse, setOpenBrowse] = useState(false);
//   const [openRefuse, setOpenRefuse] = useState(false);
//   const proFileState = useAppSelector((state) => state.apply);
//   const currentUser = useAppSelector((state) => state.user.userData?.id);
//   const [itemApply, setItemApply] = useState<IApplyData | null>(null);
//   const [applyItem, setApplyItem] = useState<IApplyData | null>(null);
//   const handleClickOpen = (item: IApplyData) => {
//     setItemApply(item);
//     setOpenProFile(true);
//   };
//   console.log();
//   const handleClickClose = () => {
//     setOpenProFile(false);
//   };
//   const handleClickOpenBrowse = (item: IApplyData) => {
//     setApplyItem(item);
//     setOpenBrowse(true);
//   };
//   const handleAcceptBrowse = () => {
//     setOpenBrowse(false);
//   };
//   const handleClosetBrowse = () => {
//     setOpenBrowse(false);
//   };
//   const handleClickRefuse = () => {
//     setOpenRefuse(true);
//   };
//   const handleAcceptRefuse = () => {
//     setOpenRefuse(false);
//   };
//   const handleCloseRefuse = () => {
//     setOpenRefuse(false);
//   };
//   const getTextFromHTML = (html: string): string => {
//     const doc = new DOMParser().parseFromString(html, "text/html");
//     return doc.body.innerText;
//   };
//   return (
//     <div className="heading-apply">
//       {proFileState.applyDataList
//         .filter((proFile: IApplyData) => proFile.userData.id === currentUser)
//         .map((proFile: IApplyData, index: number) => (
//           <div className="from-check-apply" key={index}>
//             <div className="img-job">
//               {" "}
//               <img src={proFile.jobs.img as string} alt="" />
//             </div>
//             <div className="item-text-title">
//               <p className="title-source">Từ bài đăng:</p>
//               <p
//                 style={{
//                   fontFamily: `"Times New Roman", Times, serif`,
//                   fontSize: "17px",
//                   fontWeight: "600",
//                 }}
//               >
//                 {" "}
//                 {getTextFromHTML(proFile.jobs.content).length > 18
//                   ? `${getTextFromHTML(proFile.jobs.content).slice(0, 18)}...`
//                   : getTextFromHTML(proFile.jobs.content)}
//               </p>
//             </div>
//             <div className="item-text-title">
//               <p className="title-source">Ứng tuyển:</p>
//               <p
//                 style={{
//                   fontFamily: `"Times New Roman", Times, serif`,
//                   fontSize: "17px",
//                   fontWeight: "600",
//                 }}
//               >
//                 {proFile.fullName}
//               </p>
//             </div>
//             <div className="from-click-btn">
//               <button type="button" onClick={() => handleClickOpen(proFile)}>
//                 {" "}
//                 Xem Hồ Sơ
//               </button>
//               <button
//                 type="button"
//                 style={{ backgroundColor: "green" }}
//                 onClick={() => handleClickOpenBrowse(proFile)}
//               >
//                 {" "}
//                 Duyệt
//               </button>
//               <button
//                 type="button"
//                 style={{ backgroundColor: "red" }}
//                 onClick={handleClickRefuse}
//               >
//                 {" "}
//                 Từ Chối
//               </button>
//             </div>
//           </div>
//         ))}
//       <FroFile
//         open={openProFile}
//         handleClose={handleClickClose}
//         itemApply={itemApply}
//       />
//       <BrowseDialog
//         ItemApply={applyItem}
//         open={openBrowse}
//         handleAccept={handleAcceptBrowse}
//         handleClose={handleClosetBrowse}
//       />
//       <RefuseDialog
//         open={openRefuse}
//         handleAccept={handleAcceptRefuse}
//         handleClose={handleCloseRefuse}
//       />
//     </div>
//   );
// };
