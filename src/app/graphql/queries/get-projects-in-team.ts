import { gql } from 'apollo-angular';

export const GET_PROJECTS_IN_TEAM = gql`
  query getProjectsInTeam($teamId: ID!) {
    getProjectsForTeam(teamId: $teamId) {
      id
      title
      description
      createdAt
    }
  }
`;
