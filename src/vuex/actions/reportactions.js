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
                commit("fetchedVolReport", report)
            })
            .catch(error => {
                commit("fetchVolReportError")
            })
    }
}