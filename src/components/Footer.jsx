import { Link } from "react-router-dom";

function Footer({ text, link }) {
  return (
    <footer className="footer">
      <div>
        <Link to={link} className="footer_link">
          {text}
        </Link>
      </div>
      <div>
        <p>Made by Bryan Teves - 2022</p>
      </div>
    </footer>
  );
}

export default Footer;
