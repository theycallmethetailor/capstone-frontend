<template>
  <v-layout wrap>
    <h1>Event Calendar</h1>
          <v-btn 
          color="primary"
          :to="'/new/event/' + Number(this.npoID)" 
          >
            Schedule New Event
          </v-btn>
    <v-flex
      xs12
      class="mb-3"
    >
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
            <template v-for="event in eventsMap[date]">
              <v-menu
                :key="event.ID"
                v-model="event.open"
                full-width
                offset-x
              >
                <template v-slot:activator="{ on }">
                  <div
                    v-ripple
                    class="my-event"
                    v-on="on"
                  >
                  {{ event.Name + ' ' + moment(event.StartTime).format('h:mm a') }}
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
                    <v-toolbar-title> {{ event.Name + ' ' + moment(event.StartTime).format('h:mm a') }} </v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-card-text>
                      <h4> <v-icon left >event</v-icon>  {{ moment(event.StartTime).format("MMMM Do h:mm") }}  </h4>
                      <h3> {{event.NPOName}} </h3>
                      <p>{{ event.Description }}</p>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      flat
                      color="primary"
                      :to="'/event/' + event.ID"
                    >
                      View Event
                    </v-btn>
                    <v-btn
                      flat
                      color="primary"
                      @click="routeToEditEvent(event)"
                    >
                      Edit Event
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </template>
          </template>

          <!-- the events at the top (all-day) -->
          <template v-slot:dayHeadere="{ date }">
            <template v-for="event in eventsMap[date]">
              <!-- all day events don't have time -->
              <div
                v-if="!event.time"
                :key="event.ID"
                class="my-event"
                @click="open(event)"
              >
              {{ event.Name + ' ' + moment(event.StartTime).format('h:mm a') }}
              </div>
            </template>
          </template>
          <!-- the events at the bottom (timed) -->
          <template v-slot:dayBody="{ date, timeToY, minutesToPixels }">
            <template v-for="event in eventsMap[date]">
              <!-- timed events -->
              <div
                v-if="event.time"
                :key="event.ID"
                :style="{ top: timeToY(event.time) + 'px', height: minutesToPixels(event.Duration) + 'px' }"
                class="my-event with-time"
                @click="open(event)"
              >
              {{ event.Name + ' ' + moment(event.StartTime).format('h:mm a') }}
              </div>
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
  name: "NPOCalendar",
  props: ["eventDate", "npoID"],
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
    this.$store.dispatch("getOneNPO", Number(this.npoID));
  },
  mounted() {
    this.$refs.calendar.scrollToTime("08:00");
  },
  computed: {
    npoLoggedIn() {
      return (
        !!this.$store.state.logginUserID &&
        !!this.$store.state.logginUserRole === "NPO"
      );
    },
    loggedInNPOIsCalendarNPO() {
      return !!this.$store.state.logginUserID === Number(this.npoID);
    },
    npo() {
      return this.$store.state.npo;
    },
    npoLoggedIn() {
      return this.$ls.get("user_type") === "NPO";
    },
    loggedInNPOisThisOne() {
      return this.npoLoggedIn && Number(this.$ls.get("id")) === Number(this.id);
    },
    // convert the list of shifts into a map of lists keyed by date
    eventsMap() {
      const eventMap = {};
      if (this.npo.Events) {
        this.npo.Events.forEach(event => {
          (eventMap[moment(event.StartTime).format("YYYY-MM-DD")] =
            eventMap[moment(event.StartTime).format("YYYY-MM-DD")] || []).push(
            event
          );
        });
        return eventMap;
      }
    }
  },
  methods: {
    open(event) {
      alert(event.title);
    },
    routeToEditEvent(event) {
      this.$router.push(`/event/edit/${event.ID}/${event.NPOID}`);
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
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
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