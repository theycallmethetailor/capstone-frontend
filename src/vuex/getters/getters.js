import moment from "moment"

export default {
    npoPastEvents(state) {
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
    HoursByTagArray(state) {
        let arrayOfData = state.HoursByTag.map(tag => {
            return tag;
        });
        return arrayOfData;
    },
    hoursTags(state) {
        let arrayOfData = state.HoursByTag.map(tag => {
            return tag.TagName
        });
        return arrayOfData;
    },
    hoursTagsData(state) {
        let arrayOfData = state.HoursByTag.map(tag => {
            return tag.HoursWorked
        });
        return arrayOfData;
    },
    hoursNPOs(state) {
        let arrayOfData = state.HoursByNPO.map(npoData => {
            return npoData.NPOName;
        });
        return arrayOfData
    },
    hoursNPOData(state) {
        let arrayOfData = state.HoursByNPO.map(npoData => {
            return npoData.HoursWorked;
        });
        return arrayOfData
    },
    HoursByEventArray(state) {
        let arrayOfData = state.HoursByEvent.map(event => {
            return event;
        });
        return arrayOfData;
    },
    hoursEvents(state) {
        let arrayOfData = state.HoursByEvent.map(eventDat => {
            return eventDat.EventName;
        });
        return arrayOfData
    },
    hoursEventData(state) {
        let arrayOfData = state.HoursByEvent.map(eventData => {
            return eventData.HoursWorked;
        });
        return arrayOfData
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
        let startDateConstraint = new Date(`${state.searchStartDate} 00:00:00`).getTime();
        let endDateConstraint = new Date(`${state.searchEndDate} 23:59:00`).getTime();

        const opnEventsWithinDateSpan = !state.fetchingEvents && state.openEvents ? state.openEvents.filter(event => {
            let eventIsWithinDateConstraints = endDateConstraint >= event.StartTime && event.StartTime >= startDateConstraint
            return eventIsWithinDateConstraints
        }) : state.openEvents


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