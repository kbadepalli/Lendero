import Brand from "./Brand";
import UserCard from "./UserCard";
const Header = () => {
  return (
    <header className="header navbar navbar-expand-sm">
      <Brand />
      <UserCard />
    </header>
  );
};

export default Header;
