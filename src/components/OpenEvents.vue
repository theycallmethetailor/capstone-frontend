<template>
    <h1>
        Events
    </h1>
</template>

<script>
export default {
  name: "OpenEvents",
  created() {
    this.$store.dispatch("getOpenEvents");
  },
  methods: {},
  computed: {
    openEvents() {
      return this.$store.state.openEvents;
    },
    fetchingEvents() {
      return this.$store.state.fetchingEvents;
    },
    fetchEventsError() {
      return this.$store.state.fetchEventsError;
    },
    fetchEventsSuccess() {
      return this.$store.state.fetchEventsSuccess;
    }
  }
};
</script>
