export default {
    //READ Volunteer
    fetchingVolunteer(state) {
        state.fetchVolunteerError = false
        state.fetchVolunteerSuccess = false
        state.fetchingVolunteer = true
    },
    fetchVolunteerError(state) {
        state.fetchingVolunteer = false
        state.fetchVolunteerError = true
    },
    fetchedVolunteer(state, volunteer) {
        state.fetchingVolunteer = false
        state.fetchVolunteerSuccess = true
        state.volunteer = volunteer
    },
    //CREATE Volunteer
    addingVolunteer(state) {
        state.addVolunteerError = false
        state.addVOlunteerSuccess = false
        state.addingVolunteer = true
    },
    addVolunteerError(state) {
        state.addingVolunteer = false
        state.addVolunteerError = true
    },
    addedVolunteer(state, newVolunteer) {
        state.addingVolunteer = false
        state.addVolunteerSuccess = true
        state.loginSuccess = true
        let loggedVolunteer = {
            ...newVolunteer,
            UserType: "Volunteer"
        }
        persistUser(loggedVolunteer, newVolunteer.ls)
        state.loggedInUser = newVolunteer
        state.loggedInUserRole = newVolunteer.ls.get('user_type')
        state.loggedInUserID = newVolunteer.ls.get('id')
    },
    //UPDATE Volunteer
    updatingVolunteer(state) {
        state.updateVolunteerError = false
        state.updateVolunteerSuccess = false
        state.updatingVolunteer = true
    },
    updateVolunteerError(state) {
        state.updatingVolunteer = false
        state.updateVolunteerError = true
    },
    updatedVolunteer(state, updatedVolunteer) {
        state.updatingVolunteer = false
        state.updateVolunteerSuccess = true
        state.volunteer = updatedVolunteer
    },
    deletingVolunteer(state) {
        state.deleteVolunteerError = false
        state.deleteVolunteerSuccess = false
        state.deletingVolunteer = true
    },
    deleteVolunteerError(state) {
        state.deletingVolunteer = false
        state.deleteVolunteerError = true
    },
    deletedVolunteer(state) {
        state.deletingVolunteer = true
        state.deleteVolunteerSuccess = true
    },
    //READ all Volunteer shifts
    fetchingVolShifts(state) {
        state.fetchVolShiftsError = false
        state.fetchEventsSuccess = false
        state.fetchingVolShifts = true
    },
    fetchVolShiftsError(state) {
        state.fetchingVolShifts = false
        state.fetchVolShiftsError = true
    },
    fetchedVolShifts(state, volShifts) {
        state.fetchingVolShifts = false
        state.fetchVolShiftsSuccess = true
        state.volunteerShifts = volShifts
    },
    //UPDATE Shift - Volunteer sign up
    signingUpShift(state) {
        state.signUpShiftError = false
        state.signUpShiftSuccess = false
        state.signingUpShift = true
    },
    signUpShiftError(state) {
        state.signingUpShift = false
        state.signUpShiftError = true
    },
    signedUpShift(state, newShift) {
        state.signingUpShift = false
        state.signUpShiftSuccess = true
        state.volunteerShifts.push(newShift)
    },
    resetVolSignupSuccess() {
        this.state.signUpShiftSuccess = false
    },
    //UPDATE Shift - Volunteer cancel
    cancelingShift(state) {
        state.cancelShiftError = false
        state.cancelShiftSuccess = false
        state.cancelingShift = true
    },
    cancelShiftError(state) {
        state.cancelingShift = false
        state.cancelShiftError = true
    },
    canceledShift(state, cancelledShift) {
        state.cancelingShift = false
        state.cancelShiftSuccess = true
        state.volunteerShifts = state.volunteerShifts.filter(shift => {
            // shift.VolunteerID !== state.volunteer.ID
            return shift.VolunteerID !== 9
        })
    },
}