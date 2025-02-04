import sendRequest from '../utils/request'
const sensorServices = {};

sensorServices.getSensorData = async ({
  method,
  data,
  params,
  path,
}) => {
  let response;
  try {
    response = await sendRequest({
      method: "GET",
      data,
      path: "/datasensors",
      params,
    });
    return response;
  } catch (error) {
    throw error;
  }
};


export default sensorServices;