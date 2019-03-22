import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import { stat } from 'fs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openEvents: [],
    //READ events
    fetchingEvents: false,
    fetchEventsError: false,
    fetchEventsSuccess: false,
    //CREATE event
    addingEvent: false,
    addEventError: false,
    addEventSuccess: false,
    //UPDATE event
    updatingEvent: false,
    updateEventError: false,
    updateEventSuccess: false,
    //READ NPO
    npo: {},
    fetchingNPO: false,
    fetchNPOError: false,
    fetchNPOSuccess: false,
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
  },
  mutations: {
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
      state.addingEvent = false
      state.addEventSuccess = true
      state.openEvents.push(newEvent)
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
    // READ NPO
    fetchingNPO(state) {
      state.fetchNPOError = false
      state.fetchNPOSuccess = false
      state.fetchingNPO = true
    },
    fetchNPOError(state) {
      state.fetchingNPO = false
      state.fetchNPOError = true
    },
    fetchedNPO(state, npo) {
      state.fetchingNPO = false
      state.fetchNPOSuccess = true
      state.npo = npo
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
    }

  },
  actions: {
    //READ events
    getOpenEvents({ commit }) {
      commit("fetchingEvents")
      axios.get(`http://localhost:8081/api/events/open`)
        .then(response => {
          console.log("getOpenEvents action response: ", response)
          commit("fetchedEvents", response.data)
        })
        .catch(error => {
          console.log("getOpenEvents action error: ", error)
          commit("fetchEventsError")
        })
    },
    //CREATE event
    addEvent({ commit }, newEvent) {
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

      commit("addingEvent")
      axios.post(`http://localhost:8081/api/events`, newEvent)
        .then(response => {
          console.table("addEvent action response: ", response)
          commit("addedEvent", response.data)
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
      axios.put(`http://localhost:8081/api/events/${updatedEvent.ID}`, updatedEvent)
        .then(response => {
          console.table("updateEvent action response: ", response)
          commit("updatedEvent", response.data)

        })
        .catch(error => {
          console.error("updateEvent action error: ", error)
          commit("updateEventError")
        })
    },
    //READ NPO
    getNPO({ commit }, npoID) {
      commit("fetchingNPO")
      axios.get(`http://localhost:8081/api/npos/${npoID}`)
        .then(response => {
          console.log("getNPO action response: ", response)
          commit("fetchedNPO", response.data)
        })
        .catch(error => {
          console.error("getNPO action error: ", error)
          commit("fetchNPOError")
        })
    },
    //CREATE NPO
    addNPO({ commit }, newNPO) {
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
      axios.put(`http://localhost:8081/api/npos/${updatedNPO.ID}`)
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
      axios.get(`http://localhost:8081/api/volunteers/${volunteerID}`)
        .then(response => {
          console.log("getVOlunteer action response: ", response)
          commit("fetchedVolunteer", response.data)

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
      axios.put(`http://localhost:8081/api/volunteers/${updatedVolunteer.ID}`)
        .then(response => {
          console.log("updateVolunteer action response: ", response)
          commit("updatedVolunteer", response.data)
        })
        .catch(error => {
          console.error("updateVolunteer action error: ", error)
          commit("updateVolunteerError")
        })
    }

  },
});
