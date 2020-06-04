// import { bearerKey } from "./key.js";

const getRequest = async (url ="", accessKey = "") => {
  const getHeader = {
    Accept: "application/json",
    Authorization: accessKey,
  };

  const response = await fetch(url, {
    method: "GET",
    headers: getHeader
  })

  return response.json();
};

const postModelData = async (url = "", data = {}, accessKey = "") => {
  const postHeader = {
    Accept: "application/json",
    Authorization: accessKey,
  };

  const modelData = new FormData();
  modelData.append("data", data.data);
  modelData.append("name", data.name);
  const response = await fetch(url, {
    method: "POST",
    headers: postHeader,
    body: modelData,
  });

  return response.json();
};

const postData = async (url = "", data = {}, accessKey = "") => {
  const postHeader = {
    Accept: "application/json",
    Authorization: accessKey,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    method: "POST",
    headers: postHeader,
    body: JSON.stringify(data),
  });

  return response.json();
};

export { getRequest, postModelData, postData };
