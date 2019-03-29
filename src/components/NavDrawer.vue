<template>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      floating
    >
      <v-list class="pa-1">
        <v-list-tile @click="toggleDrawer">
          <v-list-tile-content>
            <v-list-tile-title>Menu</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click="route(item)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavDrawer",
  data() {
    return {
      items: [
        { title: "Home", icon: "dashboard", path: "/" },
        { title: "About", icon: "question_answer", path: "/about" },
        { title: "Login", icon: "question_answer", path: "/login" }
      ]
    };
  },
  computed: {
    drawer: {
      // getter
      get: function() {
        return this.$store.state.drawer;
      },
      // setter
      set: function() {
        return false;
      }
    }
  },
  methods: {
    route(item) {
      this.$router.push(`${item.path}`);
    },
    toggleDrawer() {
      this.$store.dispatch("toggleDrawer");
    }
  }
};
</script>