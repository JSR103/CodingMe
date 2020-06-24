import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faLinkedinIn,
  faGoogle
} from "@fortawesome/free-brands-svg-icons";

export default class Footer extends React.Component {
  render() {
    return (
      <div className="Footer">
        <footer>
          <ul className="Table">
            <li>
              <a href="https://github.com/jsr103" rel="noopener">
                <i className="icon">
                  <FontAwesomeIcon icon={faGithub} />
                </i>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/joelsilva_103" rel="noopener">
                <i className="icon">
                  <FontAwesomeIcon icon={faTwitter} />
                </i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/jsr103/" rel="noopener">
                <i className="icon">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </i>
              </a>
            </li>
            <li>
              <a href="mailto:silva.joel.r@gmail.com">
                <i className="icon">
                  <FontAwesomeIcon icon={faGoogle} />
                </i>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    );
  }
}
