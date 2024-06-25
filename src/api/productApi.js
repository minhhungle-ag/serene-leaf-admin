import axiosClient from './axiosClient'

const url = '/products'

export const productApi = {
  getAll(params) {
    return axiosClient.get(`${url}`, { params })
  },
  get(id) {
    return axiosClient.get(`${url}/${id}`)
  },
  add(body) {
    return axiosClient.post(`${url}`, body)
  },
  edit(payload) {
    const { id, ...body } = payload
    return axiosClient.put(`${url}/${id}`, body)
  },
  remove(id) {
    return axiosClient.delete(`${url}/${id}`)
  },
}
