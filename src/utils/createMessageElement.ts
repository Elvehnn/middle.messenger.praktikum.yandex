/* eslint-disable camelcase */
import { WebSocketMessage } from 'API/typesAPI';
import { dateToLocaleString } from './dateToLocaleString';

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
      ? ['chat-message', 'chat-message_owner']
      : ['chat-message', 'chat-message_mate'];

  const messageElement = document.createElement('div');
  messageElement.classList.add(...elementClass);

  const textElement = document.createElement('p');
  textElement.textContent = message.content;

  const timeElement = document.createElement('time');
  timeElement.classList.add('chat-message__time');
  timeElement.textContent = dateToLocaleString(message.time);

  messageElement.append(textElement, timeElement);

  return messageElement;
};

export const addDOMMessageElement = (webSocketMessage: WebSocketMessage, userId: number) => {
  const { content, type, time, user_id } = webSocketMessage;

  const messageStatus = userId === +user_id ? MessageStatus.Owner : MessageStatus.Mate;

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

export const clearConversation = (notification: string) => {
  const container = document.querySelector('.conversation');

  if (container && notification) {
    container.innerHTML = '';
    const notice = document.createElement('p');
    notice.classList.add('notice');

    notice.textContent = notification;

    container.append(notice);
  }
};
