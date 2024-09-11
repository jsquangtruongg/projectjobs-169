import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import line from "../../../assets/images/Vector 6.png";
import iconGoogle from "../../../assets/images/icons_google.png";
import iconFaceBook from "../../../assets/images/logos_facebook.png";

import styles from "./RegisterUser.module.css";
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
  rePassword: string;
}

interface Errors {
  username?: string;
  lastName?: string;
  email?: string;
  password?: string;
  rePassword?: string;
}

function RegisterPageComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const usernameId = "username";
  const lastNameId = "lastName";
  const emailId = "email";
  const passwordId = "password";
  const rePasswordId = "rePassword";

  const navigate = useNavigate();

  const handleFaceBookClick = () => {
    navigate("/facebook-login");
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    if (errors[id as keyof Errors]) {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
    }
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
    if (formData.password !== formData.rePassword) {
      newErrors.rePassword = "Mật khẩu không khớp";
    }

    return newErrors;
  };

  const togglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

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
          "http://localhost:8000/api/v1/auth/register",
          {
            firstName: formData.username,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
          }
        );

        if (response.data.err === 0) {
          navigate("/home");
        } else {
          if (response.data.mes === "email already exists") {
            setErrors((prevErrors) => ({
              ...prevErrors,
              email: "Email đã được sử dụng",
            }));
          } else {
            setApiError(response.data.mes);
          }
        }
      } catch (error) {
        // Xử lý khi có lỗi trong quá trình gửi request
        setApiError("Đã xảy ra lỗi khi kết nối đến máy chủ.");
        console.error("Login Error:", error);
      }
    }
  };

  return (
    <>
      <h3 className={styles.create_account}>Create Account</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_input}>
          <InputTextComponents
            name="First Name"
            id={usernameId}
            value={formData.username}
            error={errors.username}
            onChange={onChangeHandler}
          />
          <InputTextComponents
            name="Last Name"
            id={lastNameId}
            value={formData.lastName}
            error={errors.lastName}
            onChange={onChangeHandler}
          />
        </div>
        <InputFromEmail
          name="Email"
          id={emailId}
          value={formData.email}
          error={errors.email}
          onChange={onChangeHandler}
        />
        <div className={styles.form_input_password}>
          <InputComponentPassWord
            name="Password"
            id={passwordId}
            value={formData.password}
            type={showPassword ? "text" : "password"}
            icon={showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            error={errors.password}
            style={{ width: "40%" }}
            onIconClick={togglePassword}
            onChange={onChangeHandler}
          />
          <InputComponentPassWord
            name="RePassword"
            id={rePasswordId}
            value={formData.rePassword}
            type={showPassword ? "text" : "password"}
            icon={showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            error={errors.rePassword}
            style={{ width: "40%" }}
            onIconClick={togglePassword}
            onChange={onChangeHandler}
          />
        </div>
        <button type="submit" className={styles.item_click_create}>
          Create Account
        </button>
        <div className={styles.form_text}>
          <p className={styles.text_account}>Already have an account?</p>
          <p className={styles.text_login} onClick={handleLoginClick}>
            Login
          </p>
        </div>
        <div className={styles.form_line}>
          <img src={line} alt="" className={styles.icon_line} />
          <span className={styles.text_or}>or</span>
          <img src={line} alt="" className={styles.icon_line} />
        </div>
        <div className={styles.contact_link}>
          <button
            type="button"
            className={styles.btn_sign}
            onClick={handleFaceBookClick}
          >
            <img src={iconFaceBook} alt="" className={styles.icons_google} />
            Sign up with Facebook
          </button>
          <button
            type="button"
            className={styles.btn_sign}
            onClick={handleGoogleClick}
          >
            <img src={iconGoogle} alt="" className={styles.icons_google} />
            Sign up with Google
          </button>
        </div>
      </form>
    </>
  );
}

export default RegisterPageComponent;
