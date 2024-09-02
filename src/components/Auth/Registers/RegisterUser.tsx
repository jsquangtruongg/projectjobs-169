import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import line from "../../../assets/imgs/Vector 6.png";
import iconGoogle from "../../../assets/imgs/icons_google.png";
import iconFaceBook from "../../../assets/imgs/logos_facebook.png";

import styles from "./RegisterUser.module.css";
import {
  InputComponentPassWord,
  InputFromEmail,
  InputTextComponents,
} from "../../common/InputComponent/InputComponents";

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

  const usernameId = "username";
  const lastNameId = "lastname";
  const emailId = "email";
  const passwordId = "password";
  const rePasswordId = "rePassword";

  const navigate = useNavigate();

  const handleFaceBookClick = () => {
    navigate("/FaceBookPage");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      console.log("Form submitted", formData);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <>
      <h3 className={styles.create_account}>Create Account</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_input}>
          <InputTextComponents
            name="Last Name"
            id={lastNameId}
            value={formData.lastName}
            error={errors.lastName}
            onChange={onChangeHandler}
          />
          <InputTextComponents
            name="First Name"
            id={usernameId}
            value={formData.username}
            error={errors.username}
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
        <div className={styles.form_input}>
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
        <div className={styles.contact_link} onClick={handleGoogleClick}>
          <button type="button" className={styles.btn_sign}>
            <img src={iconGoogle} alt="" className={styles.icons_google} />
            Sign up with Google
          </button>
          <button
            type="button"
            className={styles.btn_sign}
            onClick={handleFaceBookClick}
          >
            <img src={iconFaceBook} alt="" className={styles.icons_google} />
            Sign up with Facebook
          </button>
        </div>
      </form>
    </>
  );
}

export default RegisterPageComponent;
