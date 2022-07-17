<template>
  <v-row>
    <v-col cols="12" v-if="folders.length">
      <div v-for="folder in folders" :key="folder.name">
        <AppFolders v-bind:folder="folder" />
      </div>
    </v-col>
    <v-col cols="12" v-if="!folders.length">
      <h2>No Folder for this template !</h2>
    </v-col>
  </v-row>
</template>

<script>
import AppFolders from "../components/AppFolders.vue";

export default {
  components: { AppFolders },
  name: "ListFoldersComponent",
  props: ["folders"],
  data() {
    return {
      allFolders: [],
    };
  },
  mounted() {
    this.allFolders = this.folders;
    this.$root.$on("folder_added", (args) => {
      this.allFolders.push(args);
    });
  },
};
</script>