import axios from 'axios'
import md5 from "md5";

axios.defaults.baseURL = "http://47.93.43.96:5001/lmuze/api/";
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.withCredentials = true;
axios.defaults.transformRequest = function (data) {
  if (typeof data !== 'undefined') {
    let sign = "LIDEWEN757198810237430" + "&" + JSON.stringify(data);
    data.sign = md5(sign);
  }
  return JSON.stringify(data);
}

axios.interceptors.response.use(function (response) {
  let resData = response.data;
  if (resData.code != "1") {
    switch (+resData.code) {
      default: break;
      case 0:
        window.$vue.$router.push("/login");
        break;
    };

    window.$vue.$message.error(resData.msg);
    throw new Error(resData.msg);
  }
  return resData.data;
}, function (error) {
  window.$vue.$message.error(error.message);
  console.error(error);
  return Promise.reject(error);
});

export default axios;