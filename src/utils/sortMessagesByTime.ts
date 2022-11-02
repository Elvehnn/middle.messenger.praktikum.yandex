import { WebSocketMessage } from 'API/typesAPI';

export const sortMessagesByTime = (messages: Array<WebSocketMessage>) =>
  messages.sort((a, b) => {
    const time1 = new Date(a.time).getTime();
    const time2 = new Date(b.time).getTime();
    return time1 - time2;
  });
