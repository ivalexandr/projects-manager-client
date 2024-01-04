import { gql } from 'apollo-angular';

export const GET_USER_TEAM = gql`
  query getUserTeam($id: String!) {
    getTeam(id: $id) {
      id
      banner
      avatar
      name
      description
      leader {
        username
      }
    }
  }
`;
