import React from "react";
import { Link } from "react-router-dom";
import PATH from "../../constans/path";
import "./footer.style.scss";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__1">
        <Link to={PATH["HOME_PAGE"]}>
          <img src="/images/logo.webp" alt="" />
        </Link>
        <p>
          Voices is the world's #1 voice marketplace with over 2 million
          members. Since 2005, the biggest and most beloved brands have trusted
          Voices to help them find professionals to bring their projects to
          life.
        </p>
      </div>
      <div className="footer__2">
        <h1>Company</h1>
        <span>About</span>
        <span>Contact</span>
        <span>Careers</span>
        <span>Press</span>
        <span>Report</span>
      </div>
      <div className="footer__3">
        <h1>Learn</h1>
        <span>Help</span>
        <span>Blog</span>
        <span>Podcart</span>
        <span>Resources</span>
        <span>Events</span>
      </div>
    </footer>
  );
}

export default Footer;
