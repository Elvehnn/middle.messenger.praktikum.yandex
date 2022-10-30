import { ChatFromServer } from 'API/typesAPI';

export const transformChatsObject = (data: ChatFromServer): ChatType => {
  return {
    id: data.id,
    title: data.title,
    avatar: data.avatar,
    createdBy: data.created_by,
    unreadCount: data.unread_count,
    lastMessage: data.last_message,
  };
};
