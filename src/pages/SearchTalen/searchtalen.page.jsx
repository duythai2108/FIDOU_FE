import React, { useEffect, useReducer, useState } from "react";
import { getAuthen, getParam } from "../../axios/authenfunction";
import ProfileMini from "../../components/Profile-mini/ProfileMini.component";
import API from "../../constans/api";
import "./searchtalen.style.scss";

const queryReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      state[action.payload.field] = action.payload.value;
      return {
        ...state,
      };
    default:
      return state;
  }
};

function SearchTalen() {
  let [categories, setCategories] = useState([]);
  let [subCategories, setSubCategories] = useState([]);
  let [candidates, setCandidates] = useState([]);
  let [query, queryDispatch] = useReducer(queryReducer, {
    category: "",
    subCategory: "",
    gender: "",
    tone: "",
  });

  useEffect(() => {
    getAuthen(API["GET_SUBCATEGORY"]).then((response) => {
      setCategories(response.data.data);
    });
    getAuthen(API["GET_CATEGORY"]).then((response) => {
      setSubCategories(response.data.data);
    });
    search();
  }, []);

  const search = () => {
    let fullQuery = "?aa=1";

    if (query.category != "") {
      fullQuery += `&CategoryId=${query.category}`;
    }

    if (query.subCategory != "") {
      fullQuery += `&SubCategoryId=${query.subCategory}`;
    }

    if (query.gender != "") {
      fullQuery += `&Gender=${query.gender}`;
    }

    getParam(API["GET_CANDIDATE_FILTER"], fullQuery).then((response) => {
      console.log(response.data.data);
      setCandidates(response.data.data);
    });
  };

  useEffect(() => {
    console.log(query);
  }, [query]);

  return (
    <div className="search-talen">
      <div className="left">
        <div className="item">
          <h3>All Service</h3>
          <div className="list-service">
            <h4
              className={query?.category == "" ? "active" : ""}
              onClick={() => {
                queryDispatch({
                  type: "SET_FIELD",
                  payload: {
                    field: "category",
                    value: "",
                  },
                });
              }}
            >
              Tất cả
            </h4>
            {subCategories.map((item, index) => {
              return (
                <h4
                  className={query?.category == item.id ? "active" : ""}
                  onClick={() => {
                    queryDispatch({
                      type: "SET_FIELD",
                      payload: {
                        field: "category",
                        value: item.id,
                      },
                    });
                  }}
                >
                  {item.name}
                </h4>
              );
            })}
          </div>
        </div>
        <div className="item">
          <h3>Sub Category</h3>
          <select
            name=""
            id=""
            onChange={(e) => {
              queryDispatch({
                type: "SET_FIELD",
                payload: {
                  field: "subCategory",
                  value: e.target.value,
                },
              });
            }}
          >
            <option selected value>
              Tất cả
            </option>
            {categories.map((category, index) => {
              return (
                <option value={category.id} key={index}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="item">
          <h3>Gender</h3>
          <select
            name=""
            id=""
            onChange={(e) => {
              queryDispatch({
                type: "SET_FIELD",
                payload: {
                  field: "gender",
                  value: e.target.value,
                },
              });
            }}
          >
            <option selected value>
              Tất cả
            </option>
            <option value="0">Male</option>
            <option value="1">Female</option>
          </select>
        </div>
        <div className="item">
          <h3>Tone</h3>
          <select
            name=""
            id=""
            onChange={(e) => {
              queryDispatch({
                type: "SET_FIELD",
                payload: {
                  field: "tone",
                  value: e.target.value,
                },
              });
            }}
          >
            <option selected value>
              Tất cả
            </option>
            <option value="0">Giọng trầm</option>
            <option value="1">Giọng vừa</option>
            <option value="2">Giọng cao</option>
          </select>
        </div>

        <button className="button" onClick={search}>
          Tìm kiếm
        </button>
      </div>
      <div className="right">
        <h2>Danh sách ứng viên</h2>
        {candidates.map((item, index) => {
          return <ProfileMini data={item} />;
        })}
        {!candidates || candidates?.length == 0 ? (
          <p>Không có ứng cử viên nào!</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default SearchTalen;
