<template>
    <v-card 
    tile 
    hover
    min-height="20vh"
    >
        <v-card-title 
        class="primary white--text" 
        primary-title
        >
          {{event.Name}}
        </v-card-title>
       
        <v-card-text>
            <h4> <v-icon left >event</v-icon>  {{ startDateRead }} to {{ endDateRead }} </h4>
            <v-btn
              flat
              color="primary"
              :to="'/npo/' + event.NPOID"
            >
            <h3> {{ event.NPOName || event.NPOName}} </h3>

            </v-btn>
            <div>
                <small v-if="!eventView" class="text-center"> {{event.Location}} </small>
            </div>
            <v-container v-if="eventView">
              <v-layout>
                <v-flex xs12 sm12 md6 lg6 xl6>
                <v-container>
                    <v-layout row >
                        <v-flex>
                            <h4>Event Location: {{event.Location}} </h4> 
                            <div v-if="eventView" id="map"></div>
                        </v-flex>
                    </v-layout>
                </v-container>

                </v-flex>
                <v-flex xs12 sm12 md6 lg6 xl6>
                  <h4 v-if="eventView" > This event is from {{ startDateLong }} to {{endDateLong}} </h4>
                  <v-container>
                    <v-layout>
                      <v-flex>
                        <VolCalendar />
                      </v-flex>
                    </v-layout>
                  </v-container>
                  
                </v-flex>
              </v-layout>
            </v-container>
            <p>{{event.Description}}</p>
            <p v-if="eventView" > {{filledAndOpenShifts.filled  }} of {{ filledAndOpenShifts.needed }} shifts filled. </p>
        </v-card-text>

        <v-card-actions>
            <v-btn v-if="!eventView" :to="'/event/' + event.ID" flat color="primary">Volunteer</v-btn>
            <v-btn v-if="eventView && !volIsSignedUp" @click="volSignUp" flat color="primary">Sign Up</v-btn>
            <v-btn v-if="eventView && volIsSignedUp" @click="volSignUp" flat color="error">Cancel Shift</v-btn>

        </v-card-actions>
    </v-card>
</template>

<script>
import moment from "moment";
import gmapsInit from "../utils/gmaps";
import VolCalendar from "../views/VolCalendar.vue";
export default {
  name: "EventCard",
  props: ["event", "index", "eventView", "npo"],
  components: {
    VolCalendar
  },
  data() {
    return {
      map: null,
      tileLayer: null,
      layers: [],
      addressLatLgn: {
        position: {}
      }
    };
  },
  // async mounted() {
  //   try {
  //     const google = await gmapsInit();
  //     const geocoder = new google.maps.Geocoder();
  //     const map = new google.maps.Map(document.getElementById("map"));

  //     geocoder.geocode({ address: this.event.Location }, (results, status) => {
  //       if (status !== "OK" || !results[0]) {
  //         throw new Error(status);
  //       }

  //       map.setCenter(results[0].geometry.location);
  //       map.fitBounds(results[0].geometry.viewport);
  //       this.addressLatLgn.position = results[0].geometry.location;
  //       new google.maps.Marker({ ...this.addressLatLgn, map });
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },
  computed: {
    volIsSignedUp() {
      return !!this.event.Shifts.filter(
        shift => shift.VolunteerID === this.$store.state.volunteer.ID
      );
    },
    startDateRead() {
      return moment(this.event.StartTime).format("MMMM Do");
    },
    endDateRead() {
      return moment(this.event.EndTime).format("MMMM Do");
    },
    startDateLong() {
      return moment(this.event.StartTime).format("MMMM Do YYYY, h:mm a");
    },
    endDateLong() {
      return moment(this.event.EndTime).format("MMMM Do YYYY, h:mm a");
    },
    firstOpenShift() {
      return this.event.Shifts.find(shift => shift.VolunteerID === 0);
    },
    filledAndOpenShifts() {
      return this.event.Shifts.reduce(
        (acc, shift) => {
          if (shift.VolunteerID !== 0) {
            acc.filled++;
          }
          return acc;
        },
        {
          filled: 0,
          needed: this.event.Shifts.length
        }
      );
    }
  },
  methods: {
    volSignUp() {
      this.$router.push("/volunteer/calendar");
    }
  }
};
</script>

<style stylelang="css" scoped>
#map {
  height: 40vh; /* The height is 400 pixels */
  background: gray;
}
</style>


