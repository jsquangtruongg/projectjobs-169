import React, { useState } from "react";
import styles from "./style.module.css"; // Import CSS module

interface TabProps {
  title: string;
  onClick: (title: string) => void;
  active: boolean;
}

export const Tab = ({ active = false, title, onClick }: TabProps) => {
  const onClickTab = () => {
    onClick(title);
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
  children: React.ReactElement[];
}

export default function Tabs({ children }: TabsProps) {
  const [activeTab, setActiveTab] = useState<string>(
    children[0].props.title as string
  );

  const onClickTabItem = (tabTitle: string) => setActiveTab(tabTitle);

  return (
    <div className={styles.tabs}>
      {" "}
      {/* Sử dụng styles từ module */}
      <ul className={styles.tabList}>
        <p className={styles.employer_job}>Nhà Tuyển Dụng Nỗi Bật</p>{" "}
        {/* Sử dụng styles từ module */}
        {children.map((tab) => {
          const { title } = tab.props;

          return (
            <Tab
              key={title}
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
        {children.map((tab) => {
          if (tab.props.title !== activeTab) return null;

          return tab.props.children;
        })}
      </div>
    </div>
  );
}
