<template>
            <v-card>
                <v-card-title
                class="primary white--text" 
                primary-title
                >
                Adding Event
                </v-card-title>
                <v-card-text>
                    <v-alert
                    v-if="addEventError"
                    :value="true"
                    color="error"
                    icon="warning"
                    outline
                    >
                    There was an error adding your event. Please make sure all fields have been filled out accurately.
                    </v-alert>
                </v-card-text>
                <v-card-actions>
                    <v-btn 
                    v-if="addEventError" 
                    @click="closeDialog"  >
                        Cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
</template>

<script>
export default {
  name: "AddingEventsStatusCard",
  props: ["closeDialog"],
  computed: {
    addingEvent() {
      return this.$store.state.addingEvent;
    },
    addEventError() {
      return this.$store.state.addEventError;
    },
    addEventSuccess() {
      return this.$store.state.addEventSuccess;
    }
  }
};
</script>
