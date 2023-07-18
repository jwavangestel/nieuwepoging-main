import axios from 'axios'


const apiClient = axios.create({
  baseURL: 'http://localhost:3300/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getColumns() {
    return apiClient.get('/board')
  },
  getColumn(id) {
    return apiClient.get('/columns/' + id)
  }
}