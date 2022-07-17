<template>
  <v-form v-model="valid">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="12" md="7">
          <v-select
            :items="members"
            item-text="username"
            item-value="id"
            v-model="selectedMember"
            label="Members"
            solo
          ></v-select>
        </v-col>

        <v-col cols="12" md="7">
          <v-select
            :items="templates"
            item-text="name"
            item-value="id"
            v-model="selectedTemplate"
            label="Templates"
            solo
          ></v-select>
        </v-col>

        <v-col cols="12" md="7">
          <v-btn depressed color="primary" @click="assignTemplate()">
            Assign Template
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { QUERY_USERS_BY_COMPANY } from "../graphql/api/users/queries.js";
import { QUERY_TEMPLATES_BY_MANAGER } from "../graphql/api/templates/queries.js";
import { MUTATION_ASSIGN_USER_TEMPLATE } from "../graphql/api/assignTemplate/mutations.js";
export default {
  name: "AssignUser",
  data: () => ({
    members: [],
    templates: [],
    selectedMember: {},
    selectedTemplate: {},
  }),
  methods: {
    getUsers() {
      this.$apollo
        .query({
          query: QUERY_USERS_BY_COMPANY,
          variables: {
            id: parseInt(this.userCompanyId, 10),
          },
        })
        .then((res) => {
          this.$store.commit("setUsers", res.data.membersByCompany);
          this.members = res.data.membersByCompany;
        });
    },
    getTemplates() {
      this.$apollo
        .query({
          query: QUERY_TEMPLATES_BY_MANAGER,
          variables: {
            id: parseInt(this.userId, 10),
          },
        })
        .then((res) => {
          this.templates = res.data.templatesByManager;
        });
    },
    assignTemplate() {
      this.$apollo
        .mutate({
          mutation: MUTATION_ASSIGN_USER_TEMPLATE,
          variables: {
            data: {
              userId: parseInt(this.selectedMember, 10),
              templateId: parseInt(this.selectedTemplate, 10),
            },
          },
        })
        .then(() => {
          alert("Template assigned successfully");
          this.selectedMember = {};
          this.selectedTemplate = {};
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    userCompanyId() {
      return this.$store.state.user.companyId;
    },
    userId() {
      return this.$store.state.user.id;
    },
  },
  mounted() {
    this.getUsers();
    this.getTemplates();
  },
};
</script>