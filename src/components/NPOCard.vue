<template>
  <v-card
  tile
  hover
  min-heigh="20vh"
  >
    <v-card-title
    class="primary white--text"
    primary-title
    >
    {{npo.NPOName}}
    </v-card-title>
    <v-card-text>
      {{ npo.Description }}
        <v-select
          :items="eventsSelect"
          label="Filter Events"
          v-model="eventsType"
        ></v-select>
        <v-autocomplete
          clearable
          v-model="eventName"
          item-text="Name"
          item-value="Name"
          name="agency"
          :items="allEvents"
          label="Search Events"
          >
            <template v-slot:append-outer>
              <v-slide-x-reverse-transition
                  mode="out-in"
                >
                </v-slide-x-reverse-transition>
              </template>
          </v-autocomplete>
          <v-btn 
          v-if="npoLoggedIn && loggedInNPOisThisOne"
          color="primary"
          :to="'/new/event/' + Number(this.id)" 
          >
            Schedule New Event
          </v-btn>
          <v-btn 
          v-if="npoLoggedIn && loggedInNPOisThisOne"
          color="primary"
          :to="'/calendar/npo/' + Number(this.id)" 
          >
            View Event Calendar
          </v-btn>

    <v-container grid-list-md>
      <h3>{{ eventsType }} Events </h3>
      <!-- Events -->
      <v-layout row wrap >
        <v-flex 
        xs12 
        md6 
        lg4 
        xl4
        v-for="(event, i) in filteredEvents"
        :key="event.ID"
        >
        <EventCard :npo="npo" :event="event" :index="i" /> 
        </v-flex>
      </v-layout>
    </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
export default {
  name: "NPOCard",
  props: ["id"],
  components: {
    EventCard
  },
  data() {
    return {
      eventName: undefined,
      now: Date.now(),
      eventsType: "Upcoming",
      eventsSelect: ["Upcoming", "Past", "Both"]
    };
  },
  created() {
    this.$store.dispatch("getOneNPO", this.id);
  },
  computed: {
    npoLoggedIn() {
      return localStorage.user_type === "NPO";
    },
    loggedInNPOisThisOne() {
      return this.npoLoggedIn && Number(localStorage.id) === Number(this.id);
    },
    npo() {
      return this.$store.state.npo;
    },
    isUpcoming() {
      return this.eventsType === "Upcoming";
    },
    isBoth() {
      return this.eventsType === "Both";
    },
    isPast() {
      return this.eventsType === "Past";
    },
    allEvents() {
      return this.$store.state.npoEvents;
    },
    pastEvents() {
      return this.$store.getters.npoPastEvents;
    },
    upcomingEvents() {
      return this.$store.getters.npoUpcomingEvents;
    },
    filteredEvents() {
      if (this.isBoth) {
        if (this.eventName) {
          return this.allEvents.filter(event => event.Name === this.eventName);
        } else {
          return this.allEvents;
        }
      } else if (this.isPast) {
        if (this.eventName) {
          return this.pastEvents.filter(event => event.Name === this.eventName);
        } else {
          return this.pastEvents;
        }
      } else if (this.isUpcoming) {
        if (this.eventName) {
          return this.upcomingEvents.filter(
            event => event.Name === this.eventName
          );
        } else {
          return this.upcomingEvents;
        }
      }
    }
  }
};
</script>