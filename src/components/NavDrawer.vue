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
        >
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>
              <router-link to="'/'" >
                Home
              </router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
        @click="route('/login')"
        >
          <v-list-tile-action>
            <v-icon>question_answer</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>
              <router-link to="/login" >
                Sign In/Up
              </router-link>
            </v-list-tile-title>
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
        { title: "Login", icon: "question_answer", path: "/login" },
        { title: "My Calendar", icon: "event", path: this.calendarPath }
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
        this.$store.state.drawer = !this.$store.state.drawer;
      }
    },
    userLoggedIn: {
      get() {
        return !!this.$store.state.loggedInUserID;
      },
      set() {
        let necObj = {
          router: this.$router,
          ls: this.$ls
        };
        this.$store.commit("logout", necObj);
      }
    },
    volunteerLoggedIn() {
      return (
        this.userLoggedIn && this.$store.state.loggedInUserRole === "Volunteer"
      );
    },
    volunteerID() {
      return Number(this.$ls.get("id"));
    },
    calendarPath() {
      if (this.userLoggedIn && this.$ls.get("user_type") === "Volunteer") {
        return `/volunteer/calendar/${this.$ls.get("id")}`;
      } else if (this.userLoggedIn && this.$ls.get("user_type") === "NPO") {
        return `/calendar/npo/${this.$ls.get("id")}`;
      }
    }
  },
  methods: {
    route(path) {
      console.log(path);
      this.$router.push(path);
    },
    toggleDrawer() {
      this.$store.dispatch("toggleDrawer");
    }
  }
};
</script>