import axios from 'axios'
import moment from 'moment'

export default {
    //READ volunteer
    getVolunteer({ commit }, volunteerID) {
        commit("fetchingVolunteer")
        axios.get(`http://localhost:8081/api/volunteer/${volunteerID}`)
            .then(response => {
                console.log("getVolunteer action response: ", response)
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
        //   example newVolunteer
        //  {
        //     "Username": "AwesomeUser",
        //     "Bio": "I want to volunteer for some reason.",
        //     "Email": "email2354798@emailer.com",
        //     "FirstName": "Mandy",
        //     "LastName": "Me",
        //     "Password": "password"
        //   }
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
        axios.post(`http://localhost:8081/api/volunteers`, newVolunteer)
            .then(response => {
                console.log("addVolunteer action response: ", response)
                commit("addedVolunteer", response.data)
                newVolunteerObj.router.push(`/volunteer/calendar/${response.data.ID}`)
            })
            .catch(error => {
                commit("addVolunteerError")
            })
    },
    updateVolunteer({ commit }, updatedVolunteer) {
        commit("updatingVolunteer")
        axios.patch(`http://localhost:8081/api/volunteers/${updatedVolunteer.ID}`)
            .then(response => {
                console.log("updateVolunteer action response: ", response)
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
        axios.delete(`http://localhost:8081/api/volunteers/${volunteerID}`)
            .then(response => {
                console.log("deleteVolunteer action response: ", response)
                commit("deletedVolunteer")
            })
            .catch(error => {
                console.error("deleteVolunteer action error: ", error)
                commit("deleteVolunteerError")
            })
    },
    //READ Volunteer Shifts
    getAllVolunteerShifts({ commit }, volunteer) {
        commit("fetchingVolShifts")
        axios.get(`http://localhost:8081/api/shifts/volunteers/${volunteer.ID}`)
            .then(response => {
                console.log("getAllVolunteerShifts action response: ", response)
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
        console.log("signUpForShift action shiftID: ", shiftID)
        let updatedShift = {
            VolunteerID: Number(signupObj.VolunteerID)
        }
        console.log("signUpForShift action updatedShift: ", updatedShift)
        axios.patch(`http://localhost:8081/api/shifts/${shiftID}`, updatedShift)
            .then(response => {
                console.log("signUpForShift action response: ", response)
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
        console.log("canceShift cancelObj: ", cancelObj)
        axios.patch(`http://localhost:8081/api/cancel/shifts/${shiftID}`, updatedShift)
            .then(response => {
                console.log("cancelShift action response: ", response)
                commit("canceledShift", response.data)
                cancelObj.router.push(`/volunteer/calendar/${response.data.VolunteerID}`)
            })
            .catch(error => {
                console.error("cancelShift action error: ", error)
                commit("cancelShiftError")
            })
    },
}