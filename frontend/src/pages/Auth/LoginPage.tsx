import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputFiled/InputField";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);

    if (!validateEmail(email)) {
      setEmailError("Please enter vaild email.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = () => {
    setPasswordTouched(true);

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters.At least one letter and one number");
    } else {
      setPasswordError("");
    }
  };

  const handleLoginClick = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      
      setEmailTouched(true);
      setPasswordTouched(true);

      const isEmailValid = validateEmail(email);
      const isPasswordValid = validatePassword(password);

      setEmailError(isEmailValid ? "" : "Invalid email format.");
      setPasswordError(
        isPasswordValid ? "" : "Wrong password. Please check and retry."
      );

      if (isEmailValid && isPasswordValid) {
        const response = await axios.post(
          "http://localhost:5000/api/v1/auth/login",
          {
            email,
            password,
          },
          { withCredentials: true }
        );

        const role = response.data.user.role;

        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }

        toast.success(response.data.message || "Login successfully");
      }
    } catch (error:any) {
      const errorMessage = error.response?.data?.message || "Failed to login. Please try again.";
      toast.error(errorMessage);
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="authOuter">
      <div className="authInner">
        <div className="authInner-left element"></div>
        <div className="authInner-right element">
          <h2 className="auth-heading">LOGIN</h2>
          <form onSubmit={handleLoginClick}>
            <div className="inputField-box">
              <InputField
                className="input"
                type="email"
                placeholder="Enter you email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
              />
              {emailTouched && <p className="error-text">{emailError}</p>}
            </div>
            <div className="inputField-box">
              <InputField
                className="input"
                type="password"
                placeholder="Enter you password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handlePasswordChange}
              />
              {passwordTouched && <p className="error-text">{passwordError}</p>}
            </div>
            <div className="forgot-box">
              <p className="forgot">forgotPassowrd?</p>
            </div>
            <div className="button-box">
              <Button className="button" type="submit" name="LOGIN" />
            </div>
            <div className="bottom-box">
              <p>
                Create an account?{" "}
                <span>
                  <Link to="/register">SignUp</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
