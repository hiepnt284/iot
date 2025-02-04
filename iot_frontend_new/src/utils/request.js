import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8081/api",
});

async function sendRequest({
  path,
  method,
  data = null,
  params = null,
}) {
  try {
    const configs = {
      method,
      url: path,
      params,
      data,
    };
    const response = await instance.request(configs);
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export default sendRequest;