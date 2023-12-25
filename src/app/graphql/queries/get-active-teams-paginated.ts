import { gql } from 'apollo-angular';

export const GET_ACTIVE_TEAMS_PAGINATED = gql`
  query getActiveTeams($page: Int!, $pageSize: Int!) {
    getActivePublicTeam(page: $page, pageSize: $pageSize) {
      items {
        id
        name
        banner
        avatar
        description
        createdAt
        leader {
          id
          username
        }
      }
      totalCount
    }
  }
`;
