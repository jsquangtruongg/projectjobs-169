import { ChangeEvent, useState } from "react";
import "./style.scss";
import line from "../../../assets/images/Vector 6.png";
import iconGoogle from "../../../assets/images/icons_google.png";
import iconFaceBook from "../../../assets/images/logos_facebook.png";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import {
  InputComponentPassWord,
  InputFromEmail,
  InputTextComponents,
} from "../../common/InputComponent/InputComponents";
import axios from "axios";
import { login } from "../../../api/auth";

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
    } else if (formData.password.length < 6) {
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
        await login({
          firstName: formData.username,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        });

        navigate("/home");
      } catch (error: any) {
        // Xử lý khi có lỗi trong quá trình gửi request
        setApiError(error?.response?.data.mess);
      }
    }
  };

  return (
    <div className="container-login">
      <h3 className="title">Login Account</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-login">
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
        <button type="submit" className="button-login">
          Create Account
        </button>
        <div className="text-question">
          <p>Already have an account?</p>
          <p onClick={handleLoginClick}>sign up</p>
        </div>
        <div className="hr_line">
          <img src={line} alt="" className="img-line" />
          <p>or</p>
          <img src={line} alt="" className="img-line" />
        </div>
        <div className="link-contact">
          <button className="btn-sign" onClick={handleGoogleClick}>
            <img src={iconGoogle} alt="" className="icons_google" />
            Sign up with Google
          </button>
          <button type="button" className="btn-sign">
            <img src={iconFaceBook} alt="" className="icons_facebook" />
            Sign up with Facebook
          </button>
        </div>
      </form>
    </div>
  );
};
