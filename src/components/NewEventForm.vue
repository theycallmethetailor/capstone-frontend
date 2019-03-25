<template>
    <v-card>
        <v-card-title
        class="primary white--text"
        primary-title
        >  
        New Event
        </v-card-title>
        <v-card-text>
            <v-form>
              <!-- CompBox for Tags -->
              <template>
                <v-combobox
                  v-model="tags"
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
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
  name: "NewEventForm",
  props: ["npoID"],
  created() {
    this.$store.dispatch("getAllTags");
  },
  data() {
    return {
      NPOID: this.npoID,
      Name: "",
      tags: [],
      search: null,
      StartTime: null,
      EndTime: null
    };
  },
  computed: {
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
    }
  }
};
</script>