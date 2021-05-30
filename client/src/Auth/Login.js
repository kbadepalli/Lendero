import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FiUser, FiLock } from "react-icons/fi";
import AuthLayout from "../Layout/AuthLayout";
import Alert from "../UI/Alert";
import { setAlert } from "../store/actions/alert";
import { login } from "../store/actions/auth";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const dispatch = useDispatch();
  const onChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const { isAuthenticated } = useSelector((state) => state.auth);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return dispatch(setAlert("Email address is required", "danger"));
    }

    if (!password) {
      return dispatch(setAlert("Password is required", "danger"));
    }
    await dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history]);

  return (
    <AuthLayout>
      <h1 className="">Sign In</h1>
      <p className="">Log in to your account to continue.</p>
      <Alert />
      <form className="text-left">
        <div className="form">
          <div id="username-field" className="field-wrapper input">
            <label htmlFor="username">Email Address</label>
            <FiUser className="feather feather-user" />
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              placeholder="e.g johndoe@gmail.com"
              onChange={onChange}
            />
          </div>

          <div id="password-field" className="field-wrapper input mb-2">
            <div className="d-flex justify-content-between">
              <label htmlFor="password">PASSWORD</label>
              <a
                href="auth_pass_recovery_boxed.html"
                className="forgot-pass-link"
              >
                Forgot Password?
              </a>
            </div>
            <FiLock className="feather feather-lock" />
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={onChange}
            />
          </div>
          <div className="d-sm-flex justify-content-between">
            <div className="field-wrapper">
              <button onClick={onSubmit} className="btn btn-primary" value="">
                Log In
              </button>
            </div>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
