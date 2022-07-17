<template>
  <v-row>
    <v-col cols="12" md="8">
      <div>
        <h2>Folders</h2>
      </div>
      <v-row class="add-folder mx-2">
        <v-col cols="5" offset="3">
          <v-text-field label="Add Folder" v-model="folderName"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-btn class="my-2" @click="addNewFolder()">
            <v-icon large color="black darken-2"> mdi-plus-thick </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { MUTATION_CREATE_FOLDER } from "../graphql/api/folders/mutations.js";
export default {
  name: "AddFolderComponent",
  data() {
    return {};
  },
  methods: {
    addNewFolder() {
      const newFolder = {
        templateId: parseInt(this.$store.state.selectedTemplate, 10),
        name: this.folderName,
      };

      this.$apollo
        .mutate({
          mutation: MUTATION_CREATE_FOLDER,
          variables: {
            data: newFolder,
          },
        })
        .then((res) => {
          const { id, name } = res.data.createFolder;
          this.folders.push({ id, name });
          this.folderName = "";
          this.$root.$emit("folder_added", { id, name });
          alert("Folder created successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>