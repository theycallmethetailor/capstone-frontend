<template>
    <v-card 
    tile 
    hover
    min-height="20vh"
    >
        <v-card-title 
        class="primary white--text" 
        primary-title
        @click="goToEvent"
        >
          {{event.Name}}
        </v-card-title>
       
        <v-card-text>
        <v-alert
          :value="volIsSignedUp"
          color="info"
          icon="info"
          outline
        >
          You are already signed up for this shift.
        </v-alert>
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
                            <v-layout>
                              <v-flex>
                                <v-card  flat>
                                  <v-card-title>
                                    <h4>Description</h4>
                                  </v-card-title>
                                  <v-card-text >
                                    <p>{{event.Description}}</p>
                                  </v-card-text>
                                </v-card>
                                <div v-if="eventView" id="map"></div>
                              </v-flex>

                            </v-layout>

                        </v-flex>
                    </v-layout>
                </v-container>

                </v-flex>
                <v-flex xs12 sm12 md6 lg6 xl6>
                  <h4 v-if="eventView" > This event is from {{ startDateLong }} to {{endDateLong}} </h4>
                  <v-container>
                    <v-layout>
                      <v-flex>
                        <VolCalendar v-if="volunteerLoggedIn" :eventView="true" :id="volunteerID" />
                        <NPOCalendar v-if="npoLoggedIn" :eventView="true" :npoID="npoID"  />
                        <LoggedOutCalendar v-if="!npoLoggedIn && !volunteerLoggedIn" :event="event" />
                      </v-flex>
                    </v-layout>
                  </v-container>
                  
                </v-flex>
              </v-layout>
            </v-container>
            <v-expansion-panel v-if="!eventView" inset>
              <v-expansion-panel-content class="secondary">
                <template v-slot:header>
                  <h4>Description</h4>
                </template>
                <v-card color="grey lighten-4"  flat>
                  <v-card-text class="font-weight-thin" >
                    <p>{{event.Description}}</p>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <p v-if="eventView" > {{filledAndOpenShifts.filled  }} of {{ filledAndOpenShifts.needed }} shifts filled. </p>
            <p class="grey--text" > Tags:  {{eventTags}} </p>
        </v-card-text>

        <v-card-actions>
            <v-btn v-if="!eventView" @click="goToEvent" flat color="primary">View Event</v-btn>
            <v-btn v-if="eventView && volunteerLoggedIn && !!firstOpenShift && !volIsSignedUp" @click="volSignUp" flat color="primary">Sign Up</v-btn>
            <v-btn v-if="eventView && !volunteerLoggedIn && !npoLoggedIn" to="/login" >Sign Up</v-btn>
            <v-btn v-if="eventView && volunteerLoggedIn  && volIsSignedUp" @click="volCancelShift" flat color="error">Cancel Shift</v-btn>
            <v-btn v-if="eventView && isLoggedInNPOsEvent" :to="'/event/edit/' + event.ID + '/' + event.NPOID" >Edit Event</v-btn>

        </v-card-actions>
    </v-card>
</template>

<script>
import moment from "moment";
import gmapsInit from "../utils/gmaps";
import VolCalendar from "../views/VolCalendar.vue";
import NPOCalendar from "../views/NPOCalendar.vue";
import LoggedOutCalendar from "./LoggedOutCalendar.vue";
export default {
  name: "EventCard",
  props: ["event", "index", "eventView", "npo"],
  components: {
    VolCalendar,
    NPOCalendar,
    LoggedOutCalendar
  },
  data() {
    return {
      volLoggedIn: false,
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
    loggedInUserRole() {
      return this.$store.state.loggedInUserRole;
    },
    volunteerLoggedIn() {
      return (
        !!this.$store.state.loggedInUserID &&
        this.loggedInUserRole === "Volunteer"
      );
    },
    npoLoggedIn() {
      return (
        !!this.$store.state.loggedInUserID && this.loggedInUserRole === "NPO"
      );
    },
    isLoggedInNPOsEvent() {
      return (
        this.npoLoggedIn &&
        Number(this.event.NPOID) === Number(this.$store.state.loggedInUserID)
      );
    },
    volunteerID() {
      return this.volunteerLoggedIn ? this.$store.state.loggedInUserID : null;
    },
    npoID() {
      return this.npoLoggedIn ? this.$store.state.loggedInUserID : null;
    },
    volIsSignedUp() {
      if (
        this.event.Shifts &&
        this.$store.state.loggedInUserRole === "Volunteer"
      ) {
        return !!this.event.Shifts.filter(
          shift => Number(shift.VolunteerID) === Number(this.volunteerID)
        ).length;
      }
    },
    eventTags() {
      if (this.event.Tags) {
        return this.event.Tags.map(tag => tag.TagName).join(", ");
      }
      return [];
    },
    startDateRead() {
      return moment(this.event.StartTime).format("MMMM Do h:mm a");
    },
    endDateRead() {
      return moment(this.event.EndTime).format("MMMM Do h:mm a");
    },
    startDateLong() {
      return moment(this.event.StartTime).format("MMMM Do YYYY, h:mm a");
    },
    endDateLong() {
      return moment(this.event.EndTime).format("MMMM Do YYYY, h:mm a");
    },
    firstOpenShift() {
      if (this.event.Shifts) {
        return this.event.Shifts.find(shift => shift.VolunteerID === 0);
      }
    },
    filledAndOpenShifts() {
      if (this.event.Shifts) {
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
      return {
        filled: 0,
        needed: 0
      };
    }
  },
  methods: {
    volSignUp() {
      let signupObj = {
        ID: this.firstOpenShift.ID,
        VolunteerID: this.volunteerID,
        router: this.$router
      };
      this.$store.dispatch("signUpForShift", signupObj);
    },
    volCancelShift() {
      let cancelOb = {
        ID: this.event.Shifts.find(
          event => event.VolunteerID === this.volunteerID
        ).ID,
        VolunteerID: this.volunteerID,
        router: this.$router
      };
      this.$store.dispatch("cancelShift", cancelOb);
    },
    goToEvent() {
      if (!this.eventView) {
        this.$store.dispatch("resetAddEventSuccess");
        this.$router.push(`/event/${this.event.ID}`);
      }
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


