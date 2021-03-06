<template>
    <v-card>
        <v-card-title
        class="primary white--text"
        primary-title
        >  
        New Event
        </v-card-title>
        <v-card-text>
            <!-- Alerts Section -->
            <v-layout>
                <v-flex>
                    <!-- success -->
                    <v-alert
                    v-model="updateEventSuccess"
                    dismissible
                    mode="out-in"
                    transition="slide-x-transition"
                    color="success"
                    icon="check_circle"
                    outline
                    >
                    Your changes were saved successfully.
                    </v-alert>
                    <!-- error -->
                    <v-alert
                    v-model="updateEventError"
                    dismissible
                    mode="out-in"
                    transition="slide-x-transition"
                    color="error"
                    icon="warning"
                    outline
                    >
                    There was an error saving your changes.
                    </v-alert>
                    <!-- Deleted success -->
                    <v-alert
                    v-model="deleteEventSuccess"
                    dismissible
                    mode="out-in"
                    transition="slide-x-transition"
                    color="success"
                    icon="check_circle"
                    outline
                    >
                    Your event was deleted successfully.
                    </v-alert>
                    <!-- Deleted error -->
                    <v-alert
                    v-model="deleteEventError"
                    dismissible
                    mode="out-in"
                    transition="slide-x-transition"
                    color="error"
                    icon="warning"
                    outline
                    >
                    There was an error saving your changes.
                    </v-alert>
                </v-flex>
            </v-layout>

            <v-form
            ref="updateEventForm"
            v-model="valid"
            lazy-validation
            :loading="fetchingEvent"
            >
              <!-- Event Name input -->
              <v-layout justify-space-around>
                <v-flex xs12 sm11 md11 xl11>
                  <v-text-field
                    :loading="fetchingEvent"
                    v-model="Name"
                    :rules="nameRules"
                    :count="25"
                    prepend-icon="title"
                    label="Event Name"
                    placeholder="EventName"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <!-- NumOfVolunteers Input -->
              <v-layout justify-space-around>
                <v-flex xs12 sm11 md11 xl11>
                  <v-text-field
                    :loading="fetchingEvent"
                    v-model="NumOfVolunteers"
                    :rules="volNumRules"
                    prepend-icon="people"
                    type="number"
                    label="Number of Volunteers Needed for Event"
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
              <!-- Description of Event -->
              <v-layout justify-space-around>
                <v-flex xs12 sm11 md11 lg11 xl11>
                  <v-textarea
                    :loading="fetchingEvent"
                    v-model="Description"
                    :rules="descriptionRules"
                    :count="1000"
                    prepend-icon="description"
                    name="input-7-1"
                    label="Event Description"
                    placeholder="Enter a description of the event and what help you need."
                    hint="Enter a description of the event and what help you need."
                  ></v-textarea>
                </v-flex>
              </v-layout>
              <!-- Address Using Google Places API -->
              <v-layout justify-space-around>
                <v-flex xs12 sm11 md11 lg11 xl11 >
                  <vuetify-google-autocomplete
                    :loading="fetchingEvent"
                      hint="Please type in and select the correct address from the dropdown."
                      v-model="Address"
                      :rules="addressRules"
                      label="Event Address"
                      prepend-icon="add_location"
                      ref="address"
                      id="map"
                      classname="form-control"
                      placeholder="Event Address"
                      v-on:placechanged="getAddressData"
                      country="us"
                  >
                  </vuetify-google-autocomplete>
                </v-flex>
              </v-layout>
              <!-- CompBox for Tags -->
              <v-layout justify-space-around >
                <v-flex xs12 sm11 md11 lg11 xl11>
                  <template>
                    <v-combobox
                      :rules="tagsRules"
                      prepend-icon="subject"
                      v-model="Tags"
                      :items="tagsNames"
                      :search-input.sync="search"
                      hide-selected
                      label="Add some tags"
                      multiple
                      persistent-hint
                      deletable-chips
                      chips
                      clear-icon
                      :loading="fetchingTags"
                    >
                      <template v-slot:item="{item, index}" >
                        <v-chip
                          color="primary"
                          class="white--text"
                        >
                          {{ item }}
                        </v-chip>
                      </template>
                      <template v-slot:no-data>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>
                              No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
                            </v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </template>
                    </v-combobox>
                  </template>
                </v-flex>
              </v-layout>

              <!-- Start Date and Time -->
              <template>
                <v-layout justify-space-around wrap>
                  <!-- Start Date -->
                  <v-flex xs12 sm5 md5 lg5 xl5 class="my-3">
                    <v-dialog
                      ref="dialogStart"
                      v-model="startDateModal"
                      :return-value.sync="startDate"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          :loading="fetchingEvent"
                          :rules="startDateRules"
                          v-model="startDate"
                          label="Event Start Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                      v-model="startDate" 
                      scrollable
                      :events="stringOfNpoEvents"
                      event-color="primary"
                      >
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="startDateModal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="handleStartDateChange(startDate, Tags)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                  <v-flex xs12 sm5 md5 lg5 xl5 class="my-3">
                    <!-- Start Time -->
                    <v-dialog
                      ref="startTimeDialog"
                      v-model="startTimeModal"
                      :return-value.sync="StartTime"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          :loading="fetchingEvent"
                          :rules="startTimeRules"
                          v-model="StartTime"
                          label="Event Start Time"
                          prepend-icon="access_time"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="startTimeModal"
                        v-model="StartTime"
                        full-width
                      >
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="startTimeModal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="handleStartTimeChange(StartTime, Tags)">OK</v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-flex>
                </v-layout>
              </template>
              <!-- End Date and Time -->
              <template>
                <v-layout justify-space-around wrap >
                  <v-flex  xs12 sm5 md5 lg5 xl5 class="my-3">
                    <!-- End Date -->
                    <v-dialog
                      ref="dialogEnd"
                      v-model="endDateModal"
                      :return-value.sync="endDate"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          :loading="fetchingEvent"
                          :rules="endDateRules"
                          v-model="endDate"
                          label="Event End Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                      :rules="endDateRules"
                      :min="startDate" 
                      v-model="endDate" 
                      scrollable
                      :events="stringOfNpoEvents"
                      event-color="primary"
                      >
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="endDateModal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="handleEndDateChange(endDate, Tags)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                  <v-flex  xs12 sm5 md5 lg5 xl5 class="my-3">
                    <!-- End Time -->
                    <v-dialog
                      ref="endTimeDialog"
                      v-model="endTimeModal"
                      :return-value.sync="EndTime"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          :loading="fetchingEvent"
                          :rules="endTimeRules"
                          v-model="EndTime"
                          label="Event End Time"
                          prepend-icon="access_time"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        :min="minEndTime"
                        v-if="endTimeModal"
                        v-model="EndTime"
                        full-width
                      >
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="endTimeModal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="handleEndTimeChange(EndTime, Tags)">OK</v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-flex>
                </v-layout>
              </template>
              <!-- Submit Button -->
              <v-btn
              :loading="updatingEvent || fetchingEvent"
              :disabled="!valid || deletingEvent" 
              color="primary"
              @click="updateEvent"
              >
                Save Changes
              </v-btn>
              <v-btn
              :disabled="deletingEvent"
              :loading="updatingEvent"
                @click="goToEvent"
              >
                  View Event
              </v-btn>

                <v-btn
                color="error"
                :disabled="updatingEvent"
                @click="confirmDeleteDialog = true"
                >
                    Delete Event
                </v-btn>

            </v-form>
        </v-card-text>

        <!-- Confirm Delete Dialog -->
        <template>
          <div class="text-xs-center">
            <v-dialog
              v-model="confirmDeleteDialog"
              width="500"
            >
              <v-card>
                <v-card-title
                  class="headline primary white--text"
                  primary-title
                >
                  Confirm Delete
                </v-card-title>

                <v-card-text>
                  Are you sure you want to delete this event? Clicking "Confirm" will permanently delete this event.
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    :loading="deletingEvent"
                    color="error"
                    flat
                    @click="deleteEvent"
                  >
                    Confirm
                  </v-btn>
                  <v-btn
                    color="primary"
                    flat
                    @click="confirmDeleteDialog = false"
                  >
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </template>

        <!-- Adding Event Status Card -->
        <v-dialog
        v-model="eventErroDialog"
        width="500"
        persistent
        >
        <AddingEventsStatusCard :closeDialog="closeDialog" />
        </v-dialog>
    </v-card>
