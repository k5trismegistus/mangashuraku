import axios from 'axios'

const instance = axios.create({ baseURL: 'http://192.168.11.12:3001/api/' })

export const apiClient = {
  getComic: async ({ id }) => {
    try {
      const res = await instance.get(`/books/${id}`)
      return res.data.data.book
    } catch (e) {
      console.error(e)
      return {}
    }
  },
}

