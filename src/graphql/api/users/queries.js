import gql from "graphql-tag";

export const QUERY_USERS_BY_COMPANY = gql`
query ($id: Float!) {
  membersByCompany(id: $id) {
    username
    id
  }
}
`;
