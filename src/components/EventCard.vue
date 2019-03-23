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
                <v-container>
                    <v-layout row >
                        <v-flex xs> 
                            <div v-if="eventView" id="map"></div>
                        </v-flex>
                    </v-layout>
                </v-container>
            </div>
            <h4 v-if="eventView" > From {{ startDateLong }} to {{endDateLong}} </h4>
            <p>{{event.Description}}</p>
            <p v-if="eventView" > {{filledAndOpenShifts.filled  }} of {{ filledAndOpenShifts.needed }} shifts filled. </p>
        </v-card-text>

        <v-card-actions>
            <v-btn v-if="!eventView" :to="'/event/' + event.ID" flat color="primary">Volunteer</v-btn>
            <v-btn v-if="eventView" @click="" flat color="primary">Sign Up</v-btn>

        </v-card-actions>
    </v-card>
</template>

<script>
import moment from "moment";
import gmapsInit from "../utils/gmaps";

export default {
  name: "EventCard",
  props: ["event", "index", "eventView"],
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

  //   async mounted() {
  //     try {
  //       const google = await gmapsInit();
  //       const geocoder = new google.maps.Geocoder();
  //       const map = new google.maps.Map(document.getElementById("map"));

  //       geocoder.geocode({ address: this.event.Location }, (results, status) => {
  //         if (status !== "OK" || !results[0]) {
  //           throw new Error(status);
  //         }

  //         map.setCenter(results[0].geometry.location);
  //         map.fitBounds(results[0].geometry.viewport);
  //         this.addressLatLgn.position = results[0].geometry.location;
  //         new google.maps.Marker({ ...this.addressLatLgn, map });
  //       });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },
  computed: {
    npo() {
      return this.$store.state.npos.find(item => item.ID === this.event.NPOID);
      //   return this.$store.state.npos;
    },
    startDateRead() {
      return moment(this.event.StartTime).format("MMMM Do YYYY");
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
  }
};
</script>

<style stylelang="css" scoped>
#map {
  height: 40vh; /* The height is 400 pixels */
  background: gray;
}
</style>


