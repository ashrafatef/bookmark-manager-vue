import gql from "graphql-tag";

export const MUTATION_CREATE_LINK = gql`
  mutation ($data: AddLinkInput!) {
    createLink(data: $data) {
      name
      value
      id
    }
  }
`;

export const MUTATION_DELETE_LINK = gql`
  mutation ($id: Float!) {
    deleteLink(id: $id) 
  }
`;
