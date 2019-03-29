<template>
  <v-container grid-list-md>
    <v-layout row wrap v-if="openEvents.length" >
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
    <v-layout>
      <v-flex 
      xs12 
      md12 
      lg12 
      xl12
      transition="slide-y-transition"
      > 
      <v-alert
        v-if="!openEvents.length"
        :value="true"
        color="primary"
        icon="info"
        outline
      >
        There are no open events matching your search criteria.
      </v-alert>

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
      return this.$store.getters.filteredOpenEvents;
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
