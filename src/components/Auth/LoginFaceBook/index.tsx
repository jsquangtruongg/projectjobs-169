import iconFaceBook from "../../../assets/images/logos_facebook.png";
import "./style.scss";
import line from "../../../assets/images/Vector 6.png";
import { ChangeEvent, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  InputComponentPassWord,
  InputFromEmail,
} from "../../common/InputComponent/InputComponents";

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

export const LoginFaceBook = () => {
  const [showPassword, SetShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    lastName: "",
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
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
    }
  };
  const togglePassword = () => {
    SetShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className="login-fb-container">
      <h3 className="title">Create Account FaceBook</h3>
      <form onSubmit={handleSubmit}>
        <div className="btn-sign-up">
          <button>
            <img src={iconFaceBook} alt="" />
            Sign up with Facebook
          </button>
        </div>
        <div className="hr_line">
          <img src={line} alt="" className="img-line" />
          <p>or</p>
          <img src={line} alt="" className="img-line" />
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
        <div className="terms-of-use">
          <div className="btn-accept-term">
            <label>
              <input type="checkbox" />
            </label>
            <p>Đồng ý với Chính sách và Điều khoản</p>
          </div>
        </div>
        <button type="submit" className="btn-login-fb">
          Create Account
        </button>
      </form>
    </div>
  );
};
