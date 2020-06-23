import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <NavLink exact activeClassName="current" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="current" to="/about">
          About
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="current" to="/contact">
          Contact
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
