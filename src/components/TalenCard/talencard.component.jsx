import React from "react";
import { Link } from "react-router-dom";
import PATH from "../../constans/path";
import "./talencard.style.scss";
function TalenCard() {
  return (
    <div className="talencard">
      <div className="talencard__avatar">
        <img
          src="https://voices-images.s3.amazonaws.com/11081855_HS_av.jpg"
          alt=""
        />
      </div>

      <div className="talencard__name">
        <h3>Bryan Olson</h3>
      </div>

      <div className="talencard__location">
        <i class="fa fa-map-marker-alt"></i>
        Ho Chi Minh City
      </div>

      <div className="talencard__audio">
        <h5>Test Audio</h5>

        <audio controls>
          <source src="images/audio.mp3" />
        </audio>
        <h6>Category</h6>
      </div>
      <Link to={PATH["PROFILE_PAGE"] + "/username"}>View Profile</Link>
    </div>
  );
}

export default TalenCard;
