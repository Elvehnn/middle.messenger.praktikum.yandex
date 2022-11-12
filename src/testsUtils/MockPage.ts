import Block from 'core/Block';

class MockPage extends Block<Record<string, unknown>> {
  static componentName = 'MockPage';

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
