import Header from "../Header";

const AuthLayout = (props) => {
  return (
    <>
      <Header />

      <div className="form">
        <div className="form-container outer">
          <div className="form-form">
            <div className="form-form-wrap">
              <div className="form-container">
                <div className="form-content">{props.children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
