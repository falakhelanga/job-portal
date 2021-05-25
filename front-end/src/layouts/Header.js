import React from "react";
import { Container, NavDropdown } from "react-bootstrap";
import Logo from "../components/headerComps/Logo";
import Navigation from "../components/headerComps/Navigaton";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Search, { MobileSearch } from "../components/headerComps/Search";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Header = () => {
  const token = useSelector((state) => state.userLogin.token);
  const isEmployer = useSelector((state) => state.userLogin.isEmployer);
  const isAuth = token;
  return (
    <div className="header_wrapper bg-dark d-flex flex-column align-items-center">
      <Container
        className="d-flex  justify-content-between align-items-center"
        style={{
          height: "100%",
        }}
      >
        <Logo />
        <Search />
        <Navigation>
          <ul className="header_nav_ul d-flex align-items-center text-white">
            <li>
              {isAuth && !isEmployer && (
                <NavLink to="/wishList" className="nav-links">
                  <FavoriteIcon />
                </NavLink>
              )}
            </li>
            <li>
              {isAuth &&
                (isEmployer ? (
                  <NavLink
                    to="/employerjobs/?page=1"
                    className="nav-links login mr-2"
                  >
                    Employer
                  </NavLink>
                ) : (
                  <NavDropdown
                    title={<AccountBoxIcon style={{ color: "white" }} />}
                    id="nav-dropdown"
                  >
                    <NavDropdown.Item eventKey="4.1">
                      <NavLink
                        to="/profile"
                        className="nav-links"
                        style={{ color: "black" }}
                      >
                        Profile
                      </NavLink>
                    </NavDropdown.Item>

                    <NavDropdown.Item eventKey="4.1">
                      <NavLink
                        to="/applications"
                        className="nav-links"
                        style={{ color: "black" }}
                      >
                        Applications
                      </NavLink>
                    </NavDropdown.Item>
                  </NavDropdown>
                ))}
            </li>
            <li>
              {isAuth ? (
                <Link to="/logout" className="login nav-links">
                  <PowerSettingsNewIcon />
                </Link>
              ) : (
                <Link to="/login" className="login nav-links">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </Navigation>
      </Container>
      <MobileSearch />
    </div>
  );
};

export default Header;
