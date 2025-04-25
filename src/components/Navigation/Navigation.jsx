import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={s.nav}>
      <NavLink className={s.navItem} to="/">
        Home
      </NavLink>{" "}
      | {""}
      <NavLink className={s.navItem} to="/movies">
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
