import axios from "axios"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "25fabb7c-9b99-4c08-bf07-cc05cdafd446",
  },
})
