import { WebSocketMessage } from 'API/typesAPI';
import { PATH } from '../constants/pathsAPI';
import { addDOMMessageElement, updateDOMMessagesContainer } from 'utils/createMessageElement';
import { sortMessagesByTime } from 'utils/sortMessagesByTime';

export interface SocketControllerProps {
  socketsMap: Map<string, SocketData>;
  createSocket: (userId: number, chat: ChatType) => void;
  setHandlers: (socket: WebSocket, userId: number, chat: ChatType) => void;
}

export type SocketData = {
  socket: WebSocket;
  oldMessagesArray: Array<WebSocketMessage>;
};

export default class SocketController implements SocketControllerProps {
  socketsMap: Map<string, SocketData> = new Map();

  createSocket(userId: number, chat: ChatType) {
    const { id, chatToken } = chat;
    const socket = new WebSocket(`${PATH.WEBSOCKET}/chats/${userId}/${id}/${chatToken}`);

    this.setHandlers(socket, userId, chat);
    this.socketsMap.set(String(id), { socket: socket, oldMessagesArray: [] });
  }

  setHandlers(socket: WebSocket, userId: number, chat: ChatType) {
    socket.addEventListener('open', () => {
      let currentMessageNumber = 0;

      while (currentMessageNumber < chat.unreadCount) {
        const messageObject = {
          content: String(currentMessageNumber),
          type: 'get old',
        };

        // TODO: отдавать следующие 20 по клику, а здесь только первые 20. И сортировку - от старых к новым.

        socket.send(JSON.stringify(messageObject));
        currentMessageNumber += 20;
      }
    });

    socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${(event as CloseEvent).reason}`);
      this.socketsMap.delete(String(userId));
    });

    socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);

        if (Array.isArray(data)) {
          const socketData = this.socketsMap.get(String(chat.id)) as SocketData;

          const messagesArray = [...socketData.oldMessagesArray, ...data];

          const updatedSocketData = {
            ...socketData,
            oldMessagesArray: sortMessagesByTime(messagesArray),
          };

          this.socketsMap.set(String(chat.id), {
            socket: updatedSocketData.socket,
            oldMessagesArray: updatedSocketData.oldMessagesArray,
          });

          updateDOMMessagesContainer(updatedSocketData.oldMessagesArray, userId);

          return;
        }

        addDOMMessageElement(data, userId);
      } catch {
        (error: Error) => console.log(error.message);
      }
    });

    socket.addEventListener('error', (event) => {
      console.log('Ошибка', (event as ErrorEvent).message);
    });
  }
}
