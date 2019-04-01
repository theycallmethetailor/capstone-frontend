<template>
  <div>
    <v-card class="white--text">
        <v-container
        color="primary"
        dark
        tabs
        >  
            <template >
                <v-layout justify-space-around wrap>
                    <!-- Start Date Constraint -->
                        <v-flex
                        xs12
                        sm12
                        md12
                        lg3
                        xl3
                        > 
                            <v-dialog
                            ref="dialogReportStart"
                            v-model="reportStartDateModal"
                            :return-value.sync="reportStartDate"
                            persistent
                            lazy
                            full-width
                            width="290px"
                            >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                v-model="reportStartDate"
                                label="Report Starting On"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="reportStartDate" 
                            scrollable
                            event-color="primary"
                            >
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="reportStartDateModal = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.dialogReportStart.save(reportStartDate)">OK</v-btn>
                            </v-date-picker>
                            </v-dialog>
                        </v-flex>
                        <!-- End Date Constraint -->
                        <v-flex
                        xs12
                        sm12
                        md12
                        lg3
                        xl3
                        > 
                            <v-dialog
                            ref="dialogReportEnd"
                            v-model="reportEndDateModal"
                            :return-value.sync="reportEndDate"
                            persistent
                            lazy
                            full-width
                            width="290px"
                            >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                v-model="reportEndDate"
                                label="Report Ending"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                            :min="reportStartDate"
                            v-model="reportEndDate" 
                            scrollable
                            event-color="primary"
                            >
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="reportEndDateModal = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.dialogReportEnd.save(reportEndDate)">OK</v-btn>
                            </v-date-picker>
                            </v-dialog>
                        </v-flex>
                </v-layout>
                <v-btn color="primary" :loading="fetchingVolReport" @click="fetchReport">
                    Request Report
                </v-btn>
            </template>
        </v-container>

    </v-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "VolReportReqToolbar",
  data() {
    return {
      reportStartDateModal: false,
      reportEndDateModal: false,
      today: new Date().toISOString().substr(0, 10)
    };
  },
  computed: {
    reportStartDate: {
      get() {
        return this.$store.state.reportStartDate;
      },
      set(value) {
        this.$store.commit("updateReportStartDate", value);
      }
    },
    reportEndDate: {
      get() {
        return this.$store.state.reportEndDate;
      },
      set(value) {
        this.$store.commit("updateReportEndDate", value);
      }
    },
    fetchingVolReport() {
      return this.$store.state.fetchingVolReport;
    }
  },
  methods: {
    fetchReport() {
      let reportRequestBody = {
        UserType: "Volunteer",
        VolunteerID: Number(this.$ls.get("id")),
        StartDate: moment(this.reportStartDate).valueOf(),
        EndDate: moment(this.reportEndDate)
          .endOf("day")
          .valueOf()
      };
      this.$store.dispatch("getVolunteerReport", reportRequestBody);
    }
  }
};
</script>