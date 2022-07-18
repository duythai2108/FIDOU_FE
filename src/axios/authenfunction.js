import MyAxios from "./config";

const getToken = () => {
  return localStorage.getItem("token")?.replaceAll('"', "");
};

const getHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
};

const getTokenAdmin = () => {
  return localStorage.getItem("jwtAdmin")?.replaceAll('"', "");
};

const getHeaderAdmin = () => {
  return {
    headers: {
      Authorization: `Bearer ${getTokenAdmin()}`,
    },
  };
};

const getAuthen = (url, isAuthen) => {
  const header = getHeader();
  return isAuthen ? MyAxios.get(url, header) : MyAxios.get(url);
};

const getAdmin = (url, isAuthen) => {
  const header = getHeaderAdmin();
  return isAuthen ? MyAxios.get(url, header) : MyAxios.get(url);
};

const getParam = (url, param) => {
  return MyAxios.get(`${url + param}`);
};

const postAuthen = (url, data, isAuthen) => {
  const header = getHeader();
  return isAuthen ? MyAxios.post(url, data, header) : MyAxios.post(url, data);
};

const postAdmin = (url, data, isAuthen) => {
  const header = getHeaderAdmin();
  return isAuthen ? MyAxios.post(url, data, header) : MyAxios.post(url, data);
};

const putAuthen = (url, data, isAuthen) => {
  const header = getHeader();
  return isAuthen ? MyAxios.put(url, data, header) : MyAxios.put(url, data);
};

export { getAuthen, postAuthen, getParam, putAuthen, postAdmin, getAdmin };
