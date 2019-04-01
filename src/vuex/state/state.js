import moment from 'moment'
import eventState from './eventState'
import npoState from './npoState'
import volunteerState from './volunteerState'
import reportRequest from './reportRequest'

export default {
    state: {
        drawer: false,
        ...eventState,
        ...npoState,
        ...volunteerState,
        ...reportRequest,
        //READ Tags
        tags: [],
        fetchingTags: false,
        fetchTagsError: false,
        fetchTagsSuccess: false,
        //Event Search Data: 
        searchString: "",
        searchOption: "All",
        searchOptions: [
            "All",
            "Tags",
            "Name",
            "Description",
            "Non Profit Organization"
        ],
        searchStartDate: moment().format().substr(0, 10),
        searchEndDate: moment().add(1, 'month').format().substr(0, 10),
        // LOGIN
        loggingIn: false,
        loginError: false,
        loginSuccess: true,

        loggedInUserRole: localStorage.getItem('user_type'),
        loggedInUserID: localStorage.getItem('id')
    },
}