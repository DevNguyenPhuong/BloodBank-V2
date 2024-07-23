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

export async function getHospitalInfoById(id) {
  await new Promise((res) => setTimeout(res, 2000));
  const data = await axios.get(`${BASE_URL}/api/hospitals/${id}`, config());

  return data?.data.data;
}
