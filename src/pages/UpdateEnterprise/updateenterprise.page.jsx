import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { types } from "util";
import { getAuthen, putAuthen, postAuthen } from "../../axios/authenfunction";
import Row from "../../components/Row/row.component";
import UpdateTemplate from "../../components/UpdateTemplate/updatetemplate.component";
import API from "../../constans/api";
import { AccountContext } from "../../context/AccountProvider";
import "./updateenterprise.style.scss";

const fieldReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_FIELD":
      state[action.payload.field] = action.payload.value;
      return {
        ...state,
      };
    case "SET_DATA":
      console.log(action.payload);
      return {
        ...state,
        id: action.payload.id,
        description: action.payload.description,
        name: action.payload.name,
        logoUrl: action.payload.logoUrl,
        phoneContact: action.payload.phoneContact,
        emailContact: action.payload.emailContact,
        facebookUrl: action.payload.facebookUrl,
        twitterUrl: action.payload.twitterUrl,
        instagramUrl: action.payload.instagramUrl,
        linkedinUrl: action.payload.linkedinUrl,
        provinceCode: action.payload.provinceCode,
        districtCode: action.payload.districtCode,
        wardCode: action.payload.wardCode,
        address: action.payload.address,
        website: action.payload.website,
      };
    default:
      return state;
  }
};
function UpdateEnterprise() {
  let { id } = useParams();

  const accountContext = useContext(AccountContext);
  let { account, infomation, setInfomation, data } = accountContext;

  let [prepareData, setPrepareData] = useState({
    provices: [],
    district: [],
    wards: [],
  });

  let [fields, fieldsDispatch] = useReducer(fieldReducer, {
    id: null,
    description: null,
    name: null,
    logoUrl: null,
    phoneContact: null,
    emailContact: null,
    facebookUrl: null,
    twitterUrl: null,
    instagramUrl: null,
    linkedinUrl: null,
    provinceCode: null,
    districtCode: null,
    wardCode: null,
    address: null,
    website: null,
  });

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  const updateProfile = (e) => {
    e.preventDefault();

    if (data.information) {
      putAuthen(API["POST_ENTERPRISE_INFO"], fields, true)
        .then((response) => {
          Swal.fire(
            "Thông báo",
            "Bạn đã cập nhật thông tin thành công!",
            "success"
          );
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Vui lòng điền đầy đủ tất cả thông tin!",
          });
        });
    } else {
      postAuthen(API["POST_ENTERPRISE_INFO"], fields, true)
        .then((response) => {
          Swal.fire(
            "Thông báo",
            "Bạn đã cập nhật thông tin thành công!",
            "success"
          );
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Vui lòng điền đầy đủ tất cả thông tin!",
          });
        });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (data.information) {
      fieldsDispatch({
        type: "SET_DATA",
        payload: data.information,
      });
    }
    async function fetchData() {
      const [proviceRequest, districtRequest, wardRequest] = await Promise.all([
        getAuthen(API["GET_PROVICES"]),
        getAuthen(API["GET_DISTRIC"]),
        getAuthen(API["GET_WARD"]),
        // getAuthen(API["GET_ENTERPRISE_INFO"] + `${account.id}`),
      ]);

      prepareData.provices = proviceRequest.data.data;
      prepareData.district = districtRequest.data.data;
      prepareData.wards = wardRequest.data.data;
      setPrepareData(prepareData);
    }
    if (prepareData.district.length == 0) {
      fetchData();
    }
    if (data.information) {
      fieldsDispatch({
        type: "SET_DATA",
        payload: data.information,
      });
    }
  }, [prepareData, data]);

  return (
    <div className="updateenterprise">
      <UpdateTemplate
        saveFunction={updateProfile}
        fieldsDispatch={fieldsDispatch}
        fields={fields}
        imgField={"logoUrl"}
      >
        <div className="box">
          <Row justifyContent={"center"}>
            <h3>Thông tin</h3>
          </Row>
          <Row justifyContent={"between"}>
            <div className="item">
              <label htmlFor="">Tên công ty: </label>
              <input
                type="text"
                value={fields.name}
                onChange={(e) => {
                  fieldsDispatch({
                    type: "CHANGE_FIELD",
                    payload: {
                      field: "name",
                      value: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="item">
              <label htmlFor="">Website: </label>
              <input
                type="text"
                value={fields.website}
                onChange={(e) => {
                  fieldsDispatch({
                    type: "CHANGE_FIELD",
                    payload: {
                      field: "website",
                      value: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </Row>
          <Row justifyContent={"between"}>
            <div className="item">
              <label htmlFor="">Số điện thoại: </label>
              <input
                type="text"
                value={fields.phoneContact}
                onChange={(e) => {
                  fieldsDispatch({
                    type: "CHANGE_FIELD",
                    payload: {
                      field: "phoneContact",
                      value: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="item">
              <label htmlFor="">Email liên hệ: </label>
              <input
                type="text"
                value={fields.emailContact}
                onChange={(e) => {
                  fieldsDispatch({
                    type: "CHANGE_FIELD",
                    payload: {
                      field: "emailContact",
                      value: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </Row>
          <Row>
            <div className="item full">
              <label htmlFor="">Mô tả: </label>
              <textarea
                name=""
                id=""
                cols="10"
                rows="5"
                value={fields.description}
                onChange={(e) => {
                  fieldsDispatch({
                    type: "CHANGE_FIELD",
                    payload: {
                      field: "description",
                      value: e.target.value,
                    },
                  });
                }}
              ></textarea>
            </div>
          </Row>
        </div>
        <div className="box">
          <Row justifyContent={"center"}>
            <h3>Địa chỉ</h3>
          </Row>
          <Row justifyContent={"between"}>
            <div className="item">
              <label htmlFor="">Address </label>
              <input
                type="text"
                value={fields.address}
                onChange={(e) => {
                  fieldsDispatch({
                    type: "CHANGE_FIELD",
                    payload: {
                      field: "address",
                      value: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="item">
              <label htmlFor="">Thành phố </label>
              <select
                name=""
                id=""
                value={fields.provinceCode}
                onChange={(e) => {
                  fieldsDispatch({
                    type: "CHANGE_FIELD",
                    payload: {
                      field: "provinceCode",
                      value: e.target.value,
                    },
                  });
                }}
              >
                <option disabled selected value>
                  -- Chọn --
                </option>
                {prepareData.provices?.map((item, index) => {
                  return (
                    <option
                      value={item.code}
                      key={index}
                      selected={fields.provinceCode == item.code}
                    >
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </Row>
          <Row justifyContent={"between"}>
            <div className="item">
              <label htmlFor="">Quận </label>
              <select
                name=""
                id=""
                value={fields.districtCode}
                onChange={(e) => {
                  fieldsDispatch({
                    type: "CHANGE_FIELD",
                    payload: {
                      field: "districtCode",
                      value: e.target.value,
                    },
                  });
                }}
              >
                <option disabled selected value>
                  -- Chọn --
                </option>
                {prepareData.district?.map((item, index) => {
                  return (
                    <option
                      value={item.code}
                      key={index}
                      selected={fields.districtCode == item.code}
                    >
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="item">
              <label htmlFor="">Phường </label>
              <select
                name=""
                id=""
                value={fields.wardCode}
                onChange={(e) => {
                  fieldsDispatch({
                    type: "CHANGE_FIELD",
                    payload: {
                      field: "wardCode",
                      value: e.target.value,
                    },
                  });
                }}
              >
                <option disabled selected value>
                  -- Chọn --
                </option>
                {prepareData.wards?.map((item, index) => {
                  return (
                    <option
                      value={item.code}
                      key={index}
                      selected={fields.wardCode == item.code}
                    >
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </Row>
        </div>
        <div className="box">
          <Row justifyContent={"center"}>
            <h3>Mạng xã hội</h3>
          </Row>
          <Row justifyContent={"between"}>
            <div className="item">
              <label htmlFor="">Facebook: </label>
              <input
                type="text"
                value={fields.facebookUrl}
                onChange={(e) => {
                  fieldsDispatch({
                    type: "CHANGE_FIELD",
                    payload: {
                      field: "facebookUrl",
                      value: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="item">
              <label htmlFor="">Instagram: </label>
              <input
                type="text"
                value={fields.instagramUrl}
                onChange={(e) => {
                  fieldsDispatch({
                    type: "CHANGE_FIELD",
                    payload: {
                      field: "instagramUrl",
                      value: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </Row>
          <Row justifyContent={"between"}>
            <div className="item">
              <label htmlFor="">Linked In: </label>
              <input
                type="text"
                value={fields.linkedinUrl}
                onChange={(e) => {
                  fieldsDispatch({
                    type: "CHANGE_FIELD",
                    payload: {
                      field: "linkedinUrl",
                      value: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="item">
              <label htmlFor="">Twitter: </label>
              <input
                type="text"
                value={fields.twitterUrl}
                onChange={(e) => {
                  fieldsDispatch({
                    type: "CHANGE_FIELD",
                    payload: {
                      field: "twitterUrl",
                      value: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </Row>
        </div>
      </UpdateTemplate>
    </div>
  );
}

export default UpdateEnterprise;
