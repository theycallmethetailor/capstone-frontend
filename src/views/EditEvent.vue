<template>
    <v-container>
        <v-layout>
            <v-flex>
                <EditEventForm :loading="fetchingEvent" :eventID="numberEventID" :npoID="numberNPOID" />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import EditEventForm from "@/components/EditEventForm.vue";
export default {
  name: "EditEvent",
  props: ["eventID", "npoID"],
  components: {
    EditEventForm
  },
  computed: {
    numberNPOID() {
      return Number(this.npoID);
    },
    numberEventID() {
      return Number(this.eventID);
    },
    fetchingEvent() {
      return this.$store.state.fetchingEvent;
    }
  }
};
</script>