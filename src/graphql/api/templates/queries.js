import gql from "graphql-tag";

export const GET_TEMPLATES = gql`
  query {
    templates {
      name
      id
    }
  }
`;

export const QUERY_TEMPLATES_BY_MANAGER = gql`
  query ($id: Float!) {
    templatesByManager(id: $id) {
      name
      id
    }
  }
`;
