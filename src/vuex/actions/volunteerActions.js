import axios from 'axios'
import moment from 'moment'
const basePath = 'https://evening-escarpment-53669.herokuapp.com'


export default {
    //READ volunteer
    getVolunteer({ commit }, volunteerID) {
        commit("fetchingVolunteer")
        axios.get(`${basePath}/api/volunteer/${volunteerID}`)
            .then(response => {
                let volunteer = response.data
                volunteer.Shifts = volunteer.Shifts ? volunteer.Shifts.map(shift => {
                    return {
                        ...shift,
                        time: moment(shift.ActualStartTime).format('kk:mm')
                    }
                }) : []
                commit("fetchedVolunteer", volunteer)

            })
            .catch(error => {
                console.error("getVOlunteer action error: ", error)
                commit("fetchVolunteerError")
            })
    },
    //CREATE Volunteer
    addVolunteer({ commit }, newVolunteerObj) {
        let newVolunteer = {
            Email: newVolunteerObj.Email,
            FirstName: newVolunteerObj.FirstName,
            LastName: newVolunteerObj.LastName,
            Bio: newVolunteerObj.Bio,
            Username: newVolunteerObj.Username,
            Password: newVolunteerObj.Password,
            UserType: newVolunteerObj.userType,
        }
        commit("addingVolunteer")
        axios.post(`${basePath}/api/volunteers`, newVolunteer)
            .then(response => {
                commit("addedVolunteer", response.data)
                newVolunteerObj.router.push(`/volunteer/calendar/${response.data.ID}`)
            })
            .catch(error => {
                commit("addVolunteerError")
            })
    },
    updateVolunteer({ commit }, updatedVolunteer) {
        commit("updatingVolunteer")
        axios.patch(`${basePath}/api/volunteers/${updatedVolunteer.ID}`)
            .then(response => {
                commit("updatedVolunteer", response.data)
            })
            .catch(error => {
                console.error("updateVolunteer action error: ", error)
                commit("updateVolunteerError")
            })
    },
    //DELETE Volunteer
    deleteVolunteer({ commit }, volunteerID) {
        commit("deletingVolunteer")
        axios.delete(`${basePath}/api/volunteers/${volunteerID}`)
            .then(response => {
                commit("deletedVolunteer")
            })
            .catch(error => {
                console.error("deleteVolunteer action error: ", error)
                commit("deleteVolunteerError")
            })
    },
    //READ Volunteer Shifts
    getAllVolunteerShifts({ commit }, volunteerID) {
        commit("fetchingVolShifts")
        axios.get(`${basePath}/api/shifts/volunteers/${volunteerID}`)
            .then(response => {
                commit("fetchedVolShifts", response.data)
            })
            .catch(error => {
                console.error("getAllVolunteerShifts action error: ", error)
                commit("fetchVolShiftsError")
            })
    },
    //Volunteer Shift signup (UPDATE Shift)
    signUpForShift({ commit }, signupObj) {
        commit("signingUpShift")
        let shiftID = signupObj.ID
        let updatedShift = {
            VolunteerID: Number(signupObj.VolunteerID)
        }
        axios.patch(`${basePath}/api/shifts/${shiftID}`, updatedShift)
            .then(response => {
                commit("signedUpShift", response.data)
                signupObj.router.push(`/volunteer/calendar/${response.data.VolunteerID}`)
            })
            .catch(error => {
                console.error("signUpForShift action error: ", error)
                console.error("signUpForShift action response error: ", response)
                commit("signUpShiftError")
            })
    },
    //Volunteer Shift cancel (UPDATE Shift)
    cancelShift({ commit }, cancelObj) {
        commit("cancelingShift")
        let shiftID = cancelObj.ID
        let updatedShift = {
            VolunteerID: cancelObj.VolunteerID
        }
        console.log("updatedShift: ", updatedShift)
        axios.patch(`${basePath}/api/cancel/shifts/${shiftID}`, updatedShift)
            .then(response => {
                console.log("response: ", response)
                commit("canceledShift", response.data)
                cancelObj.router.push(`/volunteer/calendar/${response.data.VolunteerID}`)
            })
            .catch(error => {
                console.error("cancelShift action error: ", error)
                commit("cancelShiftError")
            })
    },
    //Volunteer Shift confirm 
    volConfirmShift({ commit }, confirmObj) {
        commit("confirmingShift")
        let shiftID = confirmObj.ID
        let updatedShift = {
            VolunteerID: confirmObj.VolunteerID
        }
        axios.patch(`${basePath}/api/confirm/shifts/${shiftID}`, updatedShift)
            .then(response => {
                commit("confirmedShift", response.data)
                confirmObj.router.push(`/volunteer/calendar/${response.data.VolunteerID}`)
            })
            .catch(error => {
                commit("confirmShiftError")
            })
    }
}