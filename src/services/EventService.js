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
  async getColumns() {
    return await apiClient.get('/status')
  },
  async getColumnsPositie() {
    return await apiClient.get('/kolompositie')
  },
  async getTaken() {
    return await apiClient.get('/taken')
  },
  async getlatestTaakId() {
    return await apiClient.get('/latestTaskId')
  },
  getTaak(id) {
    return apiClient.get('/taak/' + id)
  },
  async getTaakPositie() {
    return await apiClient.get('/taakpositie')
  },
  async addTaak(nieuweTaak) {
//    console.log('fuut' + nieuweTaak.sc_id + nieuweTaak.titel)
    return await apiClient.post("/addTaak?sc_id=" + nieuweTaak.sc_id + "&titel=" + nieuweTaak.titel)
  },
  async updateTaak(nieuweTaak) {
//    console.log('juin' + nieuweTaak.task_id + nieuweTaak.sc_id + nieuweTaak.titel + nieuweTaak.omschrijving)
//    console.log("modifyTaak?taak_id="+ nieuweTaak.task_id + "&sc_id=" + nieuweTaak.sc_id + "&titel=" + nieuweTaak.titel +  "&omschrijving=" + nieuweTaak.omschrijving)
    return await apiClient.put("/modifyTaak?&sc_id=" + nieuweTaak.sc_id + "&titel=" + nieuweTaak.titel +  "&omschrijving=" + nieuweTaak.omschrijving + "&taak_id=" + nieuweTaak.task_id)
  },
  async updateTaakPositie(nieuweTaakPositie) {
    //    console.log('juin' + nieuweTaak.task_id + nieuweTaak.sc_id + nieuweTaak.titel + nieuweTaak.omschrijving)
    //    console.log("modifyTaak?taak_id="+ nieuweTaak.task_id + "&sc_id=" + nieuweTaak.sc_id + "&titel=" + nieuweTaak.titel +  "&omschrijving=" + nieuweTaak.omschrijving)
//    console.log("updateTaakPositie?&sc_id=" + nieuweTaakPositie.sc_id + "&positie={" + nieuweTaakPositie.positie + "}")
    return await apiClient.put("/updateTaakPositie?&sc_id=" + nieuweTaakPositie.sc_id + "&positie={" + nieuweTaakPositie.positie + "}")
  },
  async updateTaakSCID(to_sc_id, task_id) {
    //    console.log('juin' + nieuweTaak.task_id + nieuweTaak.sc_id + nieuweTaak.titel + nieuweTaak.omschrijving)
    //    console.log("modifyTaak?taak_id="+ nieuweTaak.task_id + "&sc_id=" + nieuweTaak.sc_id + "&titel=" + nieuweTaak.titel +  "&omschrijving=" + nieuweTaak.omschrijving)
        return await apiClient.put("/modifyTaakScId?&sc_id=" + to_sc_id + "&taak_id=" + task_id )
  }, 
}
