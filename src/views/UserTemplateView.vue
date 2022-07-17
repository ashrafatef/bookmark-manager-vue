<template>
  <div>
    <AddFolderComponent />
    <ListFoldersComponent v-bind:folders = "folders"></ListFoldersComponent>
  </div>
</template>

<script>
import gql from "graphql-tag";
import AddFolderComponent from "../components/AddFolderComponent.vue";
import ListFoldersComponent from "../components/ListFoldersComponent.vue";

export default {
  components:{ListFoldersComponent, AddFolderComponent},
  name: "TemplateView",
  data() {
    return {
      folders: [],
    };
  },
  methods: {
    getUserTemplateFolders() {
      console.log('user id', typeof this.$store.state.user.id)
      const userId =  this.$store.state.user.id
      this.$apollo
        .query({
          query: gql`
            query ($id: Float!){
              TemplateAssignedByUserId(id: $id) {
                template {
                  name
                  id
                  folders {
                    name
                    id
                    links {
                      name
                      value
                    }
                  }
                }
              }
            }
          `,
          variables: {
            id: parseInt(userId,10),
          },
        })
        .then((res) => {
          const template = JSON.parse(
            JSON.stringify(res.data.TemplateAssignedByUserId[0])
          ).template;
          this.folders = template.folders;
          this.$store.commit("setSelectedTemplate", template.id);
        })
    
    },
  },
  mounted(){
    this.getUserTemplateFolders();
     this.$root.$on('folder_added' , (args)=>{
        this.folders.push(args)
    })
  }
};
</script>