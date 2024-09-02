import { ReactNode } from "react";
import styles from "./StyleInput.module.css";
interface InputComponentsProps {
  name: string;
  id: string;
  type?: string;
  icon?: ReactNode;
  value: string;
  error?: string;
  style?: React.CSSProperties | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIconClick?: () => void;
}

export const InputTextComponents: React.FC<InputComponentsProps> = (props) => {
  const { name, error, icon, onIconClick, ...rest } = props;
  return (
    <div className={styles.input_container}>
      <label htmlFor={name} className={styles.input_label}>
        {name}
      </label>
      <input
        {...rest}
        className={`${styles.input_field_name} ${
          error ? styles.input_error_name : ""
        }`}
      />
      {icon && (
        <span className={styles.icon} onClick={onIconClick}>
          {icon}
        </span>
      )}
      {error && <span className={styles.error_text}>{error}</span>}
    </div>
  );
};

export const InputFromEmail: React.FC<InputComponentsProps> = (props) => {
  const { name, id, error, ...rest } = props;
  return (
    <div className={styles.input_email}>
      <label htmlFor={id} className={styles.input_label}>
        {name}
      </label>
      <input
        {...rest}
        id={id}
        type="text"
        className={`${styles.input_field} ${error ? styles.input_error : ""}`}
      />
      {error && <span className={styles.error_text}>{error}</span>}
    </div>
  );
};

export const InputComponentPassWord: React.FC<InputComponentsProps> = (
  props
) => {
  const { name, error, icon, onIconClick, style, ...rest } = props;
  return (
    <div className={styles.input_container_password} style={style}>
      <label htmlFor={name} className={styles.input_label}>
        {name}
      </label>
      <input
        {...rest}
        id={name}
        type={"password"}
        className={`${styles.input_field} ${error ? styles.input_error : ""}`}
      />
      {icon && (
        <span className={styles.icon_eye} onClick={onIconClick}>
          {icon}
        </span>
      )}
      {error && <span className={styles.error_text}>{error}</span>}
    </div>
  );
};
