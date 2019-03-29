<template>
<div>
  <Parallax />
  <EventSearchToolbar />
  <OpenEvents />
</div>
</template>

<script>
import Parallax from "@/components/Parallax.vue";
import OpenEvents from "@/components/OpenEvents.vue";
import EventSearchToolbar from "@/components/EventSearchToolbar.vue";

export default {
  name: "home",
  components: {
    Parallax,
    OpenEvents,
    EventSearchToolbar
  }
};
</script>
