<template>
  <v-parallax
    xs12
    dark
    src="/assets/care-caregiver-deal-45842.jpg"
  >
    <v-layout
      align-center
      column
      justify-center
    >
      <h1 class="display-4 mb-3 transparnetBackground">Volunteer Connect</h1>
      <h4 class="subheading transparnetBackground" >Together, we can make a difference.</h4>
    </v-layout>
  </v-parallax>
</template>

<script>
export default {
  name: "Parallax"
};
</script>

<style lang="css" >
.transparnetBackground {
  background-color: rgba(128, 203, 196, 0.5);
}
</style>
