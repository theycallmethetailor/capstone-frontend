<template>
  <v-layout wrap>
    <v-flex
      xs12
      class="mb-3"
    >
      <v-sheet height="500">
        <v-calendar
          ref="calendar"
          :type="type"
          :end="end"
          color="primary"
          :value="start"
        >
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
                    v-if="!event.time"
                    v-ripple
                    class="my-event"
                    v-on="on"
                    v-html="event.Name"
                  ></div>
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
                    <v-btn icon>
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-toolbar-title v-html="event.Name"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>favorite</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>more_vert</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-title primary-title>
                    <span v-html="event.Description"></span>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn
                      flat
                      color="secondary"
                    >
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </template>
          </template>
        </v-calendar>
      </v-sheet>
    </v-flex>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import moment from "moment";

export default {
  name: "LoggedOutCalendar",
  props: ["event"],
  data() {
    return {
      type: "month",
      start: moment(this.event.StartTime).format("YYYY-MM-DD"),
      end: "2019-01-06"
    };
  },
  computed: {
    // convert the list of events into a map of lists keyed by date
    eventsMap() {
      const map = {};
      let arrayEvent = [this.event];
      arrayEvent.forEach(e =>
        (map[moment(e.StartTime).format("YYYY-MM-DD")] =
          map[moment(e.StartTime).format("YYYY-MM-DD")] || []).push(e)
      );
      return map;
    }
  },
  methods: {
    open(event) {
      alert(event.title);
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
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}
</style>