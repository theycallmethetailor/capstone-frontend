<template>
  <v-toolbar color="primary" class="white--text">
    <!-- <v-toolbar-side-icon @click="toggleDrawer" class="white--text"></v-toolbar-side-icon> -->
    <v-toolbar-title>Volunteer Connect</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn class="white--text" to="/" flat>Home</v-btn>
      <v-btn v-if="userLoggedIn" class="white--text" :to="calendarPath" flat>
        My Calendar
      </v-btn>      
      <v-btn v-if="volunteerLoggedIn" class="white--text" :to="'/volunteer/report/' + volunteerID" flat>My Hours</v-btn>      
      <v-btn v-if="!userLoggedIn" class="white--text" to='/login' flat>Sign In/Sign Up </v-btn>
      <v-btn v-if="userLoggedIn" @click="logout" class="white--text" flat>Logout</v-btn>

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
      let necObj = {
        router: this.$router,
        ls: this.$ls
      };
      this.$store.commit("logout", necObj);
    }
  },
  computed: {
    now() {
      return new Date().getTime();
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
    unconfirmedVolunteerEvents() {
      return this.$store.state.volunteerShifts.filter(shift => {
        return shift.WasWorked && shift.ActualEndTime < this.now;
      }).length;
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
  }
};
</script>