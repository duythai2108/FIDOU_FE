import { List } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./leftadmin.style.scss";
import ButtonItem from "../ButtonItem/buttonitem.component";
import path from "../../constans/path";
import CategoryIcon from "@mui/icons-material/Category";
function LeftAdmin({ accountAdmin, isShow, showNav }) {
  let [account, setAccount] = useState(accountAdmin);
  useEffect(() => {
    // const account = JSON.parse(localStorage.getItem("account"));
    // setAccount(account);
    console.log(account);
  }, []);
  return (
    <div className="">
      <div className={`dashboard__left ${isShow ? "active" : ""}`}>
        <Link to="/dashboard/profile">
          <div className="dashboard__left__profile">
            <img
              src={
                "https://as1.ftcdn.net/v2/jpg/02/43/51/48/1000_F_243514868_XDIMJHNNJYKLRST05XnnTj0MBpC4hdT5.jpg"
              }
              alt=""
            />
            <h6>Gia Bảo</h6>
          </div>
        </Link>

        <div className="dashboard__left__listpage">
          <List>
            <>
              <ButtonItem
                to={
                  "/" + path["ADMIN_PAGE"] + "/" + path["CATEGORY_ADMIN_PAGE"]
                }
                title="Category"
                showNav={showNav}
              >
                <CategoryIcon className="icon" />
              </ButtonItem>
              <ButtonItem
                to={
                  "/" +
                  path["ADMIN_PAGE"] +
                  "/" +
                  path["SUB_CATEGORY_ADMIN_PAGE"]
                }
                title="Sub Category"
                showNav={showNav}
              >
                <CategoryIcon className="icon" />
              </ButtonItem>
              <ButtonItem
                to={"/" + path["ADMIN_PAGE"] + "/" + path["DEPOSIT_ADMIN_PAGE"]}
                title="Deposit"
                showNav={showNav}
              >
                <CategoryIcon className="icon" />
              </ButtonItem>
              <ButtonItem
                to={"/" + path["ADMIN_PAGE"] + "/" + path["REPORT"]}
                title="Report"
                showNav={showNav}
              >
                <CategoryIcon className="icon" />
              </ButtonItem>
            </>
          </List>
        </div>
      </div>
      <div
        className={`overlay ${isShow ? "active" : ""}`}
        onClick={() => {
          showNav(false);
        }}
      ></div>
    </div>
  );
}

export default LeftAdmin;
