import { gql } from 'apollo-angular';

export const GET_TEAMS_FOR_USER = gql`
  query {
    getTeamForUser {
      id
      name
      avatar
      banner
      description
    }
  }
`;
