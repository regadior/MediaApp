import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
import usuarionolog from "../icons/usuarionolog.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/AuthUser";
import "./Header.css";
export default function Header() {
  let usuario = "regadior";
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authUser.isLoggedIn);
  console.log(isLoggedIn);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <header>
      <div className="header2">
        <div className="header_logo">
          <Link className="header_Link" to="/">
            <img src={logo} alt="User avatar" />
          </Link>
        </div>
        <ul className="header_nav">
          <li>
            <Link className="header_Link" to="/">
              Buscar
            </Link>
          </li>
          <li>
            <Link className="header_Link" to={`/${usuario}/listas`}>
              Mis listas
            </Link>
          </li>
        </ul>
        <div className="header_perfil">
          {isLoggedIn ? (
            <>
              <Link
                className="header_Link header_login1"
                to={`/profile/${usuario}`}
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
