import Block, { BlockClass } from 'core/Block';

class MockPage extends Block<{}> {
  static componentName: string = 'MockPage';

  constructor(props: {}) {
    super(props);
  }

  render() {
    // language=hbs
    return `
        <main class="main">
          <h1>Chatterbox</h1>
          <h2>MockPage</h2>
        </main>
        `;
  }
}

export default MockPage;
