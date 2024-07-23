import axios from "axios";
import { BASE_URL } from "../utils/constant";

function config() {
  const config = {
    headers: {
      Authorization: `Bearer ${document.cookie.replace("user=", "")}`,
    },
  };
  return config;
}
export async function getBloodRequests({ status = 0, page = 1 }) {
  const { data } = await axios.get(
    `${BASE_URL}/api/requestbloods?statusSession=${status}&page=${page}&pageSize=${1000}`,
    config()
  );

  return data?.data;
}

export async function getBloodRequestHistory({ hospitalId }) {
  await new Promise((res) => setTimeout(res, 2000));
  const { data } = await axios.get(
    `${BASE_URL}/api/requestbloods/hospitals/${hospitalId}?page=${1}&pageSize=${1000}`,
    config()
  );

  return data?.data;
}

export async function createRequestBlood(data) {
  await new Promise((res) => setTimeout(res, 2000));
  await axios.post(`${BASE_URL}/api/requestbloods`, data, config());
}

export async function updateStatusRequestBlood({
  requestedId,
  hospitalAccept,
}) {
  await axios.put(
    `${BASE_URL}/api/requestbloods/requests/${requestedId}`,
    {
      hospitalAccept,
      status: 1,
    },
    config()
  );
}
