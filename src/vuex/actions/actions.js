import axios from 'axios'
import eventActions from './eventActions'
import npoActions from './npoActions'
import volunteerActions from './volunteerActions'
import reportActions from './reportactions'

const basePath = 'https://evening-escarpment-53669.herokuapp.com'

export const actions = {
    toggleDrawer({ commit }) {
        commit("toggleDrawer")
    },
    ...eventActions,
    ...npoActions,
    ...volunteerActions,
    ...reportActions,
    getAllTags({ commit }) {
        commit("fetchingTags")
        axios.get('${basePath}/api/tags')
            .then(response => {
                commit("fetchedTags", response.data)
            })
            .catch(error => {
                console.error("getAllTags action error: ", error)
                commit("fetchTagsError")
            })
    },
    login({ commit }, user) {
        let userAttempt = {
            Email: user.Email,
            Password: user.Password,
            UserType: user.UserType,
        }
        axios.post(`${basePath}/api/login`, userAttempt)
            .then(response => {
                const responseUser = response.data
                responseUser.UserType = responseUser.NPOName ? "NPO" : "Volunteer"
                responseUser.ls = user.ls
                commit("loginUser", responseUser)
                user.router.push("/")
            })
            .catch(error => {
                console.error("login action error: ", error)
                commit("loginError")
            })
    }
}