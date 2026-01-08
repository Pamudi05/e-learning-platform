import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputFiled/InputField";
import { useState } from "react";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as string;
    setEmail(value);

    if (!validateEmail(email)) {
      setEmailError("Incorrect email. Please try again.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as string;
    setPassword(value);

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters.");
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="authOuter">
      <div className="authInner">
        <div className="authInner-left element"></div>
        <div className="authInner-right element">
          <h2 className="auth-heading">REGISTER</h2>
          <div className="inputField-box">
            <InputField
              className="input"
              type="text"
              placeholder="Enter you name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="inputField-box">
            <InputField
              className="input"
              type="email"
              placeholder="Enter you email"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <p className="error-text">{emailError}</p>}
          </div>
          <div className="inputField-box">
            <InputField
              className="input"
              type="password"
              placeholder="Enter you password"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && <p className="error-text">{passwordError}</p>}
          </div>
          <div className="button-box">
            <Button className="button" type="submit" name="REGISTER" />
          </div>
          <div className="bottom-box">
            <p>
              Create an account?{" "}
              <span>
                <Link to="/">Login</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
