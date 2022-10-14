<template>
  <div>
    <v-row v-if="folders.length">
      <v-col cols="4" v-for="folder in folders" :key="folder.name">
        <AppFolders v-bind:folder="folder" @folderDeleted="folderDeleted" />
      </v-col>
    </v-row>
    <v-row v-if="!folders.length">
      <v-col cols="12">
        <h2>No Folder for this template !</h2>
      </v-col>
    </v-row>
  </div>
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
  methods: {
    handleAddFolder(e) {
      console.log(e);
    },
    folderDeleted(id) {
      // eslint-disable-next-line vue/no-mutating-props
      this.folders = this.folders.filter((folder) => {
        return folder.id != id;
      });
    },
  },
  mounted() {
    this.allFolders = this.folders;
  },
  created() {
    this.$root.$on("folderAdded", (args) => {
      // eslint-disable-next-line vue/no-mutating-props
      this.folders.push(args);
    });
  },
};
</script>