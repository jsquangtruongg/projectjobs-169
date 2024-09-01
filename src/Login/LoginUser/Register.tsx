import { ChangeEvent, useState } from "react";
import styles from "./Register.module.css";
import line from "../../assets/imgs/Vector 6.png";
import iconGoogle from "../../assets/imgs/icons_google.png";
import iconFaceBook from "../../assets/imgs/logos_facebook.png";
import {
  InputcomponentPassWord,
  Inputcomponents,
  InputFromEmail,
} from "../../components/Inputcomponents";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

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

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
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
    if (!formData.username.trim()) {
      newErrors.username = "Tên không được để trống";
    }
    if (!formData.lastname.trim()) {
      newErrors.lastname = "Họ không được để trống";
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

  const navigate = useNavigate();
  const handleGoogleClick = () => {
    navigate("/GooglePage");
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

  return (
    <div>
      <h3 className={styles.create_account}>Login Account</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_input}>
          <Inputcomponents
            name="First Name"
            id="username"
            onChange={onChangeHandler}
            value={formData.username}
            error={errors.username}
          />
          <Inputcomponents
            name="Last Name"
            id="lastname"
            value={formData.lastname}
            onChange={onChangeHandler}
            error={errors.lastname}
          />
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
        <button type="submit" className={styles.item_click_create}>
          Create Account
        </button>
        <div className={styles.form_text}>
          <p className={styles.text_account}>Already have an account?</p>
          <p className={styles.text_login}>Login</p>
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
