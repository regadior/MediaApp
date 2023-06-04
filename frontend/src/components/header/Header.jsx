import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
import usuarionolog from "../icons/usuarionolog.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/AuthUser";
import "./Header.css";
export default function Header() {
  const userData = JSON.parse(window.localStorage.getItem("userLoginData"));
  console.log(userData);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authUser.isLoggedIn);
  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("userData");
    window.localStorage.removeItem("userLoginData");
  };
  return (
    <header>
      <div className="header2">
        <div className="header_logo">
          <Link className="header_Link" to="/?page=1&pageSize=20&search=&plattform=&genre">
            <img src={logo} alt="User avatar" />
          </Link>
        </div>
        <ul className="header_nav">
          <li>
            <Link className="header_Link" to="/?page=1&search=&plattform=&genre">
              Search
            </Link>
          </li>
          <li>
            <Link className="header_Link" to={isLoggedIn ? `/${userData.username}/lists` : "/login"}>
              My Lists
            </Link>
          </li>
        </ul>
        <div className="header_perfil">
          {isLoggedIn ? (
            <>
              <Link
                className="header_Link header_login1"
                to={`/${userData.username}`}
              >
                <img src={usuarionolog} alt="User avatar" />
              </Link>
              <div onClick={handleLogout}>logout</div>
            </>
          ) : (
            <Link className="header_Link header_login2" to={`/login`}>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
