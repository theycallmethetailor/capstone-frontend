<template>
    <v-card>
        <v-card-title
        class="primary white--text"
        primary-title
        >  
        New Event
        </v-card-title>
        <v-card-text>
            <v-form
            ref="newEventForm"
            v-model="valid"
            lazy-validation
            >
              <!-- Event Name input -->
              <v-layout justify-space-around>
                <v-flex xs12 sm11 md11 xl11>
                  <v-text-field
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
                    hint="Please type in and select the correct address from the dropdown."
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
                        <v-btn flat color="primary" @click="$refs.dialogStart.save(startDate)">OK</v-btn>
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
                        <v-btn flat color="primary" @click="$refs.startTimeDialog.save(StartTime)">OK</v-btn>
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
                        <v-btn flat color="primary" @click="$refs.dialogEnd.save(endDate)">OK</v-btn>
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
                        <v-btn flat color="primary" @click="$refs.endTimeDialog.save(EndTime)">OK</v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-flex>
                </v-layout>
              </template>
              <!-- Submit Button -->
              <v-btn
              :disabled="!valid" 
              color="primary"
              @click="addEvent"
              >
                Submit
              </v-btn>
            </v-form>
        </v-card-text>

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
  name: "NewEventForm",
  props: ["npoID"],
  components: {
    AddingEventsStatusCard
  },
  created() {
    this.$store.dispatch("getAllTags");
    this.$store.dispatch("getOneNPO", Number(this.loggedInNPOID));
  },
  data() {
    return {
      valid: false,
      NPOID: this.loggedInNPOID,
      eventErroDialog: false,
      Name: "",
      nameRules: [
        v => !!v || "Event Name is required",
        v => (v && v.length <= 25) || "Name must be less than 25 characters"
      ],
      NumOfVolunteers: 1,
      volNumRules: [
        v => !!v || "Number of Volunteers Required",
        v => v > 0 || "Must be at least one (1) volunteer"
      ],
      Description: "",
      descriptionRules: [
        v => !!v || "Event Description is required",
        v =>
          (v && v.length <= 1000) ||
          "Description must be less than 1000 characters"
      ],
      Address: "",
      addressRules: [
        v => !!v || "Event Address is required",
        v => v.split(",").length - 1 === 3 || "Please use a valid address"
      ],
      Tags: [],
      tagsRules: [
        v => !!v || "Event Tags are required",
        v => (v && v.length <= 5) || "Please enter no more than 5 tags."
      ],
      search: null,
      startTimeModal: false,
      endTimeModal: false,
      StartTime: "07:00",
      startTimeRules: [v => !!v || "Start Date is required"],
      EndTime: "07:00",
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
      startDate: new Date().toISOString().substr(0, 10),
      startDateRules: [v => !!v || "Start Date is required"],
      endDate: new Date().toISOString().substr(0, 10),
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
    getAddressData: function(addressData, placeResultData, id) {
      if (placeResultData && placeResultData.formatted_address) {
        this.Address = placeResultData.formatted_address;
      }
    },
    addEvent() {
      this.$refs.newEventForm.validate();
      if (this.$refs.newEventForm.validate()) {
        let eventStart = new Date(
          `${this.startDate} ${this.StartTime}:00`
        ).getTime();
        let eventEnd = new Date(`${this.endDate} ${this.EndTime}:00`).getTime();
        let newEvent = {
          NPOID: Number(this.loggedInNPOID),
          Name: this.Name,
          StartTime: eventStart,
          EndTime: eventEnd,
          Tags: this.Tags,
          Description: this.Description,
          Location: this.Address,
          NumOfVolunteers: Number(this.NumOfVolunteers)
        };
        this.$store.dispatch("addEvent", { newEvent, router: this.$router });
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
    npoLoggedIn() {
      return this.$store.state.loggedInUserRole === "NPO";
    },
    loggedInNPOID() {
      return this.$ls.get("id");
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
    addEventError() {
      return this.$store.state.addEventError;
    }
  }
};
</script>