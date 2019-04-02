import axios from 'axios'

export default {
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
        axios.get(`http://localhost:8081/api/event/${eventID}`)
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
    updateEvent({ commit }, updatedEventObj) {
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
        console.log("this is the updatedEventObj: ", updatedEventObj)
        const updatedEvent = {
            ID: updatedEventObj.updatedEvent.ID,
            NPOID: updatedEventObj.updatedEvent.NPOID,
            Name: updatedEventObj.updatedEvent.Name,
            StartTime: updatedEventObj.updatedEvent.StartTime,
            EndTime: updatedEventObj.updatedEvent.EndTime,
            Tags: updatedEventObj.updatedEvent.Tags,
            Description: updatedEventObj.updatedEvent.Description,
            Location: updatedEventObj.updatedEvent.Location,
            NumOfVolunteers: updatedEventObj.updatedEvent.NumOfVolunteers
        }
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
    //DELETE Event
    deleteEvent({ commit }, eventID) {
        commit("deletingEvent")
        axios.delete(`http://localhost:8081/api/events/delete/${eventID}`)
            .then(response => {
                console.log("deleteEvent response: ", response)
                commit("deletedEvent", response)
            })
            .catch(error => {
                console.error("deleteEvent action error: ", error)
                commit("deleteEventError")
            })
    }
}