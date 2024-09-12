import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': 'd563d3d1-6293-47e5-b5c9-bdf0c386ad0f',
  },
})
