<template>
  <v-container>
    <v-layout>
      <v-flex>
        <h1>Volunteer Hour Report</h1>
        <VolReportTabs />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from "moment";
import VolReportTabs from "@/components/VolReportTabs.vue";
export default {
  name: "VolunteerReport",
  props: ["volID"],
  components: {
    VolReportTabs
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
    volReport() {
      return this.$store.state.volReport;
    },
    HoursByNPO() {
      return this.$store.state.HoursByNPO;
    },
    HoursByEvent() {
      return this.$store.state.HoursByEvent;
    },
    HoursByTag() {
      return this.$store.state.HoursByTag;
    }
  },
  methods: {
    fetchReport() {
      const reportRequestBody = {
        UserType: "Volunteer",
        VolunteerID: Number(this.$ls.get("id")),
        StartDate: moment()
          .subtract(4, "month")
          .valueOf(),
        EndDate: moment()
          .add(4, "month")
          .valueOf()
      };
      this.$store.dispatch("getVolunteerReport", reportRequestBody);
    }
  }
};
</script>