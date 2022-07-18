import axios from "axios";

const config = {
  baseURL: "https://localhost:44350",
};
const myAxios = axios.create(config);
export default myAxios;
