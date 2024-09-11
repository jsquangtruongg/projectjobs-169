import styles from "./Logingoogle.module.css";
import iconGoogle from "../../../assets/images/icons_google.png";
import line from "../../../assets/images/Vector 6.png";

import { ChangeEvent, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  InputComponentPassWord,
  InputFromEmail,
} from "../../common/InputComponent/InputComponents";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export const LoginGoogle = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/auth/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );

        if (response.data.err === 0) {
          navigate("/home");
        } else {
          if (response.data.mes === "email does not exist") {
            setErrors((prevErrors) => ({
              ...prevErrors,
              email: "Email không tồn tại",
            }));
          } else if (response.data.mes === "Password is wrong") {
            setErrors((prevErrors) => ({
              ...prevErrors,
              password: "Mật khẩu không đúng",
            }));
          } else {
            setApiError(response.data.mes);
          }
        }
      } catch (error) {
        setApiError("Đã xảy ra lỗi khi kết nối đến máy chủ.");
        console.error("Login Error:", error);
      }
    }
  };

  const togglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={styles.heading_form}>
      <h3 className={styles.create_account}>Login Account</h3>
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
        <InputComponentPassWord
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
        <button type="submit" className={styles.item_click_create}>
          Login
        </button>
        {apiError && <p className={styles.api_error}>{apiError}</p>}
      </form>
    </div>
  );
};
