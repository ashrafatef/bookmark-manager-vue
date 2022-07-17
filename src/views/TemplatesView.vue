<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" style="background: lightblue">
        <div>
          <h2>Templates</h2>
        </div>
        <v-row class="add-template mx-2">
          <v-col cols="8">
            <v-text-field
              label="Add Template"
              v-model="templateName"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-btn class="my-2" @click="addNewTemplate()">
              <v-icon large color="black darken-2"> mdi-plus-thick </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <div class="templates-list">
          <v-card class="mx-auto" max-width="300" tile>
            <v-list>
              <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  @click="getFoldersById(item.id)"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </div>
      </v-col>
      <v-col cols="12" md="8">
        <AddFolderComponent />
        <ListFoldersComponent v-bind="folders"></ListFoldersComponent>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddFolderComponent from "@/components/AddFolderComponent.vue";
import ListFoldersComponent from "@/components/ListFoldersComponent.vue";
import { GET_TEMPLATES } from "../graphql/api/templates/queries.js";
import { MUTATION_CREATE_TEMPLATE } from "../graphql/api/templates/mutations.js";
import { QUERY_FOLDERS_BY_TEMPLATE_ID } from "../graphql/api/folders/queries.js";
import { MUTATION_CREATE_FOLDER } from "../graphql/api/folders/mutations.js";
export default {
  name: "TemplatesView",
  data: () => ({
    dialog: false,
    templates: [],
    folders: [],
    templateName: "",
    folderName: "",
    selectedItem: 0,
    selectedTemplate: null,
    items: [],
  }),
  methods: {
    getTemplates() {
      this.$apollo
        .query({
          query: GET_TEMPLATES,
        })
        .then((res) => {
          this.items = res.data.templates;
        });
    },
    getFoldersById(templateId) {
      this.selectedItem = parseInt(templateId, 10);
      this.selectedTemplate = parseInt(templateId, 10);
      this.$apollo
        .query({
          query: QUERY_FOLDERS_BY_TEMPLATE_ID,
          variables: {
            id: parseInt(templateId, 10),
          },
        })
        .then((res) => {
          this.folders = res.data.foldersByTemplate;
        });
    },
    addNewTemplate() {
      const companyId = parseInt(localStorage.getItem("companyId"));
      const userId = parseInt(localStorage.getItem("userId"));
      const newTemplate = {
        userId,
        companyId,
        name: this.templateName,
      };
      this.$apollo
        .mutate({
          mutation: MUTATION_CREATE_TEMPLATE,
          variables: {
            data: newTemplate,
          },
        })
        .then((res) => {
          const { id, name } = res.data.create;
          this.templates.push({ id, name });
          alert("Template created successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addNewFolder() {
      const newFolder = {
        templateId: this.selectedTemplate,
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
          alert("Folder created successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getTemplates();
  },
  components: {  AddFolderComponent , ListFoldersComponent },
};
</script>
