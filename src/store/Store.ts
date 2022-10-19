import EventBus from 'core/EventBus';
import { defaultState } from './defaultState';

export class Store<State extends Record<string, any>> extends EventBus {
  private state: Indexed = {};

  constructor(defaultState: State) {
    super();

    this.state = defaultState;
    this.setState(defaultState);
  }

  public getState() {
    return this.state;
  }

  public setState(nextState: Partial<State>) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };
    this.emit('updated', prevState, nextState);
  }
}

export default new Store(defaultState);
