import axios from "axios";

const url = process.env.EXPO_PUBLIC_BACKEND_URL ?? "";

export const api = axios.create({
  baseURL: url,
});
