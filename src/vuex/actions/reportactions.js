import axios from 'axios'

export default {
    getVolunteerReport({ commit }, reportRequest) {
        commit("fetchingVolReport")
        axios.post('http://localhost:8081/api/vol/report', reportRequest)
            .then(response => {
                let report = {
                    HoursByNPO: Object.keys(response.data.HoursByNPO).map(NPOID => {
                        return response.data.HoursByNPO[NPOID];
                    }),
                    HoursByEvent: Object.keys(response.data.HoursByEvent).map(EventID => {
                        return response.data.HoursByEvent[EventID];
                    }),
                    HoursByTag: Object.keys(response.data.HoursByTag).map(TagID => {
                        return response.data.HoursByTag[TagID];
                    }),
                }
                console.log("getVolunteerReport action report: ", report)
                commit("fetchedVolReport", report)
            })
            .catch(error => {
                console.log("getVolunteerReport action error, ", error)
                commit("fetchVolReportError")
            })
    }
}