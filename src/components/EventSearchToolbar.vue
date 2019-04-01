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
                    <v-flex xs12 sm12 md12 lg3 xl3>
                        <v-text-field
                            v-model="searchString"
                            flat
                            label="Search Events"
                            prepend-icon="search"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12 lg3 xl3>
                        <v-select
                        prepend-icon="filter_list"
                        v-model="searchOption"
                        :items="searchOptions"
                        label="Search Events By"
                        ></v-select>
                    </v-flex>
                    <!-- Start Date Constraint -->
                        <v-flex
                        xs12
                        sm12
                        md12
                        lg3
                        xl3
                        > 
                            <v-dialog
                            ref="dialogSearchStart"
                            v-model="searchStartDateModal"
                            :return-value.sync="searchStartDate"
                            persistent
                            lazy
                            full-width
                            width="290px"
                            >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                v-model="searchStartDate"
                                label="Events Starting On/After"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                            :min="today"
                            v-model="searchStartDate" 
                            scrollable
                            event-color="primary"
                            >
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="searchStartDateModal = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.dialogSearchStart.save(searchStartDate)">OK</v-btn>
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
                            ref="dialogSearchEnd"
                            v-model="searchEndDateModal"
                            :return-value.sync="searchEndDate"
                            persistent
                            lazy
                            full-width
                            width="290px"
                            >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                v-model="searchEndDate"
                                label="Events Starting On/Before"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                            :min="searchStartDate"
                            v-model="searchEndDate" 
                            scrollable
                            event-color="primary"
                            >
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="searchEndDateModal = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.dialogSearchEnd.save(searchEndDate)">OK</v-btn>
                            </v-date-picker>
                            </v-dialog>
                        </v-flex>
                </v-layout>

            </template>
        </v-container>

    </v-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "EventSearchToolbar",
  data() {
    return {
      searchStartDateModal: false,
      searchEndDateModal: false,
      today: new Date().toISOString().substr(0, 10)
    };
  },
  computed: {
    searchString: {
      get() {
        return this.$store.state.searchString;
      },
      set(value) {
        this.$store.commit("updateSearchString", value);
      }
    },
    searchOption: {
      get() {
        return this.$store.state.searchOption;
      },
      set(value) {
        console.log(value);
        this.$store.commit("updatesearchOption", value);
      }
    },
    searchStartDate: {
      get() {
        return this.$store.state.searchStartDate;
      },
      set(value) {
        // // let unixStartDate = new Date(`${value} 00:00:00`).getTime();
        // value.slice();
        this.$store.commit("updateSearchStartDate", value);
      }
    },
    searchEndDate: {
      get() {
        return this.$store.state.searchEndDate;
      },
      set(value) {
        this.$store.commit("updateSearchEndDate", value);
      }
    },
    searchOptions() {
      return this.$store.state.searchOptions;
    }
    // startPickerDate() {
    //   let startDate = moment(this.searchStartDate).format("YYYY-MM-DD");

    //   return startDate;
    // }
  }
};
</script>