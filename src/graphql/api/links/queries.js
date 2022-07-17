import gql from "graphql-tag";

export const QUERY_LINKS_BY_FOLDER_ID = gql`
  query ($id: Float!) {
    linksByFolder(id: $id) {
      name
      id
    }
  }
`;
