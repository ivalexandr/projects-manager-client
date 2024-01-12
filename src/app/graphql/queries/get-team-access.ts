import { gql } from 'apollo-angular';

export const GET_TEAM_ACCESS = gql`
  query getTeamAccess($id: ID!) {
    getTeamAccess(teamId: $id) {
      id
      team {
        id
        name
        avatar
        banner
        leader {
          id
          username
        }
        teamChat {
          id
        }
      }
      teamRole
      status
    }
  }
`;
