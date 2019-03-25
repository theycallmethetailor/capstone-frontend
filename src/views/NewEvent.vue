<template>
    <v-container>
        <v-layout>
            <v-flex>
                <NewEventForm :npoID="Number(npoID)" />
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
  }
};
</script>