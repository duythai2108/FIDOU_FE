import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Tooltip } from "antd";
import React from "react";
import Swal from "sweetalert2";
import { putAuthen } from "../../axios/authenfunction";
import API from "../../constans/api";
import "./header.style.scss";
function Header({ orderId, title, description }) {
  return (
    <div className="headerchat">
      <div className="headerchat__info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <button
        className="button"
        onClick={() => {
          putAuthen(
            API["PUT_FINISH"],
            {
              orderId: orderId,
            },
            true
          ).then((response) => {
            Swal.fire("Thông báo", "Hoàn thành dự án", "success");
          });
        }}
      >
        Finish
      </button>
    </div>
  );
}

export default Header;
