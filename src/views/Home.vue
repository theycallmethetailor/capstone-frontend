<template>
<div>
  <Parallax />
  <OpenEvents />
</div>
</template>

<script>
import Parallax from "@/components/Parallax.vue";
import OpenEvents from "@/components/OpenEvents.vue";

export default {
  name: "home",
  components: {
    Parallax,
    OpenEvents
  }
};
</script>
