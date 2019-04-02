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
            <v-layout justify-space-around wrap>
              <v-flex xs10 sm10 md12 lg5 xl5>
               <HoursByNPOChart />
              </v-flex>
              <v-flex xs10 sm10 md12 lg5 xl5>
              <HoursByNPOPieChart/>

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
            <v-layout justify-space-around wrap>
              <v-flex xs10 sm10 md12 lg5 xl5>
               <HoursByEventChart />
              </v-flex>

              <v-flex xs10 sm10 md12 lg5 xl5>
                <HoursByEventPieChart />
              </v-flex>
            </v-layout>
          </v-container>  
              <HoursByEventTable />
          </v-card>
      </v-tab-item>

      <v-tab-item>
          <v-card flat>

          <v-container>
            <v-layout justify-space-around wrap>
              <v-flex xs10 sm10 md12 lg5 xl5>
               <HoursByTagChart />
              </v-flex>

              <v-flex xs10 sm10 md12 lg5 xl5>
                <HoursByTagPieChart />
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
import HoursByNPOPieChart from "./HoursByNPOPieChart";
import HoursByEventTable from "./HoursByEventTable.vue";
import HoursByEventChart from "./HoursByEventChart";
import HoursByEventPieChart from "./HoursByEventPieChart";
import HoursByTagTable from "./HoursByTagTable.vue";
import HoursByTagChart from "./HoursByTagChart";
import HoursByTagPieChart from "./HoursByTagPieChart";

export default {
  name: "VolReportTabs",
  components: {
    HoursByNPOTable,
    HoursByNPOChart,
    HoursByNPOPieChart,
    HoursByEventTable,
    HoursByEventChart,
    HoursByEventPieChart,
    HoursByTagTable,
    HoursByTagChart,
    HoursByTagPieChart
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