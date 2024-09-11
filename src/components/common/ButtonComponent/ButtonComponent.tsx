import { useState } from "react";
import styles from "./ButtonComponent.module.css";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { useNavigate } from "react-router-dom";
interface ButtonComponentsProps {
  name: string;
  id?: string;
  items?: string[];
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const ButtonComponent: React.FC<ButtonComponentsProps> = (props) => {
  const { name } = props;
  const navigate = useNavigate();
  const handleClick = () => {
    if (name.trim() === "Hồ Sơ") {
      navigate("/ProfilePage");
    }
    if (name.trim() === "Tuyển Dụng") {
      navigate("/JobRecruitment");
    }
    if (name.trim() === "Trắc Nghiệm") {
      navigate("/InterestPage");
    }
     if (name.trim() === "Trang Chủ") {
       navigate("/home-page");
     }
  };
  return (
    <label
      htmlFor={name}
      className={styles.item_fun_click}
      onClick={handleClick}
    >
      {name}
    </label>
  );
};

export const ButtonDropComponent: React.FC<ButtonComponentsProps> = (props) => {
  const { name, items } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleItemClick = (item: string) => {
    if (item.trim() === "Blog Việc") {
      navigate("/blog");
    }
  };

  return (
    <div className={styles.dropdown}>
      <label
        htmlFor={name}
        className={styles.item_fun_click}
        onClick={toggleDropdown}
      >
        {name}
        <ExpandMoreOutlinedIcon style={{ fontSize: 25, marginLeft: 5 }} />
      </label>
      {items && items.length > 0 && (
        <div
          className={`${styles.dropdown_content} ${
            dropdownOpen ? styles.show : ""
          }`}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={styles.dropdown_item}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
