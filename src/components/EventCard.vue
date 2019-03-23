<template>
    <v-card 
    tile 
    hover
    min-height="20vh"
    >
        <v-card-title class="primary white--text" primary-title>
            {{event.Name}} |
            {{ startDateRead }}
            <v-icon right class="white--text">event</v-icon>
        </v-card-title>
        <v-card-text>
            <h3> {{npo.NPOName || null}} </h3>
            <div>
                <small class="text-center"> {{event.Location}} </small>
            </div>

            <!-- leaflet map -->

            {{event.Description}}
        </v-card-text>

        <v-card-actions>
            <v-btn v-if="!eventView" :to="'/event/' + event.ID" flat color="primary">Volunteer</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import moment from "moment";
export default {
  name: "EventCard",
  props: ["event", "index", "eventView"],
  computed: {
    npo() {
      return this.$store.state.npos.find(item => item.ID === this.event.NPOID);
      //   return this.$store.state.npos;
    },
    startDateRead() {
      return moment(this.event.StartTime).format("MMMM Do YYYY");
    },
    firstOpenShift() {
      return this.event.Shifts.find(shift => shift.VolunteerID === 0);
    }
  }
};
</script>

