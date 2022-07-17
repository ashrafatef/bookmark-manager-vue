import gql from "graphql-tag";

export const QUERY_FOLDERS_BY_TEMPLATE_ID = gql`
  query ($id: Float!) {
    foldersByTemplate(id: $id) {
      name
      id
    }
  }
`;
