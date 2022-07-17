import gql from "graphql-tag";

export const MUTATION_ASSIGN_USER_TEMPLATE = gql`
  mutation ($data: AssignTemplateInput!) {
    AssignTemplate(data: $data) {
      id
      userId
      templateId
    }
  }
`;
