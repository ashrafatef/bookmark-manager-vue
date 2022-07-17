<template>
  <div class="home">
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="3" offset-md="4">
            <v-text-field label="Email" v-model="email"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="3" offset-md="4">
            <v-text-field
              type="password"
              label="Password"
              v-model="password"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="3" offset-md="4">
            <v-btn rounded color="primary" @click="login()"> Login </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { LOGIN_MUTATION } from "../graphql/auth/login.js";
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const loginData = {
        email: this.email,
        password: this.password,
      };
      this.$apollo
        .mutate({
          mutation: LOGIN_MUTATION,
          variables: {
            data: loginData,
          },
        })
        .then((res) => {
          const { token, user } = res.data.login;
          this.$store.commit("setUser", user);
          this.$store.commit("setIsAuthenticated", true);
          localStorage.setItem("authorization_token", token);
          this.$router.push("/dashboard");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
