import React, { useState } from "react";
import styles from "./style.module.css"; // Import CSS module

interface TabProps {
  active: boolean;
  title: string;
  idTab: string;
  onClick: (title: string, idTab: string) => void;
}

export const Tab = ({ active = false, title, idTab, onClick }: TabProps) => {
  const onClickTab = () => {
    onClick(title, idTab);
  };

  return (
    <li
      className={`${styles.tabItem} ${active ? styles.active : ""}`} // Sử dụng CSS modules
      onClick={onClickTab}
    >
      {title}
    </li>
  );
};

interface TabsProps {
  children: React.ReactElement | React.ReactElement[];
  onChangeTab: (id: string) => void;
}

export default function Tabs({ children, onChangeTab }: TabsProps) {
  const tabItem = Array.isArray(children) ? children : [children];
  const [activeTab, setActiveTab] = useState<string>(
    (tabItem[0] ?? children).props.title as string
  );

  const onClickTabItem = (tabTitle: string, idTab: string) => {
    setActiveTab(tabTitle);
    onChangeTab(idTab);
  };

  return (
    <div className={styles.tabs}>
      {" "}
      {/* Sử dụng styles từ module */}
      <ul className={styles.tabList}>
        <p className={styles.employer_job}>Nhà Tuyển Dụng Nỗi Bật</p>{" "}
        {/* Sử dụng styles từ module */}
        {tabItem.map((tab, index) => {
          const { title } = tab.props;
          return (
            <Tab
              key={index}
              idTab={tab.key as string}
              title={title}
              onClick={onClickTabItem}
              active={title === activeTab ? true : false}
            />
          );
        })}
      </ul>
      <div className={styles.tabContent}>
        {" "}
        {/* Sử dụng styles từ module */}
        {tabItem.map((tab) => {
          if (tab.props.title !== activeTab) return null;
          return tab.props.children;
        })}
      </div>
    </div>
  );
}
