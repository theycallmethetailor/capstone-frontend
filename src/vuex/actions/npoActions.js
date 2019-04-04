import axios from 'axios'
import moment from 'moment'
const basePath = 'https://evening-escarpment-53669.herokuapp.com'

export default {
    //READ NPOs
    getNPOs({ commit }) {
        commit("fetchingNPOs")
        axios.get(`${basePath}/api/npos`)
            .then(response => {
                commit("fetchedNPOs", response.data)
            })
            .catch(error => {
                console.error("getNPO action error: ", error)
                commit("fetchNPOsError")
            })
    },
    //READ NPO
    getOneNPO({ commit }, npoID) {
        commit("fetchingOneNPO")
        axios.get(`${basePath}/api/npo/${npoID}`)
            .then(response => {
                let npo = response.data
                npo.Events = npo.Events ? npo.Events.map(event => {
                    return {
                        ...event,
                        time: moment(event.StartTime).format(`'kk:mm'`)
                    }
                }) : []
                commit("fetchedOneNPO", response.data)
            })
            .catch(error => {
                console.error("getOneNPO action error: ", error)
                commit("fetchOneNPOError")
            })
    },
    //CREATE NPO
    addNPOs({ commit }, newNPOObj) {
        let newNPO = {
            Email: newNPOObj.Email,
            FirstName: newNPOObj.FirstName,
            LastName: newNPOObj.LastName,
            Description: newNPOObj.Description,
            NPOName: newNPOObj.NPOName,
            Password: newNPOObj.Password,
            UserType: newNPOObj.userType,
        }
        commit("addingNPO")
        axios.post(`${basePath}/api/npos`, newNPO)
            .then(response => {
                const npoToAdd = response.data
                npoToAdd.ls = newNPOObj.ls
                commit("addedNPO", npoToAdd)
                newNPOObj.router.push(`/calendar/npo/${response.data.ID}`)
            })
            .catch(error => {
                console.error("addNPO action error: ", error)
                commit("addNPOError")
            })
    },
    //UPDATE NPO
    updateNPO({ commit }, updatedNPO) {
        commit("updatingNPO")
        axios.patch(`${basePath}/api/npos/${updatedNPO.ID}`)
            .then(response => {
                commit("updatedNPO", response.data)
            })
            .catch(error => {
                console.error("updateNPO action error: ", error)
                commit("updateNPOError")
            })
    },
    //DELETE NPO
    deleteNPO({ commit }, npoID) {
        npoID = 3
        commit("deletingNPO")
        axios.delete(`${basePath}/api/npos/${npoID}`)
            .then(response => {
                commit("deletedNPO")

            })
            .catch(error => {
                console.error("deleteNPO action error: ", error)
                commit("deleteNPOError")
            })
    },
}