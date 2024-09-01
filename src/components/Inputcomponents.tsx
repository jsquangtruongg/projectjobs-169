import { ReactNode } from "react";
import styles from "./StyleInput.module.css";
interface InputcomponentsProps {
  name: string;
  id: string;
  type?: string;
  icon?: ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  onIconClick?: () => void;
}

export const Inputcomponents: React.FC<InputcomponentsProps> = ({
  name,
  type = "text",
  id,
  icon,
  value,
  onChange,
  error,
  onIconClick,
}) => {
  return (
    <div className={styles.input_container}>
      <label htmlFor={name} className={styles.input_label}>
        {name}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
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

export const InputFromEmail = ({
  name,
  id,
  value,
  onChange,
  error,
}: {
  name: string;
  id: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={styles.input_email}>
      <label htmlFor={id} className={styles.input_label}>
        {name}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        className={`${styles.input_field} ${error ? styles.input_error : ""}`}
      />
      {error && <span className={styles.error_text}>{error}</span>}
    </div>
  );
};
export const InputcomponentPassWord = ({
  name,
  type = "password",
  icon,
  onIconClick,
  value,
  onChange,
  error,
}: {
  value: string;
  name: string;
  id: string;
  type?: string;
  error?: string;
  icon?: ReactNode;
  onIconClick?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={styles.input_container_password}>
      <label htmlFor={name} className={styles.input_label}>
        {name}
      </label>
      <input
        type={type}
        id={name}
        value={value}
        onChange={onChange}
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

export const InputPassWord = ({
  name,
  type = "password",
  id,
  icon,
  value,
  onChange,
  onIconClick,
  error,
}: {
  value: string;
  name: string;
  id: string;
  type?: string;
  error?: string;
  icon?: ReactNode;
  onIconClick?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={styles.input_password}>
      <label htmlFor={name} className={styles.input_label}>
        {name}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`${styles.input_field_name} ${
          error ? styles.input_error_name : ""
        }`}
      />
      {icon && (
        <span className={styles.icon_eyes} onClick={onIconClick}>
          {icon}
        </span>
      )}
      {error && <span className={styles.error_text}>{error}</span>}
    </div>
  );
};
