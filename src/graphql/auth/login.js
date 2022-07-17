import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation ($data: AuthInput!) {
    login(data: $data) {
      token
      user {
        role
        email
        username
        id
        companyId
      }
    }
  }
`;
