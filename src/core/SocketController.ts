import { WebSocketMessage } from 'API/typesAPI';
import {
  addDOMMessageElement,
  createMessageElement,
  MessageStatus,
} from 'utils/createMessageElement';

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
    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${chatToken}`);

    this.setHandlers(socket, userId, chat);

    this.socketsMap.set(String(id), { socket: socket, oldMessagesArray: [] });
    console.log(this.socketsMap);
  }

  setHandlers(socket: WebSocket, userId: number, chat: ChatType) {
    socket.addEventListener('open', () => {
      console.log('Соединение установлено');

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
      console.log('Получены данные', event.data);

      const data = JSON.parse(event.data);

      if (Array.isArray(data)) {
        const socketData = this.socketsMap.get(String(chat.id)) as SocketData;
        socketData.oldMessagesArray = [...socketData.oldMessagesArray, ...data];

        this.socketsMap.set(String(chat.id), {
          socket: socketData.socket,
          oldMessagesArray: socketData.oldMessagesArray,
        });

        data.forEach((message: WebSocketMessage) => {
          addDOMMessageElement(message, userId);
        });

        return;
      }

      addDOMMessageElement(data, userId);
    });

    socket.addEventListener('error', (event) => {
      console.log('Ошибка', (event as ErrorEvent).message);
    });
  }
}
