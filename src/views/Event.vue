<template>
    <v-container>
        <v-layout>
            <v-flex>
                <!-- Event Added Sucessfully alert -->
                <v-alert
                  dismissible
                  v-model="addEventSuccess"
                  :value="true"
                  color="success"
                  icon="check_circle"
                  outline
                  mode="in-out"
                  transition="slide-x-transition"
                >
                  Your event was created successfully!
                </v-alert>

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
    this.$store.dispatch("getEvent", Number(this.id));
  },
  computed: {
    event() {
      return this.$store.state.event;
    },
    addEventSuccess: {
      get() {
        return this.$store.state.addEventSuccess;
      },
      set() {
        this.$store.commit("resetAddEventSuccess");
      }
    }
  }
};
</script>