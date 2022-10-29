import { WebSocketMessage } from 'API/typesAPI';
import { createMessageElement, MessageStatus } from 'services/chats';

export interface SocketControllerProps {
  socketsMap: Map<string, WebSocket>;
  createSocket: (userId: number, chat: ChatType) => void;
  setHandlers: (socket: WebSocket, userId: number) => void;
}

export default class SocketController implements SocketControllerProps {
  socketsMap: Map<string, WebSocket> = new Map();

  constructor() {}

  createSocket(userId: number, chat: ChatType) {
    const { id, chatToken } = chat;
    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${chatToken}`);

    this.setHandlers(socket, userId);

    this.socketsMap.set(String(id), socket);
    console.log(this.socketsMap);
  }

  setHandlers(socket: WebSocket, userId: number) {
    socket.addEventListener('open', () => {
      console.log('Соединение установлено');
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
      const { content, type, time } = JSON.parse(event.data) as WebSocketMessage;

      if (type !== 'user connected') {
        const messageData = { content, time };
        const messageElement = createMessageElement(messageData, MessageStatus.Mate);

        document.querySelector('.conversation')?.prepend(messageElement);
      }
    });

    socket.addEventListener('error', (event) => {
      console.log('Ошибка', (event as ErrorEvent).message);
    });
  }
}
