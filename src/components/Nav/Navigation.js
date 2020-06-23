import React from "react";
import { NavLink } from "react-router-dom";

class Navigation extends React.Component {
  render() {
    return (
      <div className="Nav">
        <nav>
          <section className="buttons">
            <div className="container">
              <a
                href="https://www.jsilvar.com"
                rel="noopener noreferrer"
                target="_blank"
                className="btn btn-1 "
              >
                <svg>
                  <rect x="0" y="0" fill="none" width="100%" height="100%" />
                </svg>
                Jsilvar
              </a>
            </div>
            <div className="container">
              <NavLink
                className="btn btn-1 "
                exact
                activeClassName="current"
                to="/contact"
              >
                <svg>
                  <rect x="0" y="0" fill="none" width="100%" height="100%" />
                </svg>
                Contact
              </NavLink>
            </div>
            <div className="container">
              <NavLink
                className="btn btn-1 "
                exact
                activeClassName="current"
                to="/about"
              >
                <svg>
                  <rect x="0" y="0" fill="none" width="100%" height="100%" />
                </svg>
                About
              </NavLink>
            </div>
            <div className="container">
              <NavLink
                className="btn btn-1 "
                exact
                activeClassName="current"
                to="/"
              >
                <svg>
                  <rect x="0" y="0" fill="none" width="100%" height="100%" />
                </svg>
                Home
              </NavLink>
            </div>
          </section>
        </nav>
      </div>
    );
  }
}
export default Navigation;
