
module.exports = {
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
        state.eventToUpdate = event
        state.eventToUpdateTags = event.Tags.map(tag => tag.TagName)
        state.eventShifts = event.Shifts
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
        if (state.openEvents) {
            state.openEvents.push(newEvent)
        } else {
            state.openEvents = [newEvent]
        }

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
                event.NPOID = updatedEvent.NPOID
                event.Name = updatedEvent.Name
                event.StartTime = updatedEvent.StartTime
                event.EndTime = updatedEvent.EndTime
                event.Tags = updatedEvent.Tags
                event.Description = updatedEvent.Description
                event.Location = updatedEvent.Location
                event.NumOfVolunteers = updatedEvent.NumOfVolunteers
            }
            return event
        })
        state.event.NPOID = updatedEvent.NPOID
        state.event.Name = updatedEvent.Name
        state.event.StartTime = updatedEvent.StartTime
        state.event.EndTime = updatedEvent.EndTime
        state.event.Tags = updatedEvent.Tags
        state.event.Description = updatedEvent.Description
        state.event.Location = updatedEvent.Location
        state.event.NumOfVolunteers = updatedEvent.NumOfVolunteers
    },
    updateEventToUpdate(state, eventToUpdate) {
        state.eventToUpdate.Name = eventToUpdate.Name
        state.eventToUpdate.Description = eventToUpdate.Description
        state.eventToUpdate.NumOfVolunteers = eventToUpdate.NumOfVolunteers
        state.eventToUpdate.Tags = eventToUpdate.Tags
        state.eventToUpdate.StartTime = eventToUpdate.StartTime
    },
    resetUpdateEventSuccess(state) {
        state.updateEventSuccess = !state.updateEventSuccess
    },
    resetUpdateEventError(state) {
        state.resetUpdateEventError = !state.resetUpdateEventError
    },
    //DELETE Event
    deletingEvent(state) {
        state.deleteEventSuccess = false
        state.deleteEventError = false
        state.deletingEvent = true
    },
    deleteEventError(state) {
        state.deletingEvent = false
        state.deleteEventError = true
    },
    deletedEvent(state, deletedEventID) {
        state.deletingEvent = false
        state.deleteEventSuccess = true
        state.openEvents = state.openEvents.map(event => {
            event.ID !== deletedEventID
        })
    },
    resetDeleteEventSuccess(state) {
        state.deleteEventSuccess = !state.deleteEventSuccess
    },
}