import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import { stat } from 'fs';
import moment from 'moment'
import { reject, resolve } from 'bluebird';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    openEvents: [],
    //READ events
    fetchingEvents: false,
    fetchEventsError: false,
    fetchEventsSuccess: false,
    //READ event (SHOW)
    event: {},
    fetchEvent: false,
    fetchEventError: false,
    fetchEventSuccess: false,
    //CREATE event
    addingEvent: false,
    addEventError: false,
    addEventSuccess: false,
    //UPDATE event
    updatingEvent: false,
    updateEventError: false,
    updateEventSuccess: false,
    //READ NPOs
    npos: [],
    fetchingNPOs: false,
    fetchNPOsError: false,
    fetchNPOsSuccess: false,
    //READ NPO
    npo: {},
    npoEvents: [],
    fetchingOneNPO: false,
    fetchOneNPOError: false,
    fetchOneNPOSuccess: false,
    //CREATE NPO
    addingNPO: false,
    addNPOError: false,
    addNPOSuccess: false,
    //UPDATE NPO
    updatingNPO: false,
    updateNPOError: false,
    updateNPOSuccess: false,
    //DELETE NPO
    deletingNPO: false,
    deleteNPOError: false,
    deleteNPOSuccess: false,
    //READ Volunteer
    volunteer: {},
    fetchingVolunteer: false,
    fetchVolunteerError: false,
    fetchVolunteerSuccess: false,
    //CREATE Volunteer
    addingVolunteer: false,
    addVolunteerError: false,
    addVolunteerSuccess: false,
    //UPDATE Volunteer
    updatingVolunteer: false,
    updateVolunteerError: false,
    updateVolunteerSuccess: false,
    //DELETE Volunteer
    deletingVolunteer: false,
    deleteVolunteerError: false,
    deleteVolunteerSuccess: false,
    //READ all volunteer shifts
    volunteerShifts: [],
    fetchingVolShifts: false,
    fetchVolShiftsError: false,
    fetchVolShiftsSuccess: false,
    //UPDATE Shift - Volunteer Shift Signup
    signingUpShift: false,
    signUpShiftError: false,
    signUpShiftSuccess: false,
    //UPDATE Shift - Volunteer Shift Cancel
    cancelingShift: false,
    cancelShiftError: false,
    cancelShiftSuccess: false,
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
    loggedInUser: {},
    loggedInUserRole: localStorage.user_type,
    loggedInUserID: localStorage.id,
  },
  mutations: {
    toggleDrawer(state) {
      state.drawer = !state.drawer
    },
    //READ events
    fetchingEvents(state) {
      state.fetchEventsError = false
      state.fetchEventsSuccess = false
      state.fetchingEvents = true
    },
    fetchEventsError(state) {
      state.fetchingEvents = false
      state.fetchEventsError = true
    },
    fetchedEvents(state, openEvents) {
      state.fetchingEvents = false
      state.fetchEventsSuccess = true
      state.openEvents = openEvents
    },
    //READ event (SHOW)
    fetchingEvent(state) {
      state.fetchEventError = false
      state.fetchEventSuccess = false
      state.fetchingEvent = true
    },
    fetchEventError(state) {
      state.fetchingEvent = true
      state.fetchEventError = true
    },
    fetchedEvent(state, event) {
      state.fetchingEvent = false
      state.fetchEventSuccess = true
      state.event = event
    },
    //CREATE event
    addingEvent(state) {
      state.addEventSuccess = false
      state.addEventError = false
      state.addingEvent = true
    },
    addEventError(state, error) {
      state.addingEvent = false
      state.addEventError = true
    },
    addedEvent(state, newEvent) {
      console.log("addedEvent mutation newEvent: ", newEvent)
      state.addingEvent = false
      state.addEventSuccess = true
      state.openEvents.push(newEvent)
    },
    resetAddEventSuccess(state) {
      state.addEventSuccess = false
      state.addEventError = false
    },
    //UPDATE event
    updatingEvent(state) {
      state.updateEventSuccess = false
      state.updateEventError = false
      state.updatingEvent = true
    },
    updateEventError(state) {
      state.updatingEvent = false
      state.updateEventError = true
    },
    updatedEvent(state, updatedEvent) {
      state.updatingEvent = false
      state.updateEventSuccess = true
      //this currently only updates the event on the state, 
      //may need to look into also updating assoicated shifts
      state.openEvents.forEach(event => {
        if (event.ID === updatedEvent.ID) {
          event = updatedEvent
        }
        return event
      })
    },
    // READ NPOs
    fetchingNPOs(state) {
      state.fetchNPOsError = false
      state.fetchNPOsSuccess = false
      state.fetchingNPOs = true
    },
    fetchNPOsError(state) {
      state.fetchingNPO = false
      state.fetchNPOsError = true
    },
    fetchedNPOs(state, npos) {
      state.fetchingNPO = false
      state.fetchNPOsSuccess = true
      state.npos = npos
    },
    //READ NPO
    fetchingOneNPO(state) {
      state.fetchOneNPOError = false
      state.fetchOneNPOSuccess = false
      state.fetchingOneNPO = true
    },
    fetchOneNPOError(state) {
      state.fetchingOneNPO = false
      state.fetchOneNPOError = true
    },
    fetchedOneNPO(state, npo) {
      state.fetchingOneNPO = false
      state.fetchOneNPOSuccess = true
      state.npo = npo
      state.npoEvents = npo.Events
    },
    //CREATE NPO
    addingNPO(state) {
      state.addNPOError = false
      state.addNPOSuccess = false
      state.addingNPO = true
    },
    addNPOError(state) {
      state.addingNPO = false
      state.addNPOError = true
    },
    addedNPO(state) {
      state.addingNPO = false
      state.addNPOSuccess = true
    },
    //UPDATE NPO
    updatingNPO(state) {
      state.updateNPOSuccess = false
      state.updateNPOError = false
      state.updatingNPO = true
    },
    updateNPOError(state) {
      state.updatingNPO = false
      state.updateNPOError = true
    },
    updatedNPO(state, updatedNPO) {
      state.updatingNPO = false
      state.updateNPOSuccess = true
      state.npo = updatedNPO
    },
    //DELETE NPO
    deletingNPO(state) {
      state.deleteNPOError = false
      state.deleteNPOSuccess = false
      state.deletingNPO = true
    },
    deleteNPOError(state) {
      state.deletingNPO = false
      state.deleteNPOError = true
    },
    deletedNPO(state) {
      state.deletingNPO = false
      state.deleteNPOSuccess = true
      state.npo = {}
    },
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
      state.loggingIn = false
      state.loginSuccess = true
      persistUser(user)
      state.loggedInUser = user
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
  actions: {
    toggleDrawer({ commit }) {
      commit("toggleDrawer")
    },
    //READ events
    getOpenEvents({ commit }) {
      commit("fetchingEvents")
      axios.get(`http://localhost:8081/api/open/events`)
        .then(response => {
          console.log("getOpenEvents action response: ", response)
          commit("fetchedEvents", response.data)
        })
        .catch(error => {
          console.log("getOpenEvents action error: ", error)
          commit("fetchEventsError")
        })
    },
    //READ event (SHOW)
    getEvent({ commit }, eventID) {
      commit("fetchingEvent")
      axios.get(`http://localhost:8081/api/events/${eventID}`)
        .then(response => {
          console.log("getEvent action response: ", response)
          commit('fetchedEvent', response.data)
        })
        .catch(error => {
          console.error("getEvent action error: ", error)
          commit("fetchEventError")
        })
    },
    resetAddEventSuccess({ commit }) {
      console.log("resetAddEventSuccess action was fired!")
      commit("resetAddEventSuccess")
    },
    //CREATE event
    addEvent({ commit }, eventData) {
      // example newEvent:
      // {
      //   "NPOID": 5,
      //   "Name": "Some Event",
      //   "StartTime": 1553274049,
      //   "EndTime": 1553295649,
      //   "Tags": "booth, convention, info",
      //   "Description": "We are looking for volunteers to help us do something.",
      //   "Location": "515 E Grant St, Phoenix, AZ 85004",
      //   "NumOfVolunteers": 4
      // }
      console.log(eventData.newEvent)

      commit("addingEvent")
      axios.post(`http://localhost:8081/api/events`, eventData.newEvent)
        .then(response => {
          console.table("addEvent action response: ", response)
          commit("addedEvent", response.data)
          eventData.router.push(`/event/${response.data.ID}`)
        })
        .catch(error => {
          console.error("addEvent action error: ", error)
          commit("addEventError")
        })
    },
    //UPDATE event
    updateEvent({ commit }, updatedEvent) {
      //   example updatedEvent: 
      //   {
      //     "ID": 10,
      //     "CreatedAt": "2019-03-22T10:23:38.598966-07:00",
      //     "UpdatedAt": "2019-03-22T10:23:38.598966-07:00",
      //     "DeletedAt": null,
      //     "NPOID": 5,
      //     "Name": "Updated Example Event Name",
      //     "StartTime": 1571764843000,
      //     "EndTime": 1571775643000,
      //     "Tags": "mentor, mentorship, teaching",
      //     "Description": "The Start Time has been updated for this event. So have the tags and numOfVolunteers",
      //     "Location": "515 E Grant St, Phoenix, AZ 85004",
      //     "NumOfVolunteers": 2,
      //     "Shifts": null
      // }
      commit("updatingEvent")
      axios.patch(`http://localhost:8081/api/events/${updatedEvent.ID}`, updatedEvent)
        .then(response => {
          console.table("updateEvent action response: ", response)
          commit("updatedEvent", response.data)

        })
        .catch(error => {
          console.error("updateEvent action error: ", error)
          commit("updateEventError")
        })
    },
    //READ NPOs
    getNPOs({ commit }) {
      commit("fetchingNPOs")
      axios.get(`http://localhost:8081/api/npos`)
        .then(response => {
          console.log("getNPO action response: ", response)
          commit("fetchedNPOs", response.data)
        })
        .catch(error => {
          console.error("getNPO action error: ", error)
          commit("fetchNPOsError")
        })
    },
    //READ NPO
    getOneNPO({ commit }, npoID) {
      commit("fetchingOneNPO")
      axios.get(`http://localhost:8081/api/npo/${npoID}`)
        .then(response => {

          // let volunteer = response.data
          // volunteer.Shifts = volunteer.Shifts ? volunteer.Shifts.map(shift => {
          //   return {
          //     ...shift,
          //     time: moment(shift.ActualStartTime).format('kk:mm')
          //   }
          // }) : []
          let npo = response.data
          npo.Events = npo.Events ? npo.Events.map(event => {
            return {
              ...event,
              time: moment(event.StartTime).format(`'kk:mm'`)
            }
          }) : []
          console.log("getOneNPO action response: ", npo)
          commit("fetchedOneNPO", response.data)
        })
        .catch(error => {
          console.error("getOneNPO action error: ", error)
          commit("fetchOneNPOError")
        })
    },
    //CREATE NPO
    addNPOs({ commit }, newNPO) {
      // example newNPO
      // {
      //   "NPOName": "Organization",
      //   "Description": "Insert description of an NPO here.",
      //   "Website": "www.google.com",
      //   "Email": "clararodriguez@email.com",
      //   "FirstName": "Clara",
      //   "LastName": "Rodriguez",
      //   "Password": "3247980"
      // }
      commit("addingNPO")
      axios.post(`http://localhost:8081/api/npos`, newNPO)
        .then(response => {
          console.log("addNPO action response: ", response)
          commit("addedNPO")

        })
        .catch(error => {
          console.error("addNPO action error: ", error)
          commit("addNPOError")
        })
    },
    //UPDATE NPO
    updateNPO({ commit }, updatedNPO) {
      // example updatedNPO: 
      // {
      //   "ID": 19,
      //   "NPOName": "New NPO Name",
      //   "Description": "Insert description of an NPO here. New details.",
      //   "Website": "www.google.com",
      //   "Email": "newemailaddress@email.com",
      //   "FirstName": "Amelia",
      //   "LastName": "Sanchez",
      //   "Password": "12345"
      // }
      commit("updatingNPO")
      axios.patch(`http://localhost:8081/api/npos/${updatedNPO.ID}`)
        .then(response => {
          console.log("updateNPO action response: ", response)
          commit("updatedNPO", response.data)
        })
        .catch(error => {
          console.error("updateNPO action error: ", error)
          commit("updateNPOError")
        })
    },
    //DELETE NPO
    deleteNPO({ commit }, npoID) {
      npoID = 3
      commit("deletingNPO")
      axios.delete(`http://localhost:8081/api/npos/${npoID}`)
        .then(response => {
          console.log("deleteNPO action response: ", respone)
          commit("deletedNPO")

        })
        .catch(error => {
          console.error("deleteNPO action error: ", error)
          commit("deleteNPOError")
        })
    },
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
    addVolunteer({ commit }, newVolunteer) {
      //   example newVolunteer
      //  {
      //     "Username": "AwesomeUser",
      //     "Bio": "I want to volunteer for some reason.",
      //     "Email": "email2354798@emailer.com",
      //     "FirstName": "Mandy",
      //     "LastName": "Me",
      //     "Password": "password"
      //   }
      commit("addingVolunteer")
      axios.post(`http://localhost:8081/api/volunteers`, newVolunteer)
        .then(response => {
          console.log("addVolunteer action response: ", response)
          commit("addedVolunteer", response.data)
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
      console.log()
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
  },
  getters: {
    npoPastEvents(state) {
      console.log(state.npoEvents)
      const now = Date.now()
      return state.npoEvents.filter(event => event.EndTime < now)
    },
    npoUpcomingEvents(state) {
      const now = Date.now()
      return state.npoEvents.filter(event => event.StartTime > now)
    },
    tagNames(state) {
      return state.tags.map(tag => {
        return tag.TagName
      })
    },
    stringOfNpoEvents(state) {
      if (state.npoEvents) {
        return state.npoEvents.map(event => {
          return moment(event.StartTime).format("YYYY-MM-DD")
        })
      }
    },
    filteredOpenEvents(state) {
      //function to test if search string is included in event name
      function includesName(event, string) {
        return event.Name.toLowerCase().includes(string)
      }
      //function to test if search string is included in event description
      function includesDescription(event, string) {
        return event.Description.toLowerCase().includes(string)
      }
      //function to test if search string is included in event NPO Name
      function includesNPOName(event, string) {
        console.log(event.NPOName)
        return event.NPOName.toLowerCase().includes(string)
      }
      //function to test if search string is included in event tags
      function includesTag(event, string) {
        let tags = event.Tags
        for (let i = 0; i < tags.length; i++) {
          let tag = tags[i]
          if (tag.TagName.toLowerCase().includes(string)) {
            return true
          }
        }
      }
      console.log("state.searchStartDate: ", state.searchStartDate)
      let startDateConstraint = new Date(`${state.searchStartDate} 00:00:00`).getTime();
      let endDateConstraint = new Date(`${state.searchEndDate} 23:59:00`).getTime();
      console.log("endDateConstraint: ", endDateConstraint)

      const opnEventsWithinDateSpan = !state.fetchingEvents ? state.openEvents.filter(event => {
        let eventIsWithinDateConstraints = endDateConstraint >= event.StartTime && event.StartTime >= startDateConstraint
        return eventIsWithinDateConstraints
      }) : state.openEvents

      console.log(opnEventsWithinDateSpan)

      let trimmedLowerCaseSearchString = state.searchString.toLowerCase().trim()
      let searchOption = state.searchOption
      switch (searchOption) {
        case "All":
          return opnEventsWithinDateSpan.filter(event => {
            let isNameIncluded = includesName(event, trimmedLowerCaseSearchString)
            let isDescriptionIncluded = includesDescription(event, trimmedLowerCaseSearchString)
            let isNPONameIncluded = includesNPOName(event, trimmedLowerCaseSearchString)
            let isTagIncluded = includesTag(event, trimmedLowerCaseSearchString)
            let anyIncluded = isNameIncluded || isDescriptionIncluded || isNPONameIncluded || isTagIncluded
            return anyIncluded
          })
        case "Tags":
          return opnEventsWithinDateSpan.filter(event => {
            let isTagIncluded = includesTag(event, trimmedLowerCaseSearchString)
            return isTagIncluded
          })
        case "Name":
          return opnEventsWithinDateSpan.filter(event => {
            let isNameIncluded = includesName(event, trimmedLowerCaseSearchString)
            return isNameIncluded
          })
        case "Description":
          return opnEventsWithinDateSpan.filter(event => {
            let isDescriptionIncluded = includesDescription(event, trimmedLowerCaseSearchString)
            return isDescriptionIncluded
          })
        case "Non Profit Organization":
          return opnEventsWithinDateSpan.filter(event => {
            let isNPONameIncluded = includesNPOName(event, trimmedLowerCaseSearchString)
            return isNPONameIncluded
          })
      }
    }
  }
});

function persistUser(user) {
  localStorage.setItem('id', user.ID)
  localStorage.setItem('user_type', user.UserType)
}

function removePersistedUser() {
  const items = ['id', 'user_type']
  items.forEach(item => localStorage.removeItem(item))
}
