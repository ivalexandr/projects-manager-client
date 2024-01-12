import { gql } from 'apollo-angular';

export const GET_TEAM_ACCESSES = gql`
  query {
    getTeamAccesses {
      id
      team {
        id
        name
        avatar
        banner
      }
      teamRole
      status
    }
  }
`;
