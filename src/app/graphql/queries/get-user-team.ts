import { gql } from 'apollo-angular';

export const GET_USER_TEAM = gql`
  query getUserTeam($id: ID!) {
    getTeam(id: $id) {
      id
      banner
      avatar
      name
      description
      teamChat {
        id
      }
      leader {
        username
      }
    }
  }
`;
