import React from "react";
import { Link } from "react-router-dom";
import "./background.style.scss";
function Background() {
  return (
    <div className="background">
      <div className="background__left">
        <h1>The World's #1 Voice Over Marketplace</h1>
        <p>
          Quickly and easily hire professional and multilingual voice actors for
          any creative project.
        </p>
        <div className="background__left__button">
          <button>
            <Link to={"/search/candidate"}>Seach Talen</Link>
          </button>
          <button>
            <Link to={"/search/job"}>Find Work</Link>
          </button>
        </div>
      </div>
      <div className="background__right">
        <img src="images/bg.webp" alt="" />
      </div>
    </div>
  );
}

export default Background;
