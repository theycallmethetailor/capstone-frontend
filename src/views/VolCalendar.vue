<template>
  <v-layout wrap>
    <v-flex
      xs12
      class="mb-3"
    >
    <v-container>
      <v-alert 
        dismissible     
        v-model="cancelShiftSuccess"
        color="success"
        icon="check_circle"
        outline
        mode="in-out"
        transition="slide-x-transition"
      >
        Your shift for the event was cancelled successfully. 
      </v-alert>
    </v-container>
    <v-container>
      <v-alert 
      dismissible     
      v-model="signUpShiftSuccess"
      color="success"
      icon="check_circle"
      outline
      mode="in-out"
      transition="slide-x-transition"
    >
      You have signed up for this event successfully!
    </v-alert>
    </v-container>
      <v-sheet height="500">
        <v-calendar
          ref="calendar"
          v-model="start"
          :type="type"
          :end="end"
          color="primary"
        >
        <!-- Events slots -->
        <template v-slot:day="{ date }">
            <template v-for="calEvent in shiftsMap[date]">
              <v-menu
                :key="calEvent.EventID"
                v-model="calEvent.open"
                full-width
                offset-x
              >
                <template v-slot:activator="{ on }">
                  <div
                    v-ripple
                    class="my-event"
                    v-on="on"
                  >
                  <span v-if="calEvent.ActualEndTime > new Date().getTime()" >{{ calEvent.EventName + ' ' + moment(calEvent.ActualStartTime).format('h:mm a') }} </span>
                  
                <v-badge alt="You have unconfirmed shifts that have passed." right color="primary" v-if="calEvent.ActualEndTime < new Date().getTime() && !calEvent.WasWorked" >
                  <template v-slot:badge>
                    <v-icon
                      class="white--text"
                      small
                    >
                      notifications
                    </v-icon>
                  </template>
                  <span>{{ calEvent.EventName + ' ' + moment(calEvent.ActualStartTime).format('h:mm a') }}</span>
                </v-badge>
                  </div>
                </template>
                <v-card
                  color="grey lighten-4"
                  min-width="350px"
                  flat
                >
                  <v-toolbar
                    color="primary"
                    dark
                  >
                    <v-toolbar-title v-html="calEvent.EventName"></v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-card-text>
                      <h4> <v-icon left >event</v-icon>  {{ moment(calEvent.ActualStartTime).format("MMMM Do") }}  </h4>
                      <h3> {{calEvent.NPOName}} </h3>
                      <p>{{ calEvent.EventDescription }}</p>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      flat
                      color="primary"
                      @click="goToEvent(calEvent)"
                    >
                      View Event
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </template>
          </template>

          <!-- the events at the top (all-day) -->
          <template v-slot:dayHeadere="{ date }">
            <template v-for="calEvent in shiftsMap[date]">
              <!-- all day events don't have time -->
              <div
                v-if="!calEvent.time"
                :key="calEvent.EventID"
                class="my-event"
                @click="open(calEvent)"
                v-html="calEvent.EventName"
              ></div>
            </template>
          </template>
          <!-- the events at the bottom (timed) -->
          <template v-slot:dayBody="{ date, timeToY, minutesToPixels }">
            <template v-for="calEvent in shiftsMap[date]">
              <!-- timed events -->
              <div
                v-if="calEvent.time"
                :key="calEvent.ID"
                :style="{ top: timeToY(calEvent.time) + 'px', height: minutesToPixels(calEvent.Duration) + 'px' }"
                class="my-event with-time"
                @click="open(calEvent)"
                v-html="calEvent.EventName"
              ></div>
            </template>
          </template>


        </v-calendar>
      </v-sheet>
    </v-flex>

    <v-flex
      sm4
      xs12
      class="text-sm-left text-xs-center"
    >
      <v-btn @click="$refs.calendar.prev()">
        <v-icon
          dark
          left
        >
          keyboard_arrow_left
        </v-icon>
        Prev
      </v-btn>
    </v-flex>
    <v-flex
      sm4
      xs12
      class="text-xs-center"
    >
      <v-select
        v-model="type"
        :items="typeOptions"
        label="Type"
      ></v-select>
    </v-flex>
    <v-flex
      sm4
      xs12
      class="text-sm-right text-xs-center"
    >
      <v-btn @click="$refs.calendar.next()">
        Next
        <v-icon
          right
          dark
        >
          keyboard_arrow_right
        </v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from "moment";

export default {
  name: "VolCalendar",
  props: ["eventDate", "volID", "eventView"],
  data: () => {
    return {
      moment: moment,
      type: "month",
      start: moment().format("YYYY-MM-DD"),
      end: "2019-12-31",
      typeOptions: [
        { text: "Day", value: "day" },
        { text: "4 Day", value: "4day" },
        { text: "Week", value: "week" },
        { text: "Month", value: "month" }
      ]
    };
  },
  created() {
    this.$store.dispatch("getVolunteer", this.$ls.get("id")); //take out hard coding once login/out added
  },
  mounted() {
    this.$refs.calendar.scrollToTime("08:00");
  },
  computed: {
    volunteer() {
      return this.$store.state.volunteer;
    },
    // convert the list of shifts into a map of lists keyed by date
    shiftsMap() {
      const shiftMap = {};
      if (this.volunteer.Shifts) {
        this.volunteer.Shifts.forEach(shift => {
          (shiftMap[moment(shift.ActualStartTime).format("YYYY-MM-DD")] =
            shiftMap[moment(shift.ActualStartTime).format("YYYY-MM-DD")] ||
            []).push(shift);
        });
        return shiftMap;
      }
    },
    cancelShiftSuccess: {
      get() {
        return this.$store.state.cancelShiftSuccess;
      },
      set() {
        this.$store.commit("resetVolCancelSuccessMessage");
      }
    },
    signUpShiftSuccess: {
      get() {
        return this.$store.state.signUpShiftSuccess;
      },
      set() {
        this.$store.commit("resetVolSignupSuccess");
      }
    }
  },
  methods: {
    open(event) {
      alert(event.title);
    },
    goToEvent(calEvent) {
      // this.$store.dispatch("resetAddEventSuccess");
      this.$router.push(`/event/${calEvent.ID}`);
    }
  }
};
</script>

<style lang="css" scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #ff8a80;
  color: #ffffff;
  border: 1px solid #ff8a80;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}
.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
</style>