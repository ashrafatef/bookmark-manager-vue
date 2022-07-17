import gql from "graphql-tag";

export const MUTATION_CREATE_TEMPLATE = gql`
  mutation ($data: AddTemplateInput!) {
    create(data: $data) {
      name
      id
    }
  }
`;
