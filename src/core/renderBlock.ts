import Block from './Block';
import { AnyProps } from './RegisterComponent';

export const renderBlock = (query: string, block: Nullable<Block<AnyProps>>) => {
  const root = document.querySelector(query);

  if (block) {
    root!.textContent = block.getContent().outerHTML;
  }

  return root;
};
