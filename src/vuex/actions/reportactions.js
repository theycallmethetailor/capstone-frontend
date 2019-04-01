import axios from 'axios'

export default {
    getVolunteerReport({ commit }, reportRequest) {
        commit("fetchingVolReport")
        axios.post('http://localhost:8081/api/vol/report', reportRequest)
            .then(response => {
                console.log("getVolunteerReport action response: ", response)
                commit("fetchedVolReport", response.data)
            })
            .catch(error => {
                console.log("getVolunteerReport action error, ", error)
                commit("fetchVolReportError")
            })
    }
}