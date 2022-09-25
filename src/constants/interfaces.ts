export interface ChatItemPreview {
  name: string;
  message: string;
  time: string;
  unread: string;
  onChatItemClick?: () => void;
}
