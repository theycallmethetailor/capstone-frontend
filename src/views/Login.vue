<template>
  <v-container>
    <v-layout>
      <v-flex>
        <LoginForm />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
export default {
  name: "Login",
  components: {
    LoginForm
  }
};
</script>
