import { Avatar, Tooltip } from "antd";
import React from "react";
import Swal from "sweetalert2";
import "./message.style.scss";
function Message({ text, displayName, createAt, photoUrl, isMe, type, src }) {
  return (
    <div className={`message ${isMe ? "me" : ""}`}>
      {console.log(type)}
      <div className="wrapper">
        <div>
          <Tooltip title={displayName}>
            <Avatar src={photoUrl} />
          </Tooltip>
        </div>
        <div className="message__text">
          <Tooltip title={createAt}>
            {type == "text" ? (
              <p>{text}</p>
            ) : (
              <audio
                controls
                onTimeUpdate={(e) => {
                  const total = e.target.duration;
                  const limit = total * 0.1;
                  const currentTime = e.target.currentTime;
                  if (currentTime > limit) {
                    e.target.pause();
                    Swal.fire("Kết thúc dự án để nghe toàn bộ!");
                  }
                }}
              >
                <source src={src} />
              </audio>
            )}
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default Message;
