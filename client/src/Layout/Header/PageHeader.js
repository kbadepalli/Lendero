import { FiMenu } from "react-icons/fi";
const PageHeader = (props) => {
  return (
    <div className="sub-header-container">
      <header className="header navbar navbar-expand-sm">
        <a className="sidebarCollapse" data-placement="bottom" href="/">
          <FiMenu />
        </a>

        <ul className="navbar-nav flex-row">
          <li>
            <div className="page-header">
              <div className="page-title">
                <h3>{props.pageTitle}</h3>
              </div>
            </div>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default PageHeader;
