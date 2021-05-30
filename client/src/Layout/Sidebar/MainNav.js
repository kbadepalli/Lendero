import { Link } from "react-router-dom";
import {
  FiHome,
  FiDollarSign,
  FiUsers,
  FiChevronDown,
  FiFile,
} from "react-icons/fi";
const MainNav = () => {
  return (
    <nav id="sidebar">
      <div className="shadow-bottom"></div>

      <ul className="list-unstyled menu-categories ps" id="accordionExample">
        <li className="menu">
          <Link
            to="/"
            aria-expanded="false"
            data-active="true"
            className="dropdown-toggle"
          >
            <div className="">
              <FiHome />
              <span> Dashboard</span>
            </div>
          </Link>
        </li>
        <li className="menu">
          <Link to="/loans" aria-expanded="false" className="dropdown-toggle">
            <div className="">
              <FiDollarSign />
              <span> Loans</span>
            </div>
          </Link>
        </li>
        <li className="menu">
          <Link to="/clients" aria-expanded="false" className="dropdown-toggle">
            <div className="">
              <FiUsers />
              <span>Clients</span>
            </div>
          </Link>
        </li>
        <li className="menu">
          <a
            href="# "
            data-toggle="collapse"
            aria-expanded="false"
            className="dropdown-toggle"
          >
            <div className="">
              <FiFile />
              <span> Users</span>
            </div>
            <div>
              <FiChevronDown />
            </div>
          </a>
          <ul
            className="collapse submenu list-unstyled show"
            id="submenu2"
            data-parent="#accordionExample"
          >
            <li>
              <Link to="/users"> Users </Link>
            </li>
            <li>
              <Link to="/roles"> Roles </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;
