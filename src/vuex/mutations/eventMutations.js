
export default {
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
}