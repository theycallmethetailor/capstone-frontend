<template>
    <v-card>
        <v-card-title 
        class="primary white--text" 
        primary-title
        >
        Register
        </v-card-title>
        <v-card-text>
          <!-- Volunteer Registration Form -->
            <v-form
            v-if="userType === 'Volunteer'"
            ref="volunteerRegistrationForm"
            v-model="volunteerFormValid"
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
              <!-- User First Name input -->
              <v-layout justify-space-around>
                <v-flex xs12 sm11 md11 xl11>
                  <v-text-field
                    v-model="FirstName"
                    :rules="firstNameRules"
                    prepend-icon="name"
                    label="First Name"
                    placeholder="First Name"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <!-- User Last Name input -->
              <v-layout justify-space-around>
                <v-flex xs12 sm11 md11 xl11>
                  <v-text-field
                    v-model="LastName"
                    :rules="lastNameRules"
                    prepend-icon="name"
                    label="Last Name"
                    placeholder="Last Name"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            <!-- Volunteer UserName -->
            <v-layout v-if="userType === 'Volunteer'" justify-space-around>
                <v-flex xs12 sm11 md11 xl11>
                  <v-text-field
                    v-if="userType === 'Volunteer'"
                    v-model="Username"
                    :rules="usernameRules"
                    prepend-icon="person"
                    label="Volunteer Username"
                    placeholder="Volunteer Username"
                    required
                  ></v-text-field>
                </v-flex>
            </v-layout>
            <!-- Volunteer Bio  -->
              <v-layout v-if="userType === 'Volunteer'" justify-space-around>
                <v-flex xs12 sm11 md11 lg11 xl11>
                  <v-textarea
                    v-model="Bio"
                    :rules="bioRules"
                    :count="1000"
                    prepend-icon="bio"
                    name="input-7-1"
                    label="Bio"
                    placeholder="Tell non-profits a little about yourself and the causes you care about."
                    hint="Enter a bio here."
                  ></v-textarea>
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
             :disabled="!volunteerFormValid"
              color="primary"
              @click="register"
              >
                  Register as a {{ userType === "NPO" ? "Non Profit Organization" : "Volunteer" }}
              </v-btn>
            </v-form>

            <!-- NPO Registration form  -->
            <v-form
            v-if="userType === 'NPO'"
            ref="npoRegistrationForm"
            v-model="npoFormValid"
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
              <!-- User First Name input -->
              <v-layout justify-space-around>
                <v-flex xs12 sm11 md11 xl11>
                  <v-text-field
                    v-model="FirstName"
                    :rules="firstNameRules"
                    prepend-icon="name"
                    label="First Name"
                    placeholder="First Name"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <!-- User Last Name input -->
              <v-layout justify-space-around>
                <v-flex xs12 sm11 md11 xl11>
                  <v-text-field
                    v-model="LastName"
                    :rules="lastNameRules"
                    prepend-icon="name"
                    label="Last Name"
                    placeholder="Last Name"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            <!-- NPO Name -->
            <v-layout v-if="userType === 'NPO'" justify-space-around>
                <v-flex xs12 sm11 md11 xl11>
                  <v-text-field
                    v-if="userType === 'NPO'"
                    v-model="NPOName"
                    :rules="npoNameRules"
                    prepend-icon="person"
                    label="Name of Non Profit"
                    placeholder="Name of Non Profit"
                    required
                  ></v-text-field>
                </v-flex>
            </v-layout>
            <!-- NPO Description  -->
              <v-layout v-if="userType === 'NPO'" justify-space-around>
                <v-flex xs12 sm11 md11 lg11 xl11>
                  <v-textarea
                    v-model="Description"
                    :rules="descriptionRules"
                    :count="1000"
                    prepend-icon="bio"
                    name="input-7-1"
                    label="NPO Description"
                    placeholder="Tell volunteers a little about your organization and the causes you care about."
                    hint="Enter a NPO description here."
                  ></v-textarea>
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
             :disabled="!npoFormValid"
              color="primary"
              @click="register"
              >
                  Register as a {{ userType === "NPO" ? "Non Profit Organization" : "Volunteer" }}
              </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import { toTitleCase } from "../utils/titleCase";

export default {
  name: "RegistrationForm",
  data() {
    return {
      volunteerFormValid: false,
      npoFormValid: false,
      userType: "NPO",
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
      },
      //   Username only data:
      Username: "",
      usernameRules: [
        v => !!v || "Username is required",
        v => v.length >= 5 || "Min 5 characters"
      ],
      NPOName: "",
      npoNameRules: [
        v => !!v || "Name of NPO is required",
        v => v.length >= 5 || "Min 5 characters"
      ],
      FirstName: "",
      firstNameRules: [v => !!v || "Last Name is required"],
      LastName: "",
      lastNameRules: [v => !!v || "Last Name is required"],
      Bio: "",
      bioRules: [
        v => v.length < 1000 || "Bio must be less than 1000 characters."
      ],
      Description: "",
      descriptionRules: [
        v => v.length < 1000 || "Bio must be less than 1000 characters."
      ]
    };
  },
  methods: {
    register() {
      console.log("refistration was called!");
      if (this.userType === "Volunteer") {
        this.$refs.volunteerRegistrationForm.validate();
        if (this.$refs.volunteerRegistrationForm.validate()) {
          let newUserObj = {
            Email: this.Email.toLowerCase(),
            FirstName: this.FirstName,
            LastName: this.LastName,
            Bio: this.Bio,
            Username: this.Username.toLowerCase(),
            Password: this.Password,
            UserType: this.userType,
            router: this.$router,
            ls: this.$ls
          };
          this.$store.dispatch("addVolunteer", newUserObj);
        }
      } else if (this.userType === "NPO") {
        console.log("register method was called.");
        this.$refs.npoRegistrationForm.validate();
        if (this.$refs.npoRegistrationForm.validate()) {
          let newUserObj = {
            Email: this.Email.toLowerCase(),
            FirstName: this.FirstName,
            LastName: this.LastName,
            Description: toTitleCase(this.Description),
            NPOName: this.NPOName,
            Password: this.Password,
            UserType: this.userType,
            router: this.$router,
            ls: this.$ls
          };
          this.$store.dispatch("addNPOs", newUserObj);
        }
      }
    },
    registerNPO() {
      console.log("registerNPO was called!");
    }
  }
};
</script>