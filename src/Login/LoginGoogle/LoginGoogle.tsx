import styles from "./Logingoogle.module.css";
import iconGoogle from "../../assets/imgs/icons_google.png";
import line from "../../assets/imgs/Vector 6.png";
import {
  InputcomponentPassWord,
  InputFromEmail,
} from "../../components/Inputcomponents";
import { ChangeEvent, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface FormData {
  username: string;
  lastname: string;
  email: string;
  password: string;
}

interface Errors {
  username?: string;
  lastname?: string;
  email?: string;
  password?: string;
}
export const LoginGoogle = () => {
  const [showPassword, SetShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const validateForm = (): Errors => {
    const newErrors: Errors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
    ) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    }
    return newErrors;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      // Submit form if no errors
      console.log("Form submitted", formData);
    } else {
      setErrors(formErrors);
    }
  };
  const togglePassword = () => {
    SetShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className={styles.heading_form}>
      <h3 className={styles.create_account}>Login Google Account</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.btn_center}>
          <button className={styles.btn_sign}>
            <img src={iconGoogle} alt="" className={styles.icons_google} />
            Sign up with Google
          </button>
        </div>
        <div className={styles.form_line}>
          <img src={line} alt="" className={styles.icon_line} />
          <span className={styles.text_or}>or</span>
          <img src={line} alt="" className={styles.icon_line} />
        </div>
        <InputFromEmail
          name="Email"
          id="email"
          value={formData.email}
          onChange={onChangeHandler}
          error={errors.email}
        />
        <InputcomponentPassWord
          name="Password"
          id="password"
          type={showPassword ? "text" : "password"}
          icon={showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          onIconClick={togglePassword}
          onChange={onChangeHandler}
          value={formData.password}
          error={errors.password}
        />
        <div className={styles.form_help}>
          <div className={styles.form_check}>
            <label className={styles.icon_check}>
              <input className={styles.check_in} type="checkbox"></input>
            </label>
            <p className={styles.rules}>Đồng ý với Chính sách và Điều khoản</p>
          </div>
        </div>
        <button className={styles.item_click_create}>Create Account</button>
      </form>
    </div>
  );
};
