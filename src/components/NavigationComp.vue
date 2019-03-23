<template>
  <v-toolbar color="primary" class="white--text">
    <v-toolbar-side-icon @click="toggleDrawer" class="white--text"></v-toolbar-side-icon>
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn class="white--text" to="/" flat>Home</v-btn>
      <v-btn class="white--text" to="/about" flat>About</v-btn>
      <v-btn class="white--text" to='/login' flat>Login</v-btn>
      <v-btn class="white--text" to='/register' flat>Register</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: "NavigationComp",
  methods: {
    toggleDrawer() {
      this.$store.dispatch("toggleDrawer");
    }
  }
};
</script>