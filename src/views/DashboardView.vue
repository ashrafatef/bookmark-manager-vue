<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <v-card class="mx-auto dashboard-side-nav" width="256">
          <v-navigation-drawer permanent>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  Bookmark Portal
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense nav>
              <v-list-item
                v-for="item in filteredTabs"
                :key="item.title"
                link
                :to="item.route"
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <template v-slot:append>
              <div class="pa-2">
                <v-btn block @click="logout()"> Logout </v-btn>
              </div>
            </template>
          </v-navigation-drawer>
        </v-card>
      </v-col>
      <v-col cols="9">
        <router-view />
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
export default {
  name: "AppDashboard",
  data: () => ({
    tabs: [
      {
        title: "Members",
        icon: "mdi-account-group",
        route: "/members",
        rolesToAccess: ["SUPER_USER", "ADMIN", "MANAGER"],
      },
      {
        title: "Templates",
        icon: "mdi-folder-multiple",
        route: "/templates",
        rolesToAccess: ["MANAGER"],
      },
       {
        title: "Template",
        icon: "mdi-folder-multiple",
        route: "/template",
        rolesToAccess: ["INDIVIDUAL"],
      },
    ],
  }),
  methods: {
    logout() {
      this.$store.commit("setIsAuthenticated", false);
      localStorage.removeItem("authorization_token");
      this.$router.push("/");
    },
    isAuthorized(rolesToAccess) {
      const role = this.$store.state.user.role;
      return rolesToAccess.includes(role);
    },
  },
  computed: {
    filteredTabs() {
      return this.tabs.filter((tab) => this.isAuthorized(tab.rolesToAccess));
    },
  },
};
</script>


<style lang="sass" scoped>
.dashboard-side-nav
  height: 100vh
</style>

<style lang="scss" scoped>
</style>