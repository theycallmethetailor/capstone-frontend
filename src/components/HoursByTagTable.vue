<template>
    <div>
        <h1>Hours By Event</h1>
        <template>
          <v-card>
              <v-layout >
                <v-flex offset-xs7 offset-sm7 xs12 sm12 md4 lg4 xl4 >
                <v-text-field
                  v-model="searchString"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>

                </v-flex>
              </v-layout>
            <v-data-table
                :search="searchString"
                :headers="headers"
                :items="HoursByTagArray"
                :loading="fetchingVolReport"
                class="elevation-1"
            >   
              <!-- Loading bar -->
              <v-progress-linear v-slot:progress color="magenta" indeterminate></v-progress-linear>
                <!-- Rows (props) Slot -->
                <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.TagName }}</td>
                <td class="text-xs-left">{{ props.item.HoursWorked }}</td>
                </template>

                <!-- No Data Slot -->
              <template v-slot:no-data>
                <v-alert outline :value="true" color="error" icon="warning">
                  Sorry, nothing to display here :(
                </v-alert>
              </template>

              <!-- Footer Slot -->
              <template v-slot:footer>
                <td>
                  <strong>Total</strong>
                </td>
                <td>
                  <strong> {{ HoursWorkedTotal  }} </strong>
                </td>
              </template>

            </v-data-table>
          </v-card>
        </template>
    </div>
</template>

<script>
import moment from "moment";
export default {
  name: "HoursByTagTable",
  data() {
    return {
      moment: moment,
      searchString: "",
      headers: [
        {
          text: "Tag Name",
          align: "left",
          sortable: false,
          value: "TagName"
        },
        {
          text: "Hours Worked",
          align: "left",
          sortable: false,
          value: "HoursWorked"
        }
      ]
    };
  },
  computed: {
    HoursByTag() {
      return this.$store.state.HoursByTag;
    },
    fetchingVolReport() {
      return this.$store.state.fetchingVolReport;
    },
    HoursByTagArray() {
      let arrayOfData = Object.keys(this.HoursByTag).map(tagID => {
        return this.HoursByTag[tagID];
      });
      return arrayOfData;
    },
    HoursWorkedTotal() {
      const total = this.HoursByTagArray.reduce((acc, data) => {
        return acc + data.HoursWorked;
      }, 0);
      return total;
    }
  }
};
</script>