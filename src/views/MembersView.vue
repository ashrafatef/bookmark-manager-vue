<template>
  <div>
    <v-row>
      <v-col cols="4" offset="4">
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab key="Assign user"> Assign User </v-tab>

          <v-tab key="Add user"> Add User </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-tabs-items v-model="tab">
          <v-tab-item key="Assign user">
            <v-card flat>
              <AssignUser/>
            </v-card>
          </v-tab-item>
          <v-tab-item key="Add user">
              <AddUsers/>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AddUsers from "@/components/AddUsers.vue";
import AssignUser from "../components/AssignUser.vue";
export default {
    name: "MembersView",
    data: () => ({
        tab: null,
        items: ["web", "shopping"],
    }),
    components: { AddUsers, AssignUser }
};
</script>