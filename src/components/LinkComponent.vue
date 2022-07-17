<template>
  <v-row>
    <v-col cols="8" class="text-left">
      <a :href="link.value">{{ link.name }}</a>
    </v-col>
    <v-col cols="3" offset-md="1">
      <v-icon large color="red darken-2" rounded @click="removeLink()">
        mdi-delete
      </v-icon>
    </v-col>
  </v-row>
</template>

<script>
import { MUTATION_DELETE_LINK } from "../graphql/api/links/mutations";
export default {
  props: ["link"],
  methods: {
    removeLink() {
      const linkId = parseInt(this.link.id, 10);
      console.log( this.link.id)
      this.$apollo
        .mutate({
          mutation: MUTATION_DELETE_LINK,
          variables: {
            id: linkId,
          },
        })
        .then(() => {
          this.$emit("linkDeleted", linkId);
        });
    },
  },
};
</script>