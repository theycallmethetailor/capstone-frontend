<template>
  <v-toolbar color="primary" class="white--text">
    <v-toolbar-side-icon @click="toggleDrawer" class="white--text"></v-toolbar-side-icon>
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn class="white--text" to="/" flat>Home</v-btn>
      <v-btn class="white--text" to="/about" flat>About</v-btn>
      <v-btn v-if="userLoggedIn" class="white--text" :to="calendarPath" flat>My calendar</v-btn>      
      <v-btn v-if="!userLoggedIn" class="white--text" to='/login' flat>Sign In/Sign Up </v-btn>
      <v-btn v-if="userLoggedIn" class="white--text" @click="logout" flat>Logout</v-btn>

    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: "NavigationComp",
  methods: {
    toggleDrawer() {
      this.$store.dispatch("toggleDrawer");
    },
    logout() {
      console.log("logout method fired");
      this.$store.commit("logout", this.$router);
    }
  },
  computed: {
    userLoggedIn() {
      return localStorage.id ? true : false;
    },
    calendarPath() {
      if (this.userLoggedIn && localStorage.user_type === "Volunteer") {
        return `/volunteer/calendar/${localStorage.id}`;
      } else if (this.userLoggedIn && localStorage.user_type === "NPO") {
        return `/calendar/npo/${localStorage.id}`;
      }
    }
  }
};
</script>