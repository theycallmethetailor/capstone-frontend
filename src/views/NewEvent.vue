<template>
    <v-container>
        <v-layout>
            <v-flex>
                <NewEventForm :npoID="numberNPOID" />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import NewEventForm from "../components/NewEventForm.vue";
export default {
  name: "NewEvent",
  props: ["npoID"],
  components: {
    NewEventForm
  },
  computed: {
    numberNPOID() {
      return Number(this.$store.state.loggedInUserID);
    }
  }
};
</script>