<template>
    <v-card 
    tile 
    hover
    min-height="20vh"
    >
        <v-card-title 
        class="primary headline white--text" 
        primary-title
        @click="goToEvent"
        >
          {{event.Name}}
        </v-card-title>
       
        <v-card-text>
        <v-alert
          :value="volIsSignedUp && !volunteerNeedsToConfirmShift"
          color="info"
          icon="info"
          outline
        >
          You are already signed up for this shift.
        </v-alert>
        <v-alert
          :value="eventView && volunteerHasConflictingShift && !volIsSignedUp"
          color="info"
          icon="info"
          outline
        >
          You already have a shift that conflicts with this event. Please review your calendar below.
        </v-alert>
        <v-alert
          :value="volunteerNeedsToConfirmShift"
          color="info"
          icon="info"
          outline
        >
          This event has passed. Please confirm you've worked this shift by clicking the "Confirm Shift" button below. 
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
              <v-layout row wrap >
                <v-flex xs12 sm12 md6 lg6 xl6>
                <v-container>
                    <v-layout >
                        <v-flex>
                            <v-container>
                              <v-layout>
                                <v-flex>
                                  <h4>Event Location: {{event.Location}} </h4> 
                                </v-flex>
                              </v-layout>
                            </v-container>
                            <v-layout>
                              <v-flex>
                                <v-container>
                                  <v-layout>
                                    <v-flex>
                                      <div v-if="eventView" id="map"></div>
                                    </v-flex>
                                  </v-layout>
                                </v-container>
                                <v-card color="grey lighten-4" flat>
                                  <v-card-title class="secondary title ">
                                    <h4>Description</h4>
                                  </v-card-title>
                                  <v-card-text >
                                    <p>{{event.Description}}</p>
                                  </v-card-text>
                                </v-card>
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
                  <v-card-text>
                    <p>{{event.Description}}</p>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <p v-if="eventView" > {{filledAndOpenShifts.filled  }} of {{ filledAndOpenShifts.needed }} shifts filled. </p>
            <v-container>
            <p class="font-weight-thin" > Tags:  {{eventTags}} </p>

            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-btn v-if="!eventView" @click="goToEvent" color="primary">View Event</v-btn>
            <v-btn v-if="eventView && volunteerLoggedIn && !!firstOpenShift && !volIsSignedUp && !volunteerHasConflictingShift" @click="volSignUp" color="primary">Sign Up</v-btn>
            <v-btn v-if="eventView && !volunteerLoggedIn && !npoLoggedIn" color="primary" to="/login" >Sign Up</v-btn>
            <v-btn v-if="eventView && volunteerLoggedIn  && volIsSignedUp && !volunteerNeedsToConfirmShift" @click="volCancelShift" color="error">Cancel Shift</v-btn>
            <v-btn v-if="eventView && volunteerNeedsToConfirmShift" color="primary" @click="volConfirmShift" > Confirm Shift </v-btn>
            <v-btn v-if="eventView && isLoggedInNPOsEvent" color="primary" :to="'/event/edit/' + event.ID + '/' + event.NPOID" >Edit Event</v-btn>

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
  props: ["event", "index", "eventView", "npo", "eventID"],
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
  created() {
    if (this.$ls.get("user_type") === "Volunteer") {
      this.$store.dispatch("getVolunteer", Number(this.$ls.get("id")));
    }
    if (this.$ls.get("user_type") === "Volunteer") {
      this.$store.dispatch("getAllVolunteerShifts", Number(this.$ls.get("id")));
    }
  },
  async mounted() {
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(document.getElementById("map"));

      geocoder.geocode({ address: this.event.Location }, (results, status) => {
        if (status !== "OK" || !results[0]) {
          throw new Error(status);
        }

        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
        this.addressLatLgn.position = results[0].geometry.location;
        new google.maps.Marker({ ...this.addressLatLgn, map });
      });
    } catch (error) {
      console.error(error);
    }
  },
  computed: {
    now() {
      return new Date().getTime();
    },
    eventHasPassed() {
      return this.event.EndTime < this.now;
    },
    volunteersShift() {
      if (this.volunteerLoggedIn && this.volIsSignedUp) {
        return this.event.Shifts.filter(
          shift => Number(shift.VolunteerID) === Number(this.volunteerID)
        )[0];
      } else {
        return [];
      }
    },
    volunteerNeedsToConfirmShift() {
      if (this.volunteersShift) {
        return this.volunteersShift.WasWorked === false && this.eventHasPassed;
      }
    },
    volunteerHasConflictingShift() {
      if (this.volunteerLoggedIn) {
        return !!this.$store.state.volunteerShifts.filter(shift => {
          return (
            shift.ActualStartTime >= this.event.StartTime &&
            shift.ActualStartTime <= this.event.EndTime
          );
        }).length;
      }
    },
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
      return this.volunteerLoggedIn ? this.$ls.get("id") : null;
    },
    npoID() {
      return this.npoLoggedIn ? this.$store.state.loggedInUserID : null;
    },
    volIsSignedUp() {
      if (this.event.Shifts && this.$ls.get("user_type") === "Volunteer") {
        return !!this.event.Shifts.filter(
          shift =>
            Number(shift.VolunteerID) ===
            Number(this.$store.state.loggedInUserID)
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
    volConfirmShift() {
      let signupObj = {
        ID: this.firstOpenShift.ID,
        VolunteerID: Number(this.volunteerID),
        router: this.$router
      };
      this.$store.dispatch("volConfirmShift", signupObj);
    },
    volSignUp() {
      let signupObj = {
        ID: this.firstOpenShift.ID,
        VolunteerID: Number(this.volunteerID),
        router: this.$router
      };
      this.$store.dispatch("signUpForShift", signupObj);
    },
    volCancelShift() {
      let cancelOb = {
        ID: this.event.Shifts.find(
          event => event.VolunteerID === Number(this.volunteerID)
        ).ID,
        VolunteerID: Number(this.volunteerID),
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


