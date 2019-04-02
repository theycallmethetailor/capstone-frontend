export default {
    fetchingVolReport(state) {
        state.fetchVolReportError = false
        state.fetchVolReportSuccess = false
        state.fetchingVolReport = true
    },
    fetchVolReportError(state) {
        state.fetchingVolReport = false
        state.fetchVolReportError = true
    },
    fetchedVolReport(state, report) {
        state.fetchingVolReport = false
        state.fetchVolReportSuccess = true
        state.volReport = report
        state.HoursByNPO = report.HoursByNPO
        state.HoursByEvent = report.HoursByEvent
        state.HoursByTag = report.HoursByTag
    },
    updateReportStartDate(state, newStartDate) {
        state.reportStartDate = newStartDate
    },
    updateReportEndDate(state, newEndDate) {
        state.reportEndDate = newEndDate
    }
}