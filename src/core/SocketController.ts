import { WebSocketMessage } from 'API/typesAPI';
import { addDOMMessageElement, updateDOMMessagesContainer } from 'utils/createMessageElement';
import { sortMessagesByTime } from 'utils/sortMessagesByTime';
import { PATH } from '../constants/pathsAPI';

export type SocketData = {
  socket: Nullable<WebSocket>;
  messagesArray: Array<WebSocketMessage>;
};
export interface SocketControllerProps {
  socketsMap: Map<number, SocketData>;
  initSocket: (userId: number, chat: ChatType) => void;
  setHandlers: (socket: WebSocket, userId: number, chat: ChatType) => void;
}

// TODO: заменить logs на уведомления или другие обработчики
export default class SocketController implements SocketControllerProps {
  socketsMap: Map<number, SocketData> = new Map();

  pingTimer: NodeJS.Timer | undefined;

  initSocket(userId: number, chat: ChatType) {
    const { id, chatToken } = chat;
    const socket = new WebSocket(`${PATH.WEBSOCKET}/chats/${userId}/${id}/${chatToken}`);

    this.socketsMap.set(id, { socket, messagesArray: [] });
    this.setHandlers(socket, userId, chat);
  }

  setHandlers(socket: WebSocket, userId: number, chat: ChatType) {
    socket.addEventListener('open', () => {
      let currentMessageNumber = 0;

      while (currentMessageNumber <= chat.unreadCount) {
        const messageObject = {
          content: String(currentMessageNumber),
          type: 'get old',
        };

        socket.send(JSON.stringify(messageObject));
        currentMessageNumber += 20;
      }

      // TODO: отдавать следующие 20 по клику, а здесь только первые 20. И сортировку - от старых к новым.

      this.pingTimer = setInterval(() => {
        socket.send(JSON.stringify({ type: 'ping' }));
      }, 10000);
    });

    socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${(event as CloseEvent).reason}`);

      clearInterval(this.pingTimer);
      this.socketsMap.delete(chat.id);
    });

    socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);

        if (Array.isArray(data)) {
          const socketData = this.socketsMap.get(chat.id) as SocketData;

          const messagesArray = [...socketData.messagesArray, ...data];

          const updatedSocketData = {
            ...socketData,
            messagesArray: sortMessagesByTime(messagesArray),
          };

          this.socketsMap.set(chat.id, {
            socket: updatedSocketData.socket,
            messagesArray: updatedSocketData.messagesArray,
          });

          updateDOMMessagesContainer(updatedSocketData.messagesArray, userId);

          return;
        }

        addDOMMessageElement(data, userId);
      } catch (error) {
        console.log((error as Error).message);
      }
    });

    socket.addEventListener('error', (event) => {
      console.log('Ошибка', (event as ErrorEvent).message);
    });
  }
}
