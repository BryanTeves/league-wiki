import { FaLinkedin, FaGithub } from "react-icons/fa";

function Header() {
  return (
    <header className="header">
      <div>
        <h1 className="header_h1">League Wiki</h1>
      </div>
      <div className="header_ul-div">
        <ul className="header_ul-list">
          <li className="header_ul-list-item">
            <a
              href="https://www.linkedin.com/in/bryan-teves-freitas-6674ba233/"
              target="_blank"
              className="linkedin social"
              rel="noreferrer"
            >
              <FaLinkedin />{" "}
            </a>
          </li>
          <li className="header_ul-list-item">
            <a
              href="https://github.com/BryanTeves"
              target="_blank"
              className="github social"
              rel="noreferrer"
            >
              <FaGithub />{" "}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
