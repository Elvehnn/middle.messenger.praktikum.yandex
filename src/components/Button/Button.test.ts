import { getByTestId } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { renderBlock } from '../../tests/renderBlock';
import Button from './Button';

describe('components/Button', () => {
  it('should render button with exactly props', () => {
    renderBlock({
      Block: Button,
      props: { dataTestid: 'test-button', type: 'button', title: 'Save changes' },
    });

    expect(getByTestId(document.body, 'test-button')).toBeInTheDocument();
    expect(getByTestId(document.body, 'test-button')).toHaveTextContent('Save changes');
  });

  it('should render button with default dataTestid', () => {
    renderBlock({
      Block: Button,
      props: { type: 'button' },
    });

    expect(getByTestId(document.body, 'button')).toBeInTheDocument();
    expect(getByTestId(document.body, 'button')).toHaveTextContent('');
  });
});
