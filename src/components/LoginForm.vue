<template>
    <v-card>
        <v-card-title 
        class="primary white--text" 
        primary-title
        >
        Login
        </v-card-title>
      <v-alert 
        dismissible     
        v-model="loginError"
        color="error"
        icon="check_circle"
        outline
        mode="in-out"
        transition="slide-x-transition"
      >
        There was an error logging in. Please try again. 
      </v-alert>
        <v-card-text>
            <v-form
            ref="loginForm"
            v-model="valid"
            lazy-validation
            >
            <!-- User type toggler -->
            <v-layout>
                <v-flex xs12 sm11 md11 xl11>
                    <v-radio-group :rules="userTypeRules" row color="primary" v-model="userType" mandatory>
                        <v-radio color="primary" label="Non Profit Organization" value="NPO"></v-radio>
                        <v-radio color="primary" label="Volunteer" value="Volunteer"></v-radio>
                    </v-radio-group>
                </v-flex>
            </v-layout>
              <!-- User Email input -->
              <v-layout justify-space-around>
                <v-flex xs12 sm11 md11 xl11>
                  <v-text-field
                    v-model="Email"
                    :rules="emailRules"
                    prepend-icon="email"
                    :label="userType === 'NPO' ? 'Non Profit Email' : 'Volunteer Email'"
                    :placeholder="userType === 'NPO' ? 'Non Profit Email' : 'Volunteer Email'"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            <!-- User Password -->
              <v-layout justify-space-around>
                  <v-flex xs12 sm11 md11 xl11>
                    <v-text-field
                        v-model="Password"
                        :prepend-icon="showPass ? 'visibility' : 'visibility_off'"
                        :rules="[passwordRules.required, passwordRules.min]"
                        :type="showPass ? 'text' : 'password'"
                        name="input-10-1"
                        :label="userType === 'NPO' ? 'Non Profit Password' : 'Volunteer Password'"
                        hint="At least 8 characters"
                        counter
                        @click:prepend="showPass = !showPass"
                    ></v-text-field>
                  </v-flex>
              </v-layout>
              <v-btn
              :disabled="!valid"
              color="primary"
              @click="login"
              >
                  Login
              </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      valid: false,
      userType: "",
      userTypeRules: [v => !!v || "User Type is required"],
      Email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      Password: "",
      showPass: false,
      passwordRules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 5 || "Min 5 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  computed: {
    loginError: {
      get() {
        return this.$store.state.loginError;
      },
      set() {
        this.$store.commit("resetLoginError");
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginForm.validate();
      if (this.$refs.loginForm.validate()) {
        let user = {
          Email: this.Email,
          Password: this.Password,
          UserType: this.userType,
          router: this.$router,
          ls: this.$ls
        };
        console.log("this.$ls", this.$ls);
        this.$store.dispatch("login", user);
      }
    }
  }
};
</script>