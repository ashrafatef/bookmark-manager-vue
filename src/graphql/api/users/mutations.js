import gql from "graphql-tag";

export const MUTATION_CREATE_USER_ADMIN = gql`
  mutation ($data: AddUserInput!) {
    createAdmin(data: $data) {
      id
      username
      email
      role
    }
  }
`;

export const MUTATION_CREATE_USER_MANAGER = gql`
  mutation ($data: AddUserInput!) {
    createManager(data: $data) {
      id
      username
      email
      role
    }
  }
`;

export const MUTATION_CREATE_USER_MEMBER = gql`
  mutation ($data: AddUserInput!) {
    createMember(data: $data) {
      id
      username
      email
      role
    }
  }
`;
