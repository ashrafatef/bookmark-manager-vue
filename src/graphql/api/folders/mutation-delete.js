import gql from "graphql-tag";

export const MUTATION_DELETE_FOLDER = gql`
  mutation ($id: Float!) {
    deleteFolder(id: $id)
  }
`;
