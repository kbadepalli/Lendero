import AuthLayout from "../Layout/AuthLayout";
import { FiAtSign } from "react-icons/fi";
const ForgotPassword = () => {
  return (
    <AuthLayout>
      <h1 className="">Password Recovery</h1>
      <p className="signup-link recovery">
        Enter your email and instructions will be sent to you!
      </p>
      <form className="text-left">
        <div className="form">
          <div id="email-field" className="field-wrapper input">
            <div className="d-flex justify-content-between">
              <label htmlFor="email">EMAIL</label>
            </div>
            <FiAtSign className="feather feather-at-sign" />
            <input
              id="email"
              name="email"
              type="text"
              className="form-control"
              value=""
              placeholder="Email"
            />
          </div>

          <div className="d-sm-flex justify-content-between">
            <div className="field-wrapper">
              <button type="submit" className="btn btn-primary" value="">
                Reset
              </button>
            </div>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
