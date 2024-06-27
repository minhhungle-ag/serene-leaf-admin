import axiosClient from './axiosClient'
const url = '/auth'
export const authApi = {
  signUp(body) {
    return axiosClient.post(`${url}/sign-up`, body)
  },
  login(body) {
    return axiosClient.post(`${url}/login`, body)
  },
}
