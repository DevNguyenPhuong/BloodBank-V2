import axios from "axios";
import { BASE_URL } from "../utils/constant";

export async function login(info) {
  await new Promise((res) => setTimeout(res, 1000));
  const data = await axios.post(`${BASE_URL}/api/auth`, info);

  return data;
}

export async function signup(info) {
  await new Promise((res) => setTimeout(res, 1000));
  const data = await axios.post(`${BASE_URL}/api/donors`, info);

  return data;
}
