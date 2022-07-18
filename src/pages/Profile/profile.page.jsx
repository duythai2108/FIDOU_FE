import { InputNumber, Modal, Radio, Select } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getAuthen, postAuthen } from "../../axios/authenfunction";
import Demo from "../../components/Demo/demo.component";
import Job from "../../components/Job/job.component";
import API from "../../constans/api";
import path from "../../constans/path";
import { AccountContext } from "../../context/AccountProvider";
import { uploadFile } from "../../Firebase/service";
import "./profile.style.scss";
function Profile() {
  const location = useLocation();
  const { Option } = Select;
  let [prepareData, setPrepareData] = useState({
    sub: [],
    demos: [],
    account: [],
    jobs: [],
  });
  let { username } = useParams();
  let headerInfo = useRef(null);
  let [isSticky, setIsSticky] = useState(false);
  let [isShowAdd, setIsShowAdd] = useState(false);
  let [isEditable, setIsEditable] = useState(false);
  let [isShowAddJob, setIsShowAddJob] = useState(false);
  let file = useRef(null);
  let title = useRef(null);
  let title2 = useRef(null);
  const [value, setValue] = useState(1);
  let day = useRef(null);
  let hours = useRef(null);
  let minute = useRef(null);
  let description2 = useRef(null);
  let price = useRef(null);

  const isCompany = location.pathname.includes(path["COMPANY_PAGE"]);

  const accountContext = useContext(AccountContext);
  let { data } = accountContext;

  const onChange = (e) => {
    setValue(e.target.value);
  };
  let description = useRef(null);
  const handleScroll = () => {
    let headerOffset = headerInfo.current?.offsetTop;
    let pageOffset = window.pageYOffset;
    if (headerOffset && pageOffset > headerOffset) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    const fetchDataCadidates = async () => {
      const [sub, accountRequest] = await Promise.all([
        getAuthen(API["GET_SUBCATEGORY"]),
        // getAuthen(API["GET_DEMO"], true),
        getAuthen(API["GET_CANDIDATE_INFO"] + username),
      ]);
      console.log(accountRequest);
      setPrepareData({
        sub: sub.data.data,
        // demos: demos.data.data,
        account: accountRequest.data.data,
      });
    };

    const fetchDataEnterprise = async () => {
      const [sub, accountRequest] = await Promise.all([
        getAuthen(API["GET_SUBCATEGORY"]),
        getAuthen(API["GET_ENTERPRISE_INFO"] + username),
      ]);
      setPrepareData({
        sub: sub.data.data,
        account: accountRequest.data.data,
      });
    };

    if (isCompany) {
      fetchDataEnterprise();
    } else {
      fetchDataCadidates();
    }

    let account = JSON.parse(localStorage.getItem("account"));
    if (account?.id == username) {
      setIsEditable(true);
    }
    window.scrollTo(0, 0);
    handleScroll();
    window.addEventListener("scroll", (event) => {
      handleScroll();
    });
  }, []);

  const handelAddJob = () => {
    const txtTitle = title2.current.value;
    const txtDescription = description2.current.value;
    const txtDay = day.current.value;
    const txtHours = hours.current.value;
    const txtMinute = minute.current.value;
    const txtPrice = price.current.value;

    postAuthen(
      API["POST_JOB"],
      {
        name: txtTitle,
        description: txtDescription,
        dayDuration: new Number(txtDay),
        hourDuration: new Number(txtHours),
        minuteDuration: new Number(txtMinute),
        subCategoryId: value,
        price: new Number(txtPrice),
      },
      true
    )
      .then((response) => {
        setIsShowAddJob(false);
        Swal.fire("Thông báo", "Đăng job thành công!", "success");
      })
      .catch((error) => {
        setIsShowAddJob(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.msg,
        });
      });
  };

  const handelCreateDemo = () => {
    const txtfile = file.current.files[0];
    const txtTitle = title.current.value;
    const txtDescription = description.current.value;
    const url = uploadFile(txtfile, txtTitle, "audio/mpeg");
    url.then((response) => {
      postAuthen(
        API["POST_DEMO"],
        {
          title: txtTitle,
          description: txtDescription,
          url: response,
          subCategoryId: value,
        },
        true
      )
        .then((response) => {
          getAuthen(API["GET_DEMO"], true)
            .then((response) => {
              Swal.fire("Thông báo", "Đăng demo thành công!", "success");
              setIsShowAdd(false);
              prepareData.demos = response.data.data;
              setPrepareData(prepareData);
            })
            .catch();
        })
        .catch();
    });
  };
  return (
    <div className="profile">
      <div
        ref={headerInfo}
        className={`header-info ${isSticky ? "sticky" : ""}`}
      >
        <div className="row">
          <div className="header-info__avatar">
            <img
              src={
                isCompany
                  ? prepareData.account.logoUrl
                  : prepareData.account.avatarUrl
              }
              alt=""
            />
          </div>

          <div className="header-info__info">
            <h2>
              {prepareData.account.name} <i class="fa fa-check-circle"></i>
            </h2>
            <h4>
              <i class="fa fa-map-marker-alt"></i>{" "}
              <span>Thành phố {prepareData.account.province}</span>
            </h4>
          </div>
        </div>
        <div className="header-info__button">
          {isEditable ? (
            !isCompany ? (
              <div>
                <button
                  onClick={() => {
                    setIsShowAdd(true);
                  }}
                >
                  Add demo
                </button>
                <Modal
                  title="Add new demo"
                  centered
                  visible={isShowAdd}
                  onOk={() => handelCreateDemo()}
                  onCancel={() => setIsShowAdd(false)}
                  width={800}
                  className="modal-adddemo"
                >
                  <div className="modal-adddemo__skill box">
                    <h3>
                      Skill <span>*</span>
                    </h3>
                    <p>Select one skill this portfolio sample relates to.</p>
                    {!isCompany ? (
                      <div className="modal-adddemo__skill__list">
                        <Radio.Group onChange={onChange} value={value}>
                          {prepareData.sub?.length > 0
                            ? prepareData.sub.map((item, index) => {
                                return (
                                  <Radio value={item.id} key={index}>
                                    {item.name}
                                  </Radio>
                                );
                              })
                            : ""}
                        </Radio.Group>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="modal-adddemo__description box">
                    <h3>
                      Title <span>*</span>
                    </h3>
                    <p>
                      Include your languages, industry expertise, and any other
                      descriptives to get your portfolio samples the most views.
                    </p>
                    <input type="text" ref={title} />
                    <h3>
                      Description <span>*</span>
                    </h3>
                    <p>
                      Share some background and more information on this sample
                      and how you contributed to it.
                    </p>
                    <input type="text" ref={description} />
                  </div>

                  <div className="modal-adddemo__description box">
                    <h3>
                      Upload Audio File <span>*</span>
                    </h3>
                    <p>Limited to one file, must be MP3, and maximum 100 MB.</p>
                    <input type="file" ref={file} />

                    <h3>
                      Tone <span>*</span>
                    </h3>
                    <select>
                      <option disabled selected value>
                        -- Chọn --
                      </option>
                      <option value="0">Giọng trầm</option>
                      <option value="1">Giọng vừa</option>
                      <option value="2">Giọng cao</option>
                    </select>
                  </div>
                </Modal>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => {
                    setIsShowAddJob(true);
                  }}
                >
                  Add Job
                </button>
                <Modal
                  title="Add Job"
                  centered
                  visible={isShowAddJob}
                  onOk={() => handelAddJob()}
                  onCancel={() => setIsShowAddJob(false)}
                  width={800}
                  className="modal-adddemo"
                >
                  <div className="modal-adddemo__skill box">
                    <h3>
                      Sub Category <span>*</span>
                    </h3>
                    <p>Select one skill this portfolio sample relates to.</p>
                    <div className="modal-adddemo__skill__list">
                      <Radio.Group onChange={onChange} value={value}>
                        {prepareData.sub.length > 0
                          ? prepareData.sub.map((item, index) => {
                              return (
                                <Radio value={item.id} key={index}>
                                  {item.name}
                                </Radio>
                              );
                            })
                          : ""}
                      </Radio.Group>
                    </div>
                    <h3>
                      Tone <span>*</span>
                    </h3>
                    <select>
                      <option disabled selected value>
                        -- Chọn --
                      </option>
                      <option value="0">Giọng trâm</option>
                      <option value="1">Giọng vừa</option>
                      <option value="2">Giọng cao</option>
                    </select>
                  </div>
                  <div className="modal-adddemo__description box">
                    <h3>
                      Title <span>*</span>
                    </h3>
                    <p>
                      Include your languages, industry expertise, and any other
                      descriptives to get your portfolio samples the most views.
                    </p>
                    <input type="text" ref={title2} />
                    <h3>
                      Description <span>*</span>
                    </h3>
                    <p>
                      Share some background and more information on this sample
                      and how you contributed to it.
                    </p>
                    <input type="text" ref={description2} />
                  </div>

                  <div className="box">
                    <div className="row">
                      <h3>
                        Day Duration <span>*</span>
                      </h3>
                      <input type="number" ref={day} />
                    </div>
                    <div className="row">
                      <h3>
                        Hour Duration <span>*</span>
                      </h3>
                      <input type="number" ref={hours} />
                    </div>
                    <div className="row">
                      <h3>
                        Minute Duration <span>*</span>
                      </h3>
                      <input type="number" ref={minute} />
                    </div>
                    <div className="row">
                      <h3>
                        Price <span>*</span>
                      </h3>
                      <input type="number" ref={price} />
                    </div>
                  </div>
                </Modal>
              </div>
            )
          ) : data.account?.id == 1 && isCompany ? (
            <button>Invite to Job</button>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="profile__info">
        <div className="profile__info__left">
          {isCompany ? (
            <>
              <h3>Các dự án của {prepareData.account.name}</h3>
              <div className="">
                {prepareData.account.jobs &&
                prepareData.account.jobs?.length > 0 ? (
                  prepareData.account.jobs.map((item, index) => {
                    return (
                      <Job
                        title={item.name}
                        description={item.description}
                        key={index}
                        day={item.dayDuration}
                        hours={item.hourDuration}
                        minute={item.minuteDuration}
                        price={item.price}
                        id={item.id}
                        tone={item.tone}
                      />
                    );
                  })
                ) : (
                  <h6>Hiện tại {prepareData.account.name} chưa có job nào</h6>
                )}
              </div>
            </>
          ) : (
            <>
              <h3>Voice Over Demos</h3>
              {prepareData.account.voiceDemos?.length > 0 ? (
                prepareData.account.voiceDemos.map((item, index) => {
                  return (
                    <Demo
                      title={item.title}
                      src={item.url}
                      sub={item.subCategoryName}
                      key={index}
                      description={item.description}
                      tone={item.tone}
                    />
                  );
                })
              ) : (
                <h6>Hiện tại {prepareData.account.name} chưa có demo nào</h6>
              )}
            </>
          )}
        </div>
        <div className="profile__info__right">
          <div className="profile__info__right__info">
            <div className="item">
              <i class="fa fa-user-clock"></i>
              <strong>Member seen</strong> <br /> <span>29/05/2022</span>
            </div>
            <div className="item">
              <i class="fa fa-briefcase"></i>
              <strong>Completed Jobs</strong> <br /> <span>111</span>
            </div>
          </div>
          <div className="profile__info__right__description">
            <h3>About {prepareData.account.name}</h3>
            <p>{prepareData.account.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
