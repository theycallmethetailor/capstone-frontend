<template>
  <v-app>
    <NavDrawer />
    <NavigationComp />
    <v-content>
      <v-container fluid>
        <transition name="slide">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import NavigationComp from "@/components/NavigationComp.vue";
import NavDrawer from "@/components/NavDrawer.vue";

export default {
  components: {
    NavigationComp,
    NavDrawer
  }
};
</script>
