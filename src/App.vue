<template>
  <v-app>
    <NavigationComp />
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import NavigationComp from "@/components/NavigationComp.vue";

export default {
  components: {
    NavigationComp
  }
};
</script>
