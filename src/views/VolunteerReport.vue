<template>
  <v-container>
    <v-layout>
      <v-flex>
        <h1>Volunteer Hour Report</h1>
        <VolReportReqToolbar />
        <VolReportTabs v-if="fetchVolReportSuccess" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from "moment";
import VolReportTabs from "@/components/VolReportTabs.vue";
import VolReportReqToolbar from "@/components/VolReportReqToolbar.vue";

export default {
  name: "VolunteerReport",
  props: ["volID"],
  components: {
    VolReportTabs,
    VolReportReqToolbar
  },
  created() {
    this.fetchReport();
  },
  watch: {
    $route: "fetchReport"
  },
  computed: {
    volunteerID() {
      return this.$ls.get("id");
    },
    reportStartDate() {
      return this.$store.state.reportStartDate;
    },
    reportEndDate() {
      return this.$store.state.reportEndDate;
    },
    fetchingVolReport() {
      return this.$store.state.fetchingVolReport;
    },
    fetchVolReportSuccess() {
      return this.$store.state.fetchVolReportSuccess;
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