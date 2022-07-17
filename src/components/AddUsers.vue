<template>
  <v-form v-model="valid">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="12" md="7">
          <v-text-field
            v-model="firstname"
            :rules="firstNameRules"
            :counter="10"
            label="First Name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="7">
          <v-text-field
            v-model="lastname"
            :rules="lastNameRules"
            :counter="10"
            label="Last nNme"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="7">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="7">
          <v-text-field
            v-model="username"
            label="Username"
            :rules="usernameRules"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="7">
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :rules="passwordRules"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="7" v-if="isManager()">
          <v-btn color="primary" @click="addMember()"> Add Member </v-btn>
        </v-col>

        <v-col cols="12" md="7" v-if="isAdmin()">
          <v-btn color="primary" @click="addManager()"> Add Manager </v-btn>
        </v-col>

        <v-col cols="12" md="7" v-if="isSuperAdmin()">
          <v-btn color="primary" @click="addAdmin()"> Add Admin </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import {
  MUTATION_CREATE_USER_ADMIN,
  MUTATION_CREATE_USER_MANAGER,
  MUTATION_CREATE_USER_MEMBER,
} from "../graphql/api/users/mutations.js";
export default {
  name: "AddUsers",
  data: () => ({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    valid: false,
    firstNameRules: [
      (v) => !!v || "First name is required",
      (v) => v.length <= 15 || "First name must be less than 105characters",
    ],
    lastNameRules: [
      (v) => !!v || "First name is required",
      (v) => v.length <= 15 || "Last name must be less than 15 characters",
    ],
    usernameRules: [
      (v) => !!v || "First name is required",
      (v) => v.length <= 10 || "username must be less than 10 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: [
      (v) => !!v || "password is required",
      (v) => v.length >= 6 || "Password must be at least 6 characters",
    ],
  }),
  methods: {
    isManager() {
      return this.userRole === "MANAGER";
    },
    isSuperAdmin() {
      return this.userRole === "SUPER_USER";
    },
    isAdmin() {
      return this.userRole === "ADMIN";
    },
    addAdmin() {
      const formData = this.getFormData();
      this.$apollo
        .mutate({
          mutation: MUTATION_CREATE_USER_ADMIN,
          variables: {
            data: {
              ...formData,
            },
          },
        })
        .then(() => {
          this.$router.push("/dashboard");
        });
    },
    addMember() {
      const formData = this.getFormData();
      this.$apollo
        .mutate({
          mutation: MUTATION_CREATE_USER_MEMBER,
          variables: {
            data: {
              ...formData,
            },
          },
        })
        .then((res) => {
          const user  = res.data.createMember;
          this.$store.commit("addUser", user);
          this.$root.$emit("user_added");
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    },
    addManager() {
      const formData = this.getFormData();
      this.$apollo
        .mutate({
          mutation: MUTATION_CREATE_USER_MANAGER,
          variables: {
            data: {
              ...formData,
            },
          },
        })
        .then(() => {
        });
    },
    getFormData() {
      return {
        username: this.username,
        email: this.email,
        password: this.password,
        firstName: this.firstname,
        lastName: this.lastname,
        companyId: this.companyId,
      };
    },
  },
  computed: {
    userRole() {
      return this.$store.state.user.role;
    },
    companyId() {
      return this.$store.state.user.companyId;
    },
  },
};
</script>