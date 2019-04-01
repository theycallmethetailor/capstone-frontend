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
        .subtract(4, "month")
        .format()
        .substring(0, 10),
    reportEndDate: moment()
        .add(4, "month")
        .format()
        .substring(0, 10),
}