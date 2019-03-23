<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex 
      xs12 
      md6 
      lg4 
      xl4
      v-for="(event, i) in openEvents"
      :key="event.ID"
      >
       <EventCard :event="event" :index="i" /> 
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EventCard from "@/components/EventCard.vue";

export default {
  name: "OpenEvents",
  components: {
    EventCard
  },
  created() {
    this.$store.dispatch("getOpenEvents");
    this.$store.dispatch("getNPOs");
  },
  methods: {},
  computed: {
    openEvents() {
      return this.$store.state.openEvents;
    },
    fetchingEvents() {
      return this.$store.state.fetchingEvents;
    },
    fetchEventsError() {
      return this.$store.state.fetchEventsError;
    },
    fetchEventsSuccess() {
      return this.$store.state.fetchEventsSuccess;
    }
  }
};
</script>
