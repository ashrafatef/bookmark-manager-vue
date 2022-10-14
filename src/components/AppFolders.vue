<template>
  <v-col class="text-center">
    <v-card class="mx-auto my-12" max-width="374">
      <v-card-title class="text-center">{{ folder.name }} </v-card-title>

      <v-card-text>
        <div v-for="link in links" :key="link.name">
          <LinkComponent v-bind:link="link" @linkDeleted="linkDeleted" />
        </div>
      </v-card-text>

      <v-card-actions>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              <v-icon large color="black darken-2"> mdi-plus-thick </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">User Profile</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Title"
                      required
                      v-model="title"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Link"
                      v-model="link"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="addLink()">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-icon large color="black darken-2" @click="deleteFolder()">
          mdi-delete
        </v-icon>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import LinkComponent from "./LinkComponent.vue";
import { QUERY_LINKS_BY_FOLDER_ID } from "../graphql/api/links/queries.js";
import { MUTATION_CREATE_LINK } from "../graphql/api/links/mutations.js";
import { MUTATION_DELETE_FOLDER } from "../graphql/api/folders/mutation-delete.js";
export default {
  name: "AppFolders",
  props: ["folder"],
  data: () => ({
    dialog: false,
    links: [],
    link: "",
    title: "",
  }),
  methods: {
    linkDeleted(linkId) {
      this.links = this.links.filter((link) => {
        return link.id != linkId;
      });
    },
    getLinksByFolder() {
      this.$apollo
        .query({
          query: QUERY_LINKS_BY_FOLDER_ID,
          variables: {
            id: parseInt(this.folder.id, 10),
          },
        })
        .then((res) => {
          this.links = res.data.linksByFolder;
        });
    },
    addLink() {
      const newLink = {
        name: this.title,
        value: this.link,
        folderId: parseInt(this.folder.id, 10),
      };
      this.$apollo
        .mutate({
          mutation: MUTATION_CREATE_LINK,
          variables: {
            data: newLink,
          },
        })
        .then((res) => {
          const { id, name, value } = res.data.createLink;
          this.links.push({ id, name, value });
          this.title = "";
          this.link = "";
          this.dialog = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteFolder() {
      const folderId = parseInt(this.folder.id, 10)
      this.$apollo
        .mutate({
          mutation: MUTATION_DELETE_FOLDER,
          variables: {
            id: folderId,
          },
        })
        .then(() => {
          this.$emit("folderDeleted", folderId);
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.getLinksByFolder();
  },
  components: { LinkComponent },
};
</script>