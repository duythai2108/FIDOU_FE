import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdmin } from "../../axios/authenfunction";
import TableColumnText from "../../components/table-column-text/table-column-text.component";
import Table from "../../components/table/table.component";
import API from "../../constans/api";

function Report() {
  const [data, setData] = useState([]);
  const columns = [
    { heading: "ID", value: "id" },
    { heading: "Created Time", value: "createdTime" },
    { heading: "Is Reviewed", value: "isReviewed" },
    { heading: "Voice", value: "voiceLink" },
  ];

  useEffect(() => {
    getAdmin(API["GET_REPORT_LIST"], true)
      .then((response) => {
        console.log(response.data.data);
        setData(
          response.data.data.map((item) => {
            const date = new Date(item.createdTime);
            console.log(item.isReviewed);
            return {
              id: item.id,
              createdTime: <TableColumnText data={date.toDateString()} />,
              isReviewed: (
                <TableColumnText data={item.isReviewed ? "done" : ""} />
              ),
              voiceLink: (
                <a href={item.voiceLink} target="_blank">
                  voice
                </a>
              ),
            };
          })
        );
      })
      .catch();
  }, []);

  // const add = async () => {
  //   const { value: formValues } = await Swal.fire({
  //     title: "Nạp tiền",
  //     html: `<div class="add-money">
  //       <div><label htmlFor="swal-input1">Số tiền: </label><input id="swal-input1" class="swal2-input"></div>
  //       <div><label htmlFor="swal-input2">Ví: </label><input id="swal-input2" class="swal2-input"></div>
  //     </div>`,
  //     focusConfirm: false,
  //     preConfirm: () => {
  //       postAdmin(
  //         API["POST_DEPOSIT"],
  //         {
  //           amount: Number(document.getElementById("swal-input1").value),
  //           depositCode: document.getElementById("swal-input2").value,
  //         },
  //         true
  //       )
  //         .then((response) => {
  //           setData([]);
  //           Swal.fire("Thông báo", "Nạp tiền thành công", "success");
  //         })
  //         .catch((error) => {
  //           Swal.fire({
  //             icon: "error",
  //             title: "Oops...",
  //             text: "Something went wrong!",
  //           });
  //         });
  //     },
  //   });

  //   if (formValues) {
  //     Swal.fire(JSON.stringify(formValues));
  //   }
  // };

  return (
    <div>
      <Table columns={columns} datas={data} />
    </div>
  );
}

export default Report;
