import axios from 'axios'
import moment from 'moment'
export default {
    //READ NPOs
    getNPOs({ commit }) {
        commit("fetchingNPOs")
        axios.get(`http://localhost:8081/api/npos`)
            .then(response => {
                console.log("getNPO action response: ", response)
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
        axios.get(`http://localhost:8081/api/npo/${npoID}`)
            .then(response => {

                // let volunteer = response.data
                // volunteer.Shifts = volunteer.Shifts ? volunteer.Shifts.map(shift => {
                //   return {
                //     ...shift,
                //     time: moment(shift.ActualStartTime).format('kk:mm')
                //   }
                // }) : []
                let npo = response.data
                npo.Events = npo.Events ? npo.Events.map(event => {
                    return {
                        ...event,
                        time: moment(event.StartTime).format(`'kk:mm'`)
                    }
                }) : []
                console.log("getOneNPO action response: ", npo)
                commit("fetchedOneNPO", response.data)
            })
            .catch(error => {
                console.error("getOneNPO action error: ", error)
                commit("fetchOneNPOError")
            })
    },
    //CREATE NPO
    addNPOs({ commit }, newNPOObj) {
        // example newNPO
        // {
        //   "NPOName": "Organization",
        //   "Description": "Insert description of an NPO here.",
        //   "Website": "www.google.com",
        //   "Email": "clararodriguez@email.com",
        //   "FirstName": "Clara",
        //   "LastName": "Rodriguez",
        //   "Password": "3247980"
        // }
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
        axios.post(`http://localhost:8081/api/npos`, newNPO)
            .then(response => {
                console.log("addNPO action response: ", response)
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
        // example updatedNPO: 
        // {
        //   "ID": 19,
        //   "NPOName": "New NPO Name",
        //   "Description": "Insert description of an NPO here. New details.",
        //   "Website": "www.google.com",
        //   "Email": "newemailaddress@email.com",
        //   "FirstName": "Amelia",
        //   "LastName": "Sanchez",
        //   "Password": "12345"
        // }
        commit("updatingNPO")
        axios.patch(`http://localhost:8081/api/npos/${updatedNPO.ID}`)
            .then(response => {
                console.log("updateNPO action response: ", response)
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
        axios.delete(`http://localhost:8081/api/npos/${npoID}`)
            .then(response => {
                console.log("deleteNPO action response: ", respone)
                commit("deletedNPO")

            })
            .catch(error => {
                console.error("deleteNPO action error: ", error)
                commit("deleteNPOError")
            })
    },
}