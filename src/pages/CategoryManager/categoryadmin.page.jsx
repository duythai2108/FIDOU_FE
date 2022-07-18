import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Table from "../../components/table/table.component";
import { getAuthen } from "../../axios/authenfunction";
import API from "../../constans/api";
import TableColumnText from "../../components/table-column-text/table-column-text.component";
import { Modal } from "antd";
function CategoryAdmin() {
  const [data, setData] = useState([]);
  const columns = [
    { heading: "ID", value: "id" },
    { heading: "Name", value: "name" },
    { heading: "Sub Category", value: "subCategory" },
  ];

  useEffect(() => {
    getAuthen(API["GET_CATEGORY"])
      .then((response) => {
        console.log(response.data.data);
        setData(
          response.data.data.map((item) => {
            return {
              id: <TableColumnText data={item.id} />,
              name: <TableColumnText data={item.name} />,
              subCategory:
                item.subCategories.length == 0
                  ? "null"
                  : item.subCategories.map((cate) => {
                      return <div>{cate.name}</div>;
                    }),
            };
          })
        );
      })
      .catch();
  }, []);

  return (
    <div>
      <Table columns={columns} datas={data} />
    </div>
  );
}

export default CategoryAdmin;
