import { NavLink } from "react-router-dom";

const Main = () => {
  return (
    <nav className="nav d-flex justify-content-between  lead">
      <NavLink className="nav-link" aria-current="page" to="/">
        Home
      </NavLink>
      <NavLink className="nav-link" to="/login">
        Login
      </NavLink>
      <NavLink className="nav-link" to="/register">
        Register
      </NavLink>

      <div className="dropdown">
        <li>
          <NavLink
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            User
          </NavLink>
          <ul className="dropdown-menu">
            <li>
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/logout">
                Logout
              </NavLink>
            </li>
          </ul>
        </li>
      </div>
    </nav>
  );
};

export default Main;
