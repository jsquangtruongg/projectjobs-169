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
      
    </div>
  );
}
