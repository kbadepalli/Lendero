import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/actions/auth";
import UserImg from "../../assets/img/user.png";
import { FiUser, FiInbox, FiLock, FiLogOut } from "react-icons/fi";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
const UserCard = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const signOut = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return isAuthenticated ? (
    <ul className="navbar-item flex-row ml-md-auto">
      <Dropdown
        nav={true}
        className="nav-item user-profile-dropdown"
        isOpen={dropdownOpen}
        toggle={toggle}
      >
        <DropdownToggle
          tag="a"
          data-toggle="dropdown"
          className="nav-link dropdown-toggle user"
        >
          <img src={UserImg} alt="avatar" />
        </DropdownToggle>
        <DropdownMenu className="position-absolute">
          <DropdownItem>
            <a className="" href="user_profile.html">
              <FiUser />
              My Profile
            </a>
          </DropdownItem>
          <DropdownItem>
            <a className="" href="apps_mailbox.html">
              <FiInbox />
              Inbox
            </a>
          </DropdownItem>
          <DropdownItem>
            <a className="" href="auth_lockscreen.html">
              <FiLock />
              Lock Screen
            </a>
          </DropdownItem>
          <DropdownItem>
            <a className="" href=" " onClick={signOut}>
              <FiLogOut />
              Sign Out
            </a>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ul>
  ) : (
    "Login"
  );
};

export default UserCard;
