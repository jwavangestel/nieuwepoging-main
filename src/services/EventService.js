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
  getTaak(id) {
    return apiClient.get('/taak/' + id)
  },
  addTaak(nieuweTaak) {
    console.log('fuut' + nieuweTaak.sc_id + nieuweTaak.titel)
    return apiClient.post("/addTaak?sc_id=" + nieuweTaak.sc_id + "&titel=" + nieuweTaak.titel)
  },
  updateTaak(nieuweTaak) {
    console.log('juin' + nieuweTaak.task_id + nieuweTaak.sc_id + nieuweTaak.titel + nieuweTaak.omschrijving)
    console.log("modifyTaak?taak_id="+ nieuweTaak.task_id + "&sc_id=" + nieuweTaak.sc_id + "&titel=" + nieuweTaak.titel +  "&omschrijving=" + nieuweTaak.omschrijving)
    return apiClient.put("/modifyTaak?&sc_id=" + nieuweTaak.sc_id + "&titel=" + nieuweTaak.titel +  "&omschrijving=" + nieuweTaak.omschrijving + "&taak_id=" + nieuweTaak.task_id)
  }
}