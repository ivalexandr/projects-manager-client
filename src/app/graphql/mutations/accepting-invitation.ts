import { gql } from 'apollo-angular';

export const ACCEPTING_INVITAION = gql`
  mutation acceptingInvitation($teamId: ID!, $isAnswer: Boolean!) {
    acceptingInvitation(teamId: $teamId, isAnswer: $isAnswer) {
      id
      status
      teamRole
    }
  }
`;
