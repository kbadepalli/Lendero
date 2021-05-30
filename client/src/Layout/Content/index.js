import PageHeader from "../Header/PageHeader";
import Footer from "../Footer";
import Alert from "../../UI/Alert";
const Content = (props) => {
  return (
    <>
      <div className="sub-header-container">
        <PageHeader {...props} />
      </div>
      <div className="layout-px-spacing">
        <Alert />
        <div className="row layout-top-spacing">{props.children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Content;
