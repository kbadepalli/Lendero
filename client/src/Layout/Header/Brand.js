import Logo from "../../assets/img/logo.png";
const Brand = () => {
  return (
    <ul className="navbar-item theme-brand flex-row  text-center">
      <li className="nav-item theme-logo">
        <a href="index.html">
          <img src={Logo} className="navbar-logo" alt="logo" />
        </a>
      </li>
      <li className="nav-item theme-text">
        <a href="index.html" className="nav-link">
          Lendero
        </a>
      </li>
    </ul>
  );
};

export default Brand;
