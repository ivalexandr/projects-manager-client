import { gql } from 'apollo-angular';

export const CREATE_PROJECT_IN_TEAM = gql`
  mutation createProjectInTeam($input: CreateProjectInput!) {
    createProject(create: $input) {
      id
      title
      description
      createdAt
    }
  }
`;
