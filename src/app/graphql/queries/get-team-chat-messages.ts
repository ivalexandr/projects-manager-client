import { gql } from 'apollo-angular';

export const GET_TEAM_CHAT_MESSAGES = gql`
  query getTeamChatMessages($chatId: ID!, $lastMessageId: ID, $limit: Int) {
    getMessagesForChat(chatId: $chatId, lastMessageId: $lastMessageId, limit: $limit) {
      id
      createdAt
      message
      sender {
        id
        username
      }
    }
  }
`;
