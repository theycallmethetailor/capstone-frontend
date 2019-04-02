import moment from 'moment'

export default {
    volReport: {},
    HoursByNPO: [],
    HoursByEvent: [],
    HoursByTag: [],
    fetchingVolReport: false,
    fetchVolReportError: false,
    fetchVolReportSuccess: false,
    reportStartDate: moment()
        .subtract(1, "month")
        .format()
        .substring(0, 10),
    reportEndDate: moment()
        .format()
        .substring(0, 10),
}