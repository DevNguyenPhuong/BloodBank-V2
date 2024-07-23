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

export async function getActivitiesInSessionByUserId(id) {
  const data = await axios.get(
    `${BASE_URL}/api/sessiondonors/donors/${id}`,
    config()
  );

  return data?.data;
}

export async function getDonorsInSessionByActivityId(id, page = 1) {
  await new Promise((res) => setTimeout(res, 1000));
  const { data } = await axios.get(
    `${BASE_URL}/api/sessiondonors/activities/${id}?Page=${page}&PageSize=1000 `,
    config()
  );

  return data?.data;
}

export async function createActivityInSession(info) {
  await new Promise((res) => setTimeout(res, 1000));
  const data = await axios.post(
    `${BASE_URL}/api/sessiondonors`,
    info,
    config()
  );

  return data?.data;
}

export async function deleteActivityInSesstionById(id) {
  await new Promise((res) => setTimeout(res, 1000));
  await axios.delete(`${BASE_URL}/api/sessiondonors/${id}`, config());
}

export async function approveDonor({
  sessionId,
  donorId,
  hospitalId,
  bloodType,
  quantity,
  hospitalName,
}) {
  await new Promise((res) => setTimeout(res, 1000));
  await axios.put(
    `${BASE_URL}/api/sessiondonors/${sessionId}`,
    {
      status: 4,
    },
    config()
  );

  await axios.post(
    `${BASE_URL}/api/bloods`,
    { hospitalId, bloodType, quantity },
    config()
  );

  await axios.post(
    `${BASE_URL}/api/histories`,
    { donorId, quantity, hospitalName, hospitalId },
    config()
  );
}

export async function rejectDonor(sessionId) {
  await new Promise((res) => setTimeout(res, 1000));
  await axios.put(
    `${BASE_URL}/api/sessiondonors/${sessionId}`,
    {
      status: 2,
    },
    config()
  );
}
