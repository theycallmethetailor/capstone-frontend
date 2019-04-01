import axios from 'axios'
import eventActions from './eventActions'
import npoActions from './npoActions'
import volunteerActions from './volunteerActions'
import reportActions from './reportactions'

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