import { Collapse, Dropdown, Menu, Modal, Select } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, ggProvider } from "../../Firebase/config.js";
import { postAuthen } from "../../axios/authenfunction";
import InfoIcon from "@mui/icons-material/Info";
import API from "../../constans/api";
import PATH from "../../constans/path";
import "antd/dist/antd.css";
import "./header.style.scss";
import {
  BarsOutlined,
  CaretDownOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import EmailIcon from "@mui/icons-material/Email";
import { checkEmail, checkEqual, checkLength } from "../../Utils/validation.js";
import Swal from "sweetalert2";
import { AccountContext } from "../../context/AccountProvider.jsx";
import path from "../../constans/path";
function Header() {
  let navigate = useNavigate();
  let accountContext = useContext(AccountContext);
  let { account, setAccount, setInfomation, infomation, dispatch, data } =
    accountContext;

  const { Panel } = Collapse;
  const [isModalVisibleLogin, setIsModalVisibleLogin] = useState(false);
  const [isModalVisibleSignup, setIsModalVisibleSignup] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [signUpUser, setSignUpUser] = useState({});
  const [role, setRole] = useState(1);
  // const [account, setAccount] = useState({});
  let email = useRef(null);
  let phone = useRef(null);
  let password = useRef(null);
  let rePassword = useRef(null);
  let username = useRef(null);
  let passwordLogin = useRef(null);

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Link
              to={
                (data.account?.role == 0
                  ? PATH["PROFILE_PAGE"]
                  : PATH["COMPANY_PAGE"]) + `/${data.account?.id}`
              }
            >
              Your public profile
            </Link>
          ),
        },
        {
          key: "2",
          label: (
            <Link
              to={
                data.account?.role == 0
                  ? path["UPDATE_PROFILE_PAGE"] + `/candidate`
                  : path["UPDATE_PROFILE_PAGE"] + `/enterprise`
              }
            >
              Edit profile
            </Link>
          ),
        },
        {
          key: "3",
          label: <Link to={"/myjob"}>Công việc của bạn</Link>,
        },
        {
          key: "4",
          label: <Link to={"/wallet"}>Ví</Link>,
        },
        {
          key: "5",
          label: (
            <Link
              to={PATH["HOME_PAGE"]}
              onClick={(e) => {
                e.preventDefault();
                localStorage.removeItem("account");
                dispatch({
                  type: "LOG_OUT",
                });
                navigate(PATH["HOME_PAGE"]);
              }}
            >
              Log Out
            </Link>
          ),
        },
      ]}
    />
  );

  const showModal = () => {
    setIsModalVisibleLogin(true);
  };

  const showModalSignup = () => {
    setIsShowMenu(false);
    setIsModalVisibleSignup(true);
  };

  const handleCancelSignup = () => {
    setIsShowMenu(false);
    setIsModalVisibleSignup(false);
  };

  const handleCancel = () => {
    setIsModalVisibleLogin(false);
  };

  const handleLoginGoogle = async () => {
    const user = await signInWithPopup(auth, ggProvider);
    const isFirstLogin =
      auth.currentUser.metadata.creationTime ===
      auth.currentUser.metadata.lastSignInTime;
    let userInfo = user.user;
    const { displayName, email, photoURL, uid, providerData } = userInfo;
    if (isFirstLogin) {
    }
  };

  const handleSignUpGoogle = async () => {
    const user = await signInWithPopup(auth, ggProvider);
    const isFirstLogin =
      auth.currentUser.metadata.creationTime ===
      auth.currentUser.metadata.lastSignInTime;
    let userInfo = user.user;
    const { displayName, email, photoURL, uid, providerData } = userInfo;
    setSignUpUser({
      image: photoURL,
      fullname: displayName,
      email: email,
    });
    setIsSignUpSuccess(true);
  };

  const handleSignUp = () => {
    let txtEmail = email.current.value;
    let txtPhone = phone.current.value;
    let txtPassword = password.current.value;
    let txtRePassword = rePassword.current.value;

    let validation = true;

    if (!checkEmail(txtEmail)) {
      validation = false;
      email.current.style.borderColor = "red";
    } else {
      email.current.style.borderColor = "#c5cdd6";
    }

    if (!checkLength(txtPassword, 10)) {
      validation = false;
      password.current.style.borderColor = "red";
    } else {
      password.current.style.borderColor = "#c5cdd6";
    }

    if (!checkEqual(txtPassword, txtRePassword)) {
      validation = false;
      rePassword.current.style.borderColor = "red";
    } else {
      rePassword.current.style.borderColor = "#c5cdd6";
    }

    if (validation) {
      postAuthen(API["CREATE_ACCOUNT"], {
        phoneNumber: txtPhone,
        email: txtEmail,
        password: txtPassword,
        role: role,
      }).then((result) => {
        if (result.status == 201) {
          setIsModalVisibleSignup(false);
          Swal.fire({
            icon: "success",
            title: "Thông báo",
            text: "Đăng kí tài khoản thành công",
            showCancelButton: true,
            confirmButtonText: "Đăng nhập",
          })
            .then((res) => {
              if (res.isConfirmed) {
                setIsModalVisibleLogin(true);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    }
  };
  const handleLogin = () => {
    let txtUsername = username.current.value;
    let txtPassword = passwordLogin.current.value;
    postAuthen(API["LOGIN"], {
      email: txtUsername,
      password: txtPassword,
      isUsePhoneNumber: false,
    })
      .then((result) => {
        if (result.status == 200) {
          let { data } = result.data;
          localStorage.setItem("account", JSON.stringify(data));
          localStorage.setItem("token", JSON.stringify(data.jwtToken));
          dispatch({
            type: "SET_ACCOUNT",
            payload: data,
          });
          // setAccount(data);
          // setInfomation(data);
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Tài khoản hoặc mật khẩu không đúng!",
        });
      });
  };

  // const getDataAccount = () => {
  //   return JSON.parse(localStorage.getItem("account"));
  // };

  const { Option } = Select;

  return (
    <>
      <div className="space"></div>
      <header className="header">
        <div className="header__left">
          <div className="header__logo">
            <Link to={PATH["HOME_PAGE"]}>
              <img src="/images/logo.svg" alt="" />
            </Link>
          </div>
          <div className="header__search">
            <div className="header__search__service">
              <Select
                defaultValue="allservice"
                suffixIcon={<CaretDownOutlined />}
                dropdownMatchSelectWidth={150}
                // onChange={handleChange}
              >
                <Option value="allservice">All Service</Option>
                <Option value="voiceover">Voice Over</Option>
                <Option value="audioproduction">Audio Production</Option>
              </Select>
            </div>
            <div className="header__search__input">
              <input type="text" placeholder="Search Creative Talen" />
            </div>
            <div className="header__search__icon">
              <SearchOutlined />
            </div>
          </div>
        </div>
        <div className="header__right">
          {data.account ? (
            <Dropdown overlay={menu} placement="bottom">
              <div className="header__right__info">
                <div className="avatar">
                  <img
                    src={
                      data.information
                        ? data.information.avatarUrl
                          ? data.information.avatarUrl
                          : data.information.logoUrl
                        : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                    }
                    alt=""
                  />
                </div>
                <div className="name">
                  <span>
                    {data.information
                      ? data.information.name
                      : data.account.email}
                  </span>
                </div>

                <Link to={PATH["CHAT_PAGE"]}>
                  <EmailIcon />
                </Link>
              </div>
            </Dropdown>
          ) : (
            <>
              <div className="header__right__login">
                {/* <Link to={PATH['LOGIN_PAGE']}>
          Log In
        </Link> */}
                <button onClick={showModal}>Login </button>
                <Modal
                  title="Login to Voice"
                  visible={isModalVisibleLogin}
                  footer={null}
                  onCancel={handleCancel}
                  className="modal"
                >
                  <div className="modal__input">
                    <p>Username or Email</p>
                    <input type="text" ref={username} />
                  </div>
                  <div className="modal__input">
                    <p>Password</p>
                    <input type="password" ref={passwordLogin} />
                  </div>
                  <p className="modal__forgot">
                    <Link to={""}>Forgot Password?</Link>
                  </p>

                  <button
                    className="modal__button"
                    onClick={() => handleLogin()}
                  >
                    Log in
                  </button>

                  <div className="modal__or">
                    <span>Or</span>
                  </div>

                  <button className="modal__google" onClick={handleLoginGoogle}>
                    <img src="images/google-icon.webp" alt="" />
                    <span>Login with google</span>
                  </button>
                </Modal>
              </div>
              <div className="header__right__signup">
                <button onClick={showModalSignup}>Sign up</button>
                <Modal
                  title="Signup to Voice"
                  visible={isModalVisibleSignup}
                  footer={null}
                  onCancel={handleCancelSignup}
                  className="modal"
                >
                  <div className={`${isSignUpSuccess ? "hide" : ""}`}>
                    <div className="modal__input">
                      <p>
                        Work Email <span style={{ color: "red" }}>*</span>
                      </p>
                      <input type="text" ref={email} />
                    </div>
                    <div className="modal__input">
                      <p>Phone</p>
                      <input type="text" ref={phone} />
                    </div>
                    <div className="modal__input">
                      <p>
                        Password<span style={{ color: "red" }}>*</span>
                      </p>
                      <input type="password" ref={password} />
                    </div>
                    <div className="modal__input">
                      <p>
                        Re-Password<span style={{ color: "red" }}>*</span>
                      </p>
                      <input type="password" ref={rePassword} />
                    </div>
                    <p style={{ marginTop: "10px" }}>I want to</p>
                    <div className="select">
                      <h3
                        onClick={() => {
                          setRole(1);
                        }}
                        className={role == 1 ? "active" : ""}
                      >
                        Hire for a project
                      </h3>
                      <h3
                        onClick={() => {
                          setRole(0);
                        }}
                        className={role == 0 ? "active" : ""}
                      >
                        Work as freelancer
                      </h3>
                    </div>
                    <div className="policy">
                      <input type="checkbox" name="" id="checkbox" />
                      <label htmlFor="checkbox">Chấp nhận điểu khoảng.</label>
                      <Link
                        to="/policy"
                        onClick={() => {
                          setIsModalVisibleSignup(false);
                        }}
                      >
                        <InfoIcon fontSize="small" />
                      </Link>
                    </div>
                    <button
                      className="modal__button"
                      onClick={() => {
                        handleSignUp();
                      }}
                    >
                      Sign Up
                    </button>

                    <div className="modal__or">
                      <span>Or</span>
                    </div>

                    <button
                      className="modal__google"
                      onClick={handleSignUpGoogle}
                    >
                      <img src="images/google-icon.webp" alt="" />
                      <span>Sign up with google</span>
                    </button>
                  </div>

                  <div className={`${isSignUpSuccess ? "" : "hide"}`}>
                    <div className="modal__input">
                      <p>Please take a moment to complete your account.</p>
                      <div className="info">
                        <div className="info__image">
                          <img src={`${signUpUser.image}`} alt="" />
                        </div>

                        <div className="info__name">
                          <h4>{signUpUser.fullname}</h4>
                          <p>{signUpUser.email}</p>
                        </div>
                      </div>
                      <p style={{ marginTop: "10px" }}>I want to</p>
                      <div className="select">
                        <h3
                          onClick={() => {
                            setRole(1);
                          }}
                          className={role == 1 ? "active" : ""}
                        >
                          Hire for a project
                        </h3>
                        <h3
                          onClick={() => {
                            setRole(0);
                          }}
                          className={role == 0 ? "active" : ""}
                        >
                          Work as freelancer
                        </h3>
                      </div>
                    </div>

                    <button
                      style={{ marginTop: "20px" }}
                      className="modal__button"
                    >
                      Sign Up
                    </button>
                  </div>
                </Modal>
              </div>
            </>
          )}
        </div>
        <div className="header__bar">
          <BarsOutlined
            onClick={() => {
              setIsShowMenu(true);
            }}
          />
        </div>

        <div
          className={`header__overlay ${isShowMenu ? "show" : ""}`}
          onClick={() => {
            setIsShowMenu(false);
          }}
        ></div>

        <div className={`header__menu ${isShowMenu ? "show" : ""}`}>
          <Collapse ghost defaultActiveKey={["1"]}>
            <Panel header="Voice Over" key="1" className="header__menu__panel">
              <Link to="/">Animation</Link>
              <Link to="/">Animation</Link>
              <Link to="/">Animation</Link>
              <Link to="/">Animation</Link>
              <Link to="/">Animation</Link>
              <Link to="/">Animation</Link>
            </Panel>
            <Panel header="Audio Production" key="2">
              <Link to="/">Animation</Link>
              <Link to="/">Animation</Link>
              <Link to="/">Animation</Link>
              <Link to="/">Animation</Link>
              <Link to="/">Animation</Link>
              <Link to="/">Animation</Link>
            </Panel>
            <Panel header="Music" key="3">
              <Link to="/">Animation</Link>
              <Link to="/">Animation</Link>
              <Link to="/">Animation</Link>
              <Link to="/">Animation</Link>
              <Link to="/">Animation</Link>
              <Link to="/">Animation</Link>
            </Panel>
          </Collapse>
          <button
            onClick={() => {
              setIsShowMenu(false);
              showModal();
            }}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsShowMenu(false);
              showModalSignup();
            }}
            className="menu-signup"
          >
            Sign up
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
