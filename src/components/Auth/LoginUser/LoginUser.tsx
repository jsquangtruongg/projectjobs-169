import { ChangeEvent, useState } from "react";
import styles from "./LoginUser.module.css";
import line from "../../../assets/imgs/Vector 6.png";
import iconGoogle from "../../../assets/imgs/icons_google.png";
import iconFaceBook from "../../../assets/imgs/logos_facebook.png";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import {
  InputComponentPassWord,
  InputFromEmail,
  InputTextComponents,
} from "../../common/InputComponent/InputComponents";
import axios from "axios";

interface FormData {
  username: string;
  lastName: string;
  email: string;
  password: string;
}

interface Errors {
  username?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export const LoginPageComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateForm = (): Errors => {
    const newErrors: Errors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Tên không được để trống";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Họ không được để trống";
    }
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

  const togglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleLoginClick = () => {
    navigate("/sign-up");
  };
  const navigate = useNavigate();
  const handleGoogleClick = () => {
    navigate("/google-login");
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
            firstName: formData.username,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
          }
        );

        if (response.data.err === 0) {
          navigate("/home-page");
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

  return (
    <div>
      <h3 className={styles.create_account}>Login Account</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_input}>
          <InputTextComponents
            name="First Name"
            id="username"
            onChange={onChangeHandler}
            value={formData.username}
            error={errors.username}
          />
          <InputTextComponents
            name="Last Name"
            id="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            error={errors.lastName}
          />
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
        <button type="submit" className={styles.item_click_create}>
          Create Account
        </button>
        <div className={styles.form_text}>
          <p className={styles.text_account}>Already have an account?</p>
          <p onClick={handleLoginClick} className={styles.text_login}>
            sign up
          </p>
        </div>
        <div className={styles.form_line}>
          <img src={line} alt="" className={styles.icon_line} />
          <span className={styles.text_or}>or</span>
          <img src={line} alt="" className={styles.icon_line} />
        </div>
        <div className={styles.contact_link}>
          <button className={styles.btn_sign} onClick={handleGoogleClick}>
            <img src={iconGoogle} alt="" className={styles.icons_google} />
            Sign up with Google
          </button>
          <button type="button" className={styles.btn_sign}>
            <img src={iconFaceBook} alt="" className={styles.icons_google} />
            Sign up with Facebook
          </button>
        </div>
      </form>
    </div>
  );
};
