import { gql } from 'apollo-angular';

export const GET_TEAM_ACCESSES_FOR_TEAM = gql`
  query getTeamAccessesForTeam($teamId: ID!) {
    getTeamAccessesForTeam(teamId: $teamId) {
      id
      user {
        username
        email
      }
      teamRole
      status
    }
  }
`;