</template>

<script>
import moment from "moment";
import AddingEventsStatusCard from "./AddingEventsStatusCard.vue";
export default {
  name: "EditEventForm",
  props: ["npoID", "eventID"],
  components: {
    AddingEventsStatusCard
  },
  mounted() {
    this.$store.dispatch("getEvent", Number(this.eventID));
    this.$store.dispatch("getAllTags");
    this.$store.dispatch("getOneNPO", Number(this.loggedInNPOID));
  },
  data() {
    return {
      valid: false,
      NPOID: this.npoID,
      eventErroDialog: false,
      confirmDeleteDialog: false,
      nameRules: [
        v => !!v || "Event Name is required",
        v => (v && v.length <= 25) || "Name must be less than 25 characters"
      ],
      volNumRules: [
        v => !!v || "Number of Volunteers Required",
        v => v > 0 || "Must be at least one (1) volunteer"
      ],
      descriptionRules: [
        v => !!v || "Event Description is required",
        v =>
          (v && v.length <= 1000) ||
          "Description must be less than 1000 characters"
      ],
      addressRules: [
        v => !!v || "Event Address is required",
        v => v.split(",").length - 1 === 3 || "Please use a valid address"
      ],
      tagsRules: [
        v => !!v || "Event Tags are required",
        v => (v && v.length <= 5) || "Please enter no more than 5 tags."
      ],
      search: null,
      startTimeModal: false,
      endTimeModal: false,
      startTimeRules: [v => !!v || "Start Date is required"],
      endTimeRules: [
        v => !!v || "End Date is required",
        v => {
          let endTimeStamp = moment(
            `${this.endDate} ${this.EndTime}:00`
          ).valueOf();
          let startTimeStamp = moment(
            `${this.startDate} ${this.StartTime}:00`
          ).valueOf();
          return (
            endTimeStamp >= startTimeStamp ||
            "Event End Time must be after start time"
          );
        }
      ],
      arrayEvents: null,
      startDateModal: false,
      endDateModal: false,
      startDateRules: [v => !!v || "Start Date is required"],
      endDateRules: [
        v => {
          let endTimeStamp = moment(`${this.endDate}`).valueOf();
          let startTimeStamp = moment(`${this.startDate}`).valueOf();
          return (
            endTimeStamp >= startTimeStamp ||
            "Event End Date cannot be before Event Start Date"
          );
        }
      ]
    };
  },
  methods: {
    deleteEvent() {
      this.confirmDeleteDialog = false;
      this.$store.dispatch("deleteEvent", Number(this.event.ID));
    },
    handleStartTimeChange(val, tags) {
      let eventStart = new Date(`${this.startDate} ${val}:00`).getTime();
      let eventEnd = new Date(`${this.endDate} ${this.EndTime}:00`).getTime();
      let updatedEvent = {
        ID: this.event.ID,
        NPOID: this.loggedInNPOID,
        Name: this.Name,
        StartTime: eventStart,
        EndTime: eventEnd,
        Tags: tags.map(tag => {
          return {
            TagName: tag
          };
        }),
        Description: this.Description,
        Location: this.Address,
        NumOfVolunteers: Number(this.NumOfVolunteers)
      };
      this.$store.commit("updateEventToUpdate", updatedEvent);
      this.$refs.startTimeDialog.save(val);
    },
    handleEndTimeChange(val, tags) {
      let eventStart = new Date(
        `${this.startDate} ${this.StartTime}:00`
      ).getTime();
      let eventEnd = new Date(`${this.endDate} ${val}:00`).getTime();
      let updatedEvent = {
        ID: this.event.ID,
        NPOID: this.loggedInNPOID,
        Name: this.Name,
        StartTime: eventStart,
        EndTime: eventEnd,
        Tags: tags.map(tag => {
          return {
            TagName: tag
          };
        }),
        Description: this.Description,
        Location: this.Address,
        NumOfVolunteers: Number(this.NumOfVolunteers)
      };

      this.$store.commit("updateEventToUpdate", updatedEvent);
      this.$refs.endTimeDialog.save(val);
    },
    handleStartDateChange(val, tags) {
      let eventStart = new Date(`${val} ${this.StartTime}:00`).getTime();
      let eventEnd = new Date(`${this.endDate} ${this.EndTime}:00`).getTime();
      let updatedEvent = {
        ID: this.event.ID,
        NPOID: this.loggedInNPOID,
        Name: this.Name,
        StartTime: eventStart,
        EndTime: eventEnd,
        Tags: tags.map(tag => {
          return {
            TagName: tag
          };
        }),
        Description: this.Description,
        Location: this.Address,
        NumOfVolunteers: Number(this.NumOfVolunteers)
      };

      this.$store.commit("updateEventToUpdate", updatedEvent);
      this.$refs.dialogStart.save(val);
    },
    handleEndDateChange(val, tags) {
      let eventStart = new Date(
        `${this.startDate} ${this.StartTime}:00`
      ).getTime();
      let eventEnd = new Date(`${val} ${this.EndTime}:00`).getTime();
      let updatedEvent = {
        ID: this.event.ID,
        NPOID: this.loggedInNPOID,
        Name: this.Name,
        StartTime: eventStart,
        EndTime: eventEnd,
        Tags: tags.map(tag => {
          return {
            TagName: tag
          };
        }),
        Description: this.Description,
        Location: this.Address,
        NumOfVolunteers: Number(this.NumOfVolunteers)
      };

      this.$store.commit("updateEventToUpdate", updatedEvent);
      this.$refs.dialogEnd.save(val);
    },
    goToEvent() {
      this.$store.dispatch("resetAddEventSuccess");
      this.$router.push(`/event/${this.event.ID}`);
    },
    getAddressData: function(addressData, placeResultData, id) {
      if (placeResultData.formatted_address) {
        this.Address = placeResultData.formatted_address;
      }
    },
    updateEvent() {
      this.$refs.updateEventForm.validate();
      if (this.$refs.updateEventForm.validate()) {
        let eventStart = new Date(
          `${this.startDate} ${this.StartTime}:00`
        ).getTime();
        let eventEnd = new Date(`${this.endDate} ${this.EndTime}:00`).getTime();
        let newTags = this.Tags.map(tag => tag);
        let updatedEvent = {
          ID: this.event.ID,
          NPOID: this.loggedInNPOID,
          Name: this.Name,
          StartTime: eventStart,
          EndTime: eventEnd,
          Tags: newTags,
          Description: this.Description,
          Location: this.Address,
          NumOfVolunteers: Number(this.NumOfVolunteers)
        };
        this.$store.dispatch("updateEvent", {
          updatedEvent,
          router: this.$router
        });
        // .then(() => {
        //   if (this.addEventError) this.eventErroDialog = true;
        // });
      }
    },
    saveStartDate(date) {
      this.startDate - date;
      this.startDateModal = false;
    },
    closeDialog() {
      this.eventErroDialog = false;
    }
  },
  computed: {
    deletingEvent() {
      return this.$store.state.deletingEvent;
    },
    deleteEventError() {
      return this.$store.state.deleteEventError;
    },
    deleteEventSuccess() {
      return this.$store.state.deleteEventSuccess;
    },
    event() {
      return this.$store.state.event;
    },
    eventToUpdate() {
      return this.$store.state.eventToUpdate;
    },
    Name: {
      get() {
        return this.event.Name;
      },
      set(val) {
        let eventStart = new Date(
          `${this.startDate} ${this.StartTime}:00`
        ).getTime();
        let eventEnd = new Date(`${this.endDate} ${this.EndTime}:00`).getTime();
        let updatedEvent = {
          ID: this.event.ID,
          NPOID: this.loggedInNPOID,
          Name: val,
          StartTime: eventStart,
          EndTime: eventEnd,
          Tags: this.Tags,
          Description: this.Description,
          Location: this.Address,
          NumOfVolunteers: Number(this.NumOfVolunteers)
        };
        this.$store.commit("updateEventToUpdate", updatedEvent);
      }
    },
    Description: {
      get() {
        return this.event.Description;
      },
      set(val) {
        let eventStart = new Date(
          `${this.startDate} ${this.StartTime}:00`
        ).getTime();
        let eventEnd = new Date(`${this.endDate} ${this.EndTime}:00`).getTime();
        let updatedEvent = {
          ID: this.event.ID,
          NPOID: this.loggedInNPOID,
          Name: this.Name,
          StartTime: eventStart,
          EndTime: eventEnd,
          Tags: this.Tags,
          Description: val,
          Location: this.Address,
          NumOfVolunteers: Number(this.NumOfVolunteers)
        };
        this.$store.commit("updateEventToUpdate", updatedEvent);
      }
    },
    NumOfVolunteers: {
      get() {
        return this.event.NumOfVolunteers;
      },
      set(val) {
        let eventStart = new Date(
          `${this.startDate} ${this.StartTime}:00`
        ).getTime();
        let eventEnd = new Date(`${this.endDate} ${this.EndTime}:00`).getTime();
        let updatedEvent = {
          ID: this.event.ID,
          NPOID: this.loggedInNPOID,
          Name: this.Name,
          StartTime: eventStart,
          EndTime: eventEnd,
          Tags: this.Tags,
          Description: this.Description,
          Location: this.Address,
          NumOfVolunteers: Number(val)
        };
        this.$store.commit("updateEventToUpdate", updatedEvent);
      }
    },
    Address: {
      get() {
        return this.event.Location;
      },
      set(val) {
        this.$store.state.eventToUpdate.Location = val;
      }
    },
    Tags: {
      get() {
        return this.event.Tags.map(tag => tag.TagName);
      },
      set(val) {
        let updatedTags = val.map(tag => {
          return {
            TagName: tag
          };
        });
        let eventStart = new Date(
          `${this.startDate} ${this.StartTime}:00`
        ).getTime();
        let eventEnd = new Date(`${this.endDate} ${this.EndTime}:00`).getTime();
        let updatedEvent = {
          ID: this.event.ID,
          NPOID: this.loggedInNPOID,
          Name: this.Name,
          StartTime: eventStart,
          EndTime: eventEnd,
          Tags: updatedTags,
          Description: this.Description,
          Location: this.Address,
          NumOfVolunteers: Number(this.NumOfVolunteers)
        };
        this.$store.commit("updateEventToUpdate", updatedEvent);
      }
    },
    StartTime: {
      get() {
        return moment(this.event.StartTime).format("HH:mm");
      },
      set(val) {
        this.handleStartTimeChange(val, this.Tags);
      }
    },
    EndTime: {
      get() {
        return moment(this.event.EndTime).format("HH:mm");
      },
      set(val) {
        this.handleEndTimeChange(val, this.Tags);
      }
    },
    startDate: {
      get() {
        return moment(this.event.StartTime).format("YYYY-MM-DD");
      },
      set(val) {
        this.handleStartDateChange(val, this.Tags);
      }
    },
    endDate: {
      get() {
        return moment(this.event.EndTime).format("YYYY-MM-DD");
      },
      set(val) {
        this.handleEndDateChange(val, this.Tags);
      }
    },
    fetchingEvent() {
      return this.$store.state.fetchingEvent;
    },
    fetchEventError() {
      return this.$store.state.fetchEventError;
    },
    fetchEventSuccess() {
      return this.$store.state.fetchEventSuccess;
    },
    npoLoggedIn() {
      return this.$store.state.loggedInUserRole === "NPO";
    },
    loggedInNPOID() {
      if (this.npoLoggedIn) {
        return this.$store.state.loggedInUserID;
      }
    },
    tagsNames() {
      return this.$store.getters.tagNames;
    },
    fetchingTags() {
      return this.$store.state.fetchingTags;
    },
    fetchTagsError() {
      return this.$store.state.fetchTagsError;
    },
    fetchTagsSuccess() {
      return this.$store.state.fetchTagsSuccess;
    },
    npo() {
      return this.$store.state.npo;
    },
    fetchingOneNPO() {
      return this.$store.state.fetchingOneNPO;
    },
    fetchOneNPOError() {
      return this.$store.state.fetchOneNPOError;
    },
    fetchOneNPOSuccess() {
      return this.$store.state.fetchOneNPOSuccess;
    },
    stringOfNpoEvents() {
      return this.$store.getters.stringOfNpoEvents;
    },
    minEndTime() {
      if (this.startDate === this.endDate) {
        return this.StartTime;
      } else {
        return "00:00";
      }
    },
    updatingEvent() {
      return this.$store.state.updatingEvent;
    },
    updateEventError: {
      get() {
        return this.$store.state.updateEventError;
      },
      set() {
        this.$store.commit("resetUpdateEventError");
      }
    },
    updateEventSuccess: {
      get() {
        return this.$store.state.updateEventSuccess;
      },
      set() {
        this.$store.commit("resetUpdateEventSuccess");
      }
    }
  }
};
</script>