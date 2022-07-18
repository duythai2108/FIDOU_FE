import React, { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";
import LabelStatus from "../label-status/label-status.component";
import "./job.style.scss";
import { Avatar, Tooltip } from "antd";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { postAuthen, putAuthen } from "../../axios/authenfunction";
import API from "../../constans/api";
import { addDoc, collection, db } from "../../Firebase/config";
import { ORDER_STATUS } from "../../constans/enum";
import { async } from "@firebase/util";
import { useEffect } from "react";
import { uploadFile } from "../../Firebase/service";
function Job({
  id,
  title,
  description,
  day,
  hours,
  minute,
  price,
  listTalen,
  jobId,
  jobName,
  tone,
  jobStatus,
  showAddtofavorite,
  review,
  report,
  orderId,
}) {
  let accountContext = useContext(AccountContext);
  let { data } = accountContext;

  const showReview = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Đánh giá ứng cử viên",
      html: `
        <div class="row">
          <div>
            <input type="range"  id="swal-input1" class="swal2-input" min="0" max="5">
          </div>
          <textarea name="" id="swal-input2" placeholder="Nội dung đánh giá" cols="30" rows="5"></textarea>
        </div>
      `,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Gửi đánh giá",
      preConfirm: () => {
        return {
          id: orderId,
          reviewPoint: document.getElementById("swal-input1").value,
          content: document.getElementById("swal-input2").value,
        };
      },
    });

    const showReport = async () => {
      const { value: formValues } = await Swal.fire({
        title: "Đánh giá ứng cử viên",
        html: `
          <div class="row">
            <div>
              <input type="range"  id="swal-input1" class="swal2-input" min="0" max="5">
            </div>
            <textarea name="" id="swal-input2" placeholder="Nội dung đánh giá" cols="30" rows="5"></textarea>
          </div>
        `,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: "Gửi đánh giá",
        preConfirm: () => {
          return {
            id: orderId,
            reviewPoint: document.getElementById("swal-input1").value,
            content: document.getElementById("swal-input2").value,
          };
        },
      });
    };
    if (formValues) {
      postAuthen(API["POST_REVIEW"], formValues, true)
        .then((response) => {
          Swal.fire(
            "Thông báo!",
            "Đánh giá ứng cử viên thành công!",
            "success"
          );
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
      console.log(formValues);
    }
  };

  const showReport = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Báo cáo ứng cử viên",
      html: `
        <div class="row">
          <div>
            <input type="file"  id="swal-input1">
          </div>
          <textarea name="" id="swal-input3" placeholder="Nội dung đánh giá" cols="30" rows="5"></textarea>
        </div>
      `,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Gửi báo cáo",
      preConfirm: async () => {
        const url = await uploadFile(
          document.getElementById("swal-input1").files[0],
          data.account?.id + new Date(),
          "audio/mpeg"
        );
        console.log(url);
        return {
          id: orderId,
          voiceLink: url,
          content: document.getElementById("swal-input3").value,
        };
        // url?.then((response) => {
        //   console.log(response);
        //   return {
        //     id: orderId,
        //     voiceLink: response,
        //     content: document.getElementById("swal-input2").value,
        //   };
        // });
      },
    });

    if (formValues) {
      postAuthen(API["POST_REPORT"], formValues, true)
        .then((response) => {
          Swal.fire("Thông báo!", "Báo cáo ứng cử viên thành công!", "success");
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
      console.log(formValues);
    }
  };

  const createRoom = (id1, id2, title, orderId) => {
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
    addDoc(collection(db, "room"), {
      title: title,
      description: "tesst new",
      lastSent: dateString,
      user: [id1, id2],
      orderId: orderId,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const approveJob = (orderId, jobId) => {
    putAuthen(
      API["APPROVE_JOB"],
      {
        orderId,
        jobId,
      },
      true
    ).then((response) => {
      console.log(response);
      Swal.fire("Thông báo!", "Approve Job thành công", "success").then(() => {
        createRoom(
          response.data.data.candidateId,
          data.account.id,
          "Group chat " + jobName,
          orderId
        );
      });
    });
  };

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

  const handleApplyJob = (jobId, price) => {
    const fee = price * 0.2;
    Swal.fire({
      title: "Bạn có muốn tiếp tục?",
      text:
        "Khi ứng tuyển vào dự này bạn sẽ bị khóa " + fee + "$ trong tài khoản.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#79be82",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ứng tuyển",
    }).then((result) => {
      if (result.isConfirmed) {
        postAuthen(
          API["POST_ORDER"],
          {
            jobId: jobId,
          },
          true
        )
          .then((response) => {
            Swal.fire(
              "Thông báo!",
              "Apply vào dự án " + title + " success",
              "success"
            );
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.msg,
            });
          });
      }
    });
  };

  const addToFavorite = async (jobId) => {
    try {
      await postAuthen(
        API["FAVORITE_JOB"],
        {
          jobId: jobId,
        },
        true
      );
      Swal.fire(
        "Thông báo!",
        "Thêm vào danh sách yêu thích thành công",
        "success"
      );
    } catch (e) {
      if (
        (e.response.data.msg =
          "This Candidate have added this Job to FavouriteJob before.")
      ) {
        Swal.fire("Công việc này đã nằm trong danh sách yêu thích của bạn!");
      }
    }
  };

  return (
    <div className="job">
      <div className="title">
        <h4>
          {title}
          <LabelStatus
            label={ORDER_STATUS[jobStatus]?.title}
            state={ORDER_STATUS[jobStatus]?.state}
          />
        </h4>
        {showAddtofavorite ? (
          <button
            onClick={() => {
              addToFavorite(jobId);
            }}
          >
            + thêm vào danh sách yêu thích
          </button>
        ) : (
          ""
        )}
      </div>
      <p>{description}</p>
      <div className="">
        {day ? <LabelStatus label={day + " day"} state={"info"} /> : ""}
        {hours ? <LabelStatus label={hours + " hours"} state={"info"} /> : ""}
        {minute ? (
          <LabelStatus label={minute + " minute"} state={"info"} />
        ) : (
          ""
        )}
        <LabelStatus label={convertTone(tone)} state={"info"} />
      </div>
      <h5>{price}$</h5>
      <div className="job_button">
        <div className="candidate">
          {listTalen?.map((item, index) => {
            return (
              <div className="candidate__item" key={index}>
                <Link to={`/profile/${item.candidate.id}`} target={"_blank"}>
                  <Tooltip title={item.candidate.name}>
                    <Avatar src={item.candidate.avatarUrl}></Avatar>
                  </Tooltip>
                </Link>
                <button
                  className="button"
                  onClick={() => {
                    approveJob(item.id, jobId);
                  }}
                >
                  Approve
                </button>
              </div>
            );
          })}
          {listTalen?.length == 0 ? <p>Chưa có ai nhận</p> : ""}
        </div>
        {data.account?.role == 0 && jobStatus == 0 ? (
          <button
            className="button"
            onClick={() => {
              handleApplyJob(id, price);
            }}
          >
            Nhận công việc
          </button>
        ) : (
          ""
        )}
      </div>
      {review ? (
        <div className="review">
          <button
            className="button"
            onClick={() => {
              showReview(jobId);
            }}
          >
            Review
          </button>
        </div>
      ) : (
        ""
      )}
      {console.log("alo: " + report)}
      {report ? (
        <div className="review">
          <button
            className="button"
            onClick={() => {
              showReport();
            }}
          >
            Report
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Job;
