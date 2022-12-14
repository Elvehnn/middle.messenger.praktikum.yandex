import { getByTestId } from '@testing-library/dom';
import { renderBlock } from '../../testsUtils/renderBlock';
import ChatItem from './ChatItem';
import { CHAT_MOCK } from '../../testsUtils/chatMock';

describe('components/ChatItem', () => {
  it('should render ChatItem component with props', async () => {
    await renderBlock({
      Block: ChatItem,
      props: { chat: CHAT_MOCK },
    });

    expect(getByTestId(document.body, 'chat-item')).toBeInTheDocument();
    expect(getByTestId(document.body, 'chat-item-avatar')).toBeInTheDocument();
    expect(getByTestId(document.body, 'chat-item-title')).toBeInTheDocument();
    expect(getByTestId(document.body, 'chat-item-title')).toHaveTextContent('Chatik');
    expect(getByTestId(document.body, 'chat-item-info')).toBeInTheDocument();
    expect(getByTestId(document.body, 'chat-item-delete-btn')).toBeInTheDocument();
    expect(getByTestId(document.body, 'chat-item-unread')).toBeInTheDocument();
    expect(getByTestId(document.body, 'chat-item-unread')).toHaveTextContent('12');
  });

  it('should call a handler on a click event', async () => {
    const mockHandler = jest.fn();

    await renderBlock({
      Block: ChatItem,
      props: {
        chat: CHAT_MOCK,
      },
    });

    const chatItem = getByTestId(document.body, 'chat-item');
    chatItem.onclick = mockHandler;

    expect(chatItem).toBeInTheDocument();

    await (async () => {
      chatItem.click();
    })();

    expect(mockHandler).toHaveBeenCalled();
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });
});
