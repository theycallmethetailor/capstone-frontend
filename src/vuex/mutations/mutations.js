import { persistUser, removePersistedUser } from '../../utils/persistUser'
import eventMutations from './eventMutations'
import npoMutations from './npoMutations'
import volunteerMutations from './volunteerMutations'

export default {
    mutations: {
        ...eventMutations,
        ...npoMutations,
        ...volunteerMutations,
        toggleDrawer(state) {
            state.drawer = !state.drawer
        },

        resetVolCancelSuccessMessage() {
            this.state.cancelShiftSuccess = false
        },
        fetchingTags(state) {
            state.fetchTagsError = false
            state.fetchTagsSuccess = false
            state.fetchingTags = true
        },
        fetchTagsError(state) {
            state.fetchingTags = false
            state.fetchTagsError = true
        },
        fetchedTags(state, tags) {
            state.fetchingTags = false
            state.fetchTagsSuccess = true
            state.tags = tags
        },
        //Event Search options
        updateSearchString(state, searchString) {
            state.searchString = searchString
        },
        updatesearchOption(state, searchOption) {
            state.searchOption = searchOption
        },
        updateSearchStartDate(state, searchStartDate) {
            state.searchStartDate = searchStartDate
        },
        updateSearchEndDate(state, searchEndDate) {
            state.searchEndDate = searchEndDate
        },
        loginError(state) {
            state.loggingIn = false
            state.loginError = true
        },
        loginUser(state, user) {
            console.log("loginUser mutation user: ", user)
            state.loggingIn = false
            state.loginSuccess = true
            persistUser(user)
            state.loggedInUser = user
        },
        resetLoginError() {
            state.loginError = false
        },
        logout(state, router) {
            state.loggingIn = false
            state.loginError = false
            state.loginSuccess = true
            state.loggedInUser = {}
            state.loggedInUserRole = ""
            state.loggedInUserID = 0
            removePersistedUser()
            // console.log("localstorage.id", )
            router.push("/")
        }
    },
}