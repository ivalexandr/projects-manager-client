import { gql } from 'apollo-angular';

export const REMOVE_TEAM_ACCESS = gql`
  mutation removeTeamAccess($teamAccessId: ID!) {
    removeTeamAccess(teamAccessId: $teamAccessId) {
      id
    }
  }
`;
