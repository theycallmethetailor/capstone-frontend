<template>
    <div>
        This is the npo card!
    </div>
</template>

<script>
export default {
  name: "NPOCard",
  props: ["id"],
  data() {
      return {
          now: new Date().getMilliseconds()
      }
  }.
  created() {
    this.$store.dispatch("getOneNPO", this.id);
  },
  computed: {
    npo() {
      return this.$store.state.npo;
    },
    pastEvents() {


    },
    upcomingEvents() {
        
    }
  }
};
</script>