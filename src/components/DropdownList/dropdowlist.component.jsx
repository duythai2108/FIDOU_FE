import { Dropdown, Menu } from "antd";
import React from "react";
import "./dropdown.style.scss";
function DropdownList() {
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              1st menu item
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.aliyun.com"
            >
              2nd menu item
            </a>
          ),
        },
        {
          key: "3",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.luohanacademy.com"
            >
              3rd menu item
            </a>
          ),
        },
      ]}
    />
  );

  return (
    <div className="dropdownlist">
      <Dropdown overlay={menu} placement="bottom">
        <span>Voice Over</span>
      </Dropdown>

      <Dropdown overlay={menu} placement="bottom">
        <span>Audio Production</span>
      </Dropdown>

      <Dropdown overlay={menu} placement="bottom">
        <span>Music</span>
      </Dropdown>

      <Dropdown overlay={menu} placement="bottom">
        <span>Translation</span>
      </Dropdown>

      <Dropdown overlay={menu} placement="bottom">
        <span>All Service</span>
      </Dropdown>
    </div>
  );
}

export default DropdownList;
