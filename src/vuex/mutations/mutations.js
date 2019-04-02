import { persistUser, removePersistedUser } from '../../utils/persistUser'
import eventMutations from './eventMutations'
import npoMutations from './npoMutations'
import volunteerMutations from './volunteerMutations'
import reportMutations from './reportmutations'

export default {

    ...eventMutations,
    ...npoMutations,
    ...volunteerMutations,
    ...reportMutations,
    toggleDrawer(state) {
        state.drawer = !state.drawer
    },

    resetVolCancelSuccessMessage() {
        state.cancelShiftSuccess = false
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
        persistUser(user, user.ls)
        state.loggingIn = false
        state.loginSuccess = true
        state.loggedInUserRole = user.UserType
        state.loggedInUserID = user.ID
    },
    resetLoginError(state) {
        state.loginError = false
    },
    logout(state, obj) {
        removePersistedUser(obj.ls)
        state.loggingIn = false
        state.loginError = false
        state.loginSuccess = true
        state.loggedInUserRole = null
        state.loggedInUserID = null
        obj.router.push("/")

    },
}

