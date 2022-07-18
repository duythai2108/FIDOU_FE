import React from "react";
import "./demo.style.scss";
function Demo({ title, src, sub, description, tone }) {
  const convertTone = (tone) => {
    switch (tone) {
      case 0:
        return <span>Giọng trầm</span>;
      case 1:
        return <span>Giọng vừa</span>;
      case 2:
        return <span>Giọng cao</span>;
      default:
        return <span></span>;
    }
  };

  return (
    <div className="demo">
      <div className="demo__title">
        <h4>{title}</h4>
      </div>
      <div className="demo__audio">
        <audio controls>
          <source src={src} />
        </audio>
      </div>
      <div className="demo__category">
        <div className="demo__category__icon">
          <i class="fa fa-microphone"></i>
        </div>
        <span>{sub}</span>
      </div>
      <div className="demo__category">
        <div className="demo__category__icon">
          <i class="fa fa-broadcast-tower"></i>
        </div>
        {convertTone(tone)}
      </div>
      <p>{description}</p>
    </div>
  );
}

export default Demo;
