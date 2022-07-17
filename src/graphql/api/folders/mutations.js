import gql from "graphql-tag";

export const MUTATION_CREATE_FOLDER = gql`
  mutation ($data: AddFolderInput!) {
    createFolder(data: $data) {
      name
      templateId
    }
  }
`;
