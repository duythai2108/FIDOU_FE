import { Button } from "antd";
import React, { useContext, useEffect, useRef } from "react";
import Header from "./header.component";
import Message from "./message.component";
import {
  onSnapshot,
  collection,
  db,
  query,
  where,
  addDoc,
} from "../../Firebase/config";
import "./messagedetail.style.scss";
import { useState } from "react";
import Progressbar from "../progressbar/progressbar.component";
import { AccountContext } from "../../context/AccountProvider";
import { orderBy, Query, Timestamp } from "firebase/firestore";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Swal from "sweetalert2";
import { uploadFile } from "../../Firebase/service";
function MessageDetail({ onRoom }) {
  let [listMessage, setListMessage] = useState([]);

  const accountContext = useContext(AccountContext);
  let { data } = accountContext;
  let [message, setMessage] = useState("");
  let messagesEndRef = useRef(null);
  useEffect(() => {
    setListMessage([]);
    const q = query(
      collection(db, "message"),
      where("roomId", "==", onRoom.id)
    );
    const unsubscribe = onSnapshot(
      q,
      orderBy("timeCreate"),
      (querySnapshot) => {
        let newList = querySnapshot.docs.map((doc) => {
          return doc.data();
        });

        newList.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return a.timeCreate.seconds - b.timeCreate.seconds;
        });
        setListMessage(newList);
      }
    );
  }, [onRoom]);

  const sentMessage = (type, url) => {
    const date = new Date();
    const dateString =
      date.getDate() +
      "/" +
      date.getMonth() +
      "/" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes();

    if (type == "text") {
      addDoc(collection(db, "message"), {
        message,
        roomId: onRoom.id,
        time: dateString,
        userId: data.account.id,
        timeCreate: new Date(),
        type,
      });
      setMessage("");
    } else if (type == "file") {
      addDoc(collection(db, "message"), {
        roomId: onRoom.id,
        time: dateString,
        userId: data.account.id,
        timeCreate: new Date(),
        file: url,
        type,
      });
    }
  };

  return (
    <div className="message-detail">
      <Header
        orderId={onRoom.orderId}
        title={onRoom.title}
        description={onRoom.description}
      />
      <Progressbar />
      <div className="message-detail__message">
        {listMessage.map((item, index) => {
          console.log(item);
          return (
            <Message
              key={index}
              text={item.message}
              displayName="Tran Gia Bao"
              createAt={item.time}
              isMe={item.userId === data.account.id}
              type={item.type}
              src={item.file}
              photoUrl="https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-1/275574033_518704032954411_7958421894480264220_n.jpg?stp=c0.60.720.720a_dst-jpg_p720x720&_nc_cat=102&ccb=1-6&_nc_sid=0c64ff&_nc_ohc=E7FptuKn4qwAX-BuDlz&_nc_ht=scontent.fsgn5-12.fna&edm=AOf6bZoEAAAA&oh=00_AT-LxGuFDE2r-LiuKHZXK0F43KAQDTRm925uOB4qh8JPUw&oe=6285EC3E"
            />
          );
        })}
        <div ref={messagesEndRef}></div>
        {messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })}
      </div>
      <div className="message-detail__input">
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value != "") {
              sentMessage("text");
            }
          }}
        />

        <AttachFileIcon
          style={{ marginRight: "10px" }}
          onClick={() => {
            Swal.fire({
              title: "Đăng file",
              showDenyButton: true,
              html: "<input type='file' id='file-chat'/>",
              confirmButtonText: "Save",
              denyButtonText: `Don't save`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                const file = document.getElementById("file-chat");
                const url = uploadFile(
                  file.files[0],
                  data.account?.id + new Date(),
                  "audio/mpeg"
                );

                url.then((response) => {
                  sentMessage("file", response);
                });
              }
            });
          }}
        />
        <Button
          ghost
          onClick={() => {
            sentMessage("text");
          }}
        >
          Sent
        </Button>
      </div>
    </div>
  );
}

export default MessageDetail;
