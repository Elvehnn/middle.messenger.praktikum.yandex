/* eslint-disable camelcase */
import { WebSocketMessage } from 'API/typesAPI';

export enum MessageStatus {
  Owner = 'owner',
  Mate = 'mate',
}

const SERVICE_MESSAGES = ['ping', 'pong', 'user connected'];

export const createMessageElement = (
  message: { time: string; content: string },
  status: MessageStatus
): HTMLDivElement => {
  const elementClass =
    status === MessageStatus.Owner
      ? ['chat-message', 'chat-message_mate']
      : ['chat-message', 'chat-message_owner'];

  const messageElement = document.createElement('div');
  messageElement.classList.add(...elementClass);

  const textElement = document.createElement('p');
  textElement.textContent = message.content;

  const timeElement = document.createElement('time');
  timeElement.classList.add('chat-message__time');
  timeElement.textContent = message.time;

  messageElement.append(textElement, timeElement);

  return messageElement;
};

export const addDOMMessageElement = (webSocketMessage: WebSocketMessage, userId: number) => {
  const { content, type, time, user_id } = webSocketMessage;

  const messageStatus = String(userId) === user_id ? MessageStatus.Owner : MessageStatus.Mate;

  if (!SERVICE_MESSAGES.includes(type)) {
    const messageData = { content, time };
    const messageElement = createMessageElement(messageData, messageStatus);

    document.querySelector('.conversation')?.append(messageElement);
  }
};

export const updateDOMMessagesContainer = (wsMessagesArray: WebSocketMessage[], userId: number) => {
  const container = document.querySelector('.conversation');

  if (container) {
    container.innerHTML = '';
  }

  wsMessagesArray.forEach((message) => {
    addDOMMessageElement(message, userId);
  });
};
