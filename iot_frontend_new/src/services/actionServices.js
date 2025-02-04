import sendRequest from "../utils/request";
const actionServices = {};

actionServices.getActionData = async ({ method, data, params, path }) => {
  let response;
  try {
    response = await sendRequest({
      method: "GET",
      data,
      path: "/actions",
      params,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

actionServices.sendAction = async ({ method, data, params, path }) => {
  let response;
  try {
    response = await sendRequest({
      method: "POST",
      data,
      path: "/action",
      params,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export default actionServices;
