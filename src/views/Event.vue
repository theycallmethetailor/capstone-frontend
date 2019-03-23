<template>
    <v-container>
        <v-layout>
            <v-flex>
                <EventCard :event="event" :eventView="true" />   
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
export default {
  name: "Event",
  props: ["id"],
  components: {
    EventCard
  },
  created() {
    this.$store.dispatch("getNPOs");
    this.$store.dispatch("getEvent", this.id);
  },
  computed: {
    event() {
      return this.$store.state.event;
    }
  }
};
</script>