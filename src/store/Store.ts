import EventBus from 'core/EventBus';
import { deepEqual } from 'utils/checkers and validators/deepEqual';
import { defaultState } from './defaultState';

export type Action<State> = (state: State, payload: any) => void;

export class Store<State extends Record<string, any>> extends EventBus {
  private state = {} as State;

  constructor(defaultState: State) {
    super();

    this.state = defaultState;
  }

  public getState() {
    return this.state;
  }

  public setState(newState: Partial<State>) {
    const nextState = { ...this.state, ...newState };

    if (!deepEqual(this.state, nextState)) {
      const prevState = this.state;

      this.state = { ...nextState };
      this.emit('updated', prevState, nextState);
    }
  }
}

export default new Store(defaultState);
