export interface SocketControllerProps {
  socketsArray: Array<WebSocket>;
  createSocket: (userId: number, chat: ChatType) => void;
}

export default class SocketController implements SocketControllerProps {
  socketsArray: Array<WebSocket> = [];

  constructor() {}

  createSocket(userId: number, chat: ChatType) {
    const { id, chatToken } = chat;
    console.log(id, chatToken);
    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${chatToken}`);

    socket.addEventListener('open', () => {
      console.log('Соединение установлено');

      socket.send(
        JSON.stringify({
          content: `Пользователь ${userId} подключился к чату!`,
          type: 'message',
        })
      );
    });

    socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    socket.addEventListener('message', (event) => {
      console.log('Получены данные', event.data);
    });

    socket.addEventListener('error', (event) => {
      console.log('Ошибка', (event as ErrorEvent).message);
    });

    this.socketsArray.push(socket);
  }
}
