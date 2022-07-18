import { Avatar, Button, Typography } from "antd";
import React, { useEffect, useContext } from "react";
import "./userinfo.style.scss";
import { auth, db } from "../../Firebase/config";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { AccountContext } from "../../context/AccountProvider";
// import { AuthContext } from "../../context/AuthProvider";
function UserInfo() {
  const navigation = useNavigate();
  // const data = useContext(AuthContext);
  const accountContext = useContext(AccountContext);
  let { infomation, account } = accountContext;
  const data = {};
  useEffect(() => {}, []);
  return (
    <div className="user__info">
      <div>
        <Avatar
          src={
            account
              ? account.role == 0
                ? infomation?.avatarUrl
                : infomation?.logoUrl
              : ""
          }
        ></Avatar>
        <Typography.Text className="user__info__name">
          {infomation?.name}
        </Typography.Text>
      </div>
      <Button
        ghost
        onClick={() => {
          navigation("/");
          auth.signOut();
        }}
      >
        Log Out
      </Button>
    </div>
  );
}

export default UserInfo;
