import axios from 'axios'
import eventActions from './eventActions'
import npoActions from './npoActions'
import volunteerActions from './volunteerActions'

export const actions = {
    toggleDrawer({ commit }) {
        commit("toggleDrawer")
    },
    ...eventActions,
    ...npoActions,
    ...volunteerActions,
    getAllTags({ commit }) {
        commit("fetchingTags")
        axios.get("http://localhost:8081/api/tags")
            .then(response => {
                console.log("getAllTags action response: ", response)
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
        axios.post(`http://localhost:8081/api/login`, userAttempt)
            .then(response => {
                console.log("login action respone: ", response)
                const responseUser = response.data
                responseUser.UserType = responseUser.NPOName ? "NPO" : "Volunteer"
                commit("loginUser", responseUser)
                user.router.push("/")
                resolve(response)
            })
            .catch(error => {
                console.error("login action error: ", error)
                commit("loginError")
                reject(error)
            })
    }
}