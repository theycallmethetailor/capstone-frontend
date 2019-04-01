<template>
  <div>
    <v-tabs
      v-model="active"
      color="primary"
      dark
      slider-color="accent"
    >
      <v-tab
        v-for="(option, n) in reportOptions"
        :key="n"
        ripple
      >
        {{ option }}

      </v-tab>

      <!-- Hours By Non Profit Table -->
      <v-tab-item
      >
        <v-card flat>
          <v-container>
            <v-layout justify-center>
              <v-flex xs10 sm10 md6 lg6 xl6>
               <HoursByNPOChart />

              </v-flex>
            </v-layout>
          </v-container>

        <HoursByNPOTable />
        </v-card>
      </v-tab-item>

      <!-- Hours By Event Table -->
      <v-tab-item>
          <v-card flat>
          <v-container>
            <v-layout justify-center>
              <v-flex xs10 sm10 md6 lg6 xl6>
               <HoursByEventChart />

              </v-flex>
            </v-layout>
          </v-container> 
              <HoursByEventTable />
          </v-card>
      </v-tab-item>

      <v-tab-item>
          <v-card flat>

          <v-container>
            <v-layout justify-center>
              <v-flex xs10 sm10 md6 lg6 xl6>
               <HoursByTagChart />

              </v-flex>
            </v-layout>
          </v-container> 
              <HoursByTagTable />
          </v-card>
      </v-tab-item>
      
    </v-tabs>
  </div>
</template>

<script>
import HoursByNPOTable from "./HoursByNPOTable.vue";
import HoursByNPOChart from "./HoursByNPOChart";
import HoursByEventTable from "./HoursByEventTable.vue";
import HoursByEventChart from "./HoursByEventChart";
import HoursByTagTable from "./HoursByTagTable.vue";
import HoursByTagChart from "./HoursByTagChart";

export default {
  name: "VolReportTabs",
  components: {
    HoursByNPOTable,
    HoursByNPOChart,
    HoursByEventTable,
    HoursByEventChart,
    HoursByTagTable,
    HoursByTagChart
  },
  data() {
    return {
      active: null,
      reportOptions: ["Hours By Non-Profit", "Hours By Event", "Hours By tag"]
    };
  },
  methods: {
    next() {
      const active = parseInt(this.active);
      this.active = active < 2 ? active + 1 : 0;
    }
  }
};
</script>