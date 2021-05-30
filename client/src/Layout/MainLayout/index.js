import Header from "../Header";
import Sidebar from "../Sidebar";
import Content from "../Content";
const MainLayout = (props) => {
  return (
    <>
      <div className="header-container fixed-top">
        <Header />
      </div>
      <div className="main-container" id="container">
        <Sidebar />
        <div id="content" className="main-content">
          <Content {...props} />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
