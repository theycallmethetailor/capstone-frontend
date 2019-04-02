<template>
  <v-container>
    <v-layout>
      <v-flex>
        <template>
          <div>
            <v-tabs
              v-model="active"
              color="primary"
              dark
              slider-color="accent"
            >
              <v-tab
                v-for="(option, i) in tabOptions"
                :key="i"
                ripple
              >
                {{ option }}

              </v-tab>
              <!-- Login -->
              <v-tab-item
              >
                <v-card flat>
                  <LoginForm />
                </v-card>
              </v-tab-item>
              <!-- Registration -->
              <v-tab-item
              >
                <v-card flat>
                  <RegistrationForm />
                </v-card>
              </v-tab-item>
            </v-tabs>
          </div>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";
export default {
  name: "Login",
  components: {
    LoginForm,
    RegistrationForm
  },
  data() {
    return {
      active: null,
      tabOptions: ["Login", "Register"]
    };
  },
  methods: {
    next() {
      const active = parseInt(this.active);
      this.active = active < 1 ? active + 1 : 0;
    }
  }
};
</script>
