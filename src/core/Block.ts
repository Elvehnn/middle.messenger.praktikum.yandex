/* eslint-disable @typescript-eslint/no-explicit-any */
import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';
import { deepEqual } from 'utils/checkers and validators/deepEqual';
import EventBus from './EventBus';

export const BLOCK_EVENTS = {
  INIT: 'init',
  FLOW_CDM: 'flow:component-did-mount',
  FLOW_CDU: 'flow:component-did-update',
  FLOW_RENDER: 'flow:render',
};

export type Events = Values<typeof BLOCK_EVENTS>;

export default class Block<P extends Indexed<any>, ParentRefs = {}> {
  static componentName: string;

  static EVENTS = BLOCK_EVENTS;

  public id = nanoid(6);

  protected _element: Nullable<HTMLElement> = null;

  protected props: Readonly<P>;

  protected children: { [id: string]: Block<{}> } = {};

  private _eventBus: EventBus<Events>;

  // @ts-expect-error Тип {} не соответствует типу ParentRefs
  protected refs: ParentRefs = {};

  public constructor(props?: P) {
    this.props = props || ({} as P);

    this._eventBus = new EventBus<Events>();

    this._registerEvents(this._eventBus);

    this._eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  private _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  private _componentDidMount(props: P) {
    this.componentDidMount(props);
  }

  componentDidMount(props: P) {
    this.setProps(props);

    return true;
  }

  dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Partial<P>, newProps: Partial<P>) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (!response) {
      return;
    }

    this._render();
  }

  componentDidUpdate(oldProps: Partial<P>, newProps: Partial<P>) {
    if (deepEqual(oldProps, newProps)) {
      return true;
    }

    this.children = {};

    return true;
  }

  setProps = (nextPartialProps: Partial<P>) => {
    if (!nextPartialProps) {
      return;
    }

    const prevProps = this.props;
    const nextProps = { ...prevProps, ...nextPartialProps };

    this.props = nextProps;

    this._eventBus.emit(Block.EVENTS.FLOW_CDU, prevProps, nextProps);
  };

  getProps = () => {
    return this.props;
  };

  getRefs() {
    return this.refs;
  }

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this._compile();
    const newElement = fragment.firstElementChild;

    if (this._element && newElement) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement as HTMLElement;
    this._addEvents();
  }

  protected render(): string {
    return '';
  }

  getContent(): HTMLElement {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this._eventBus.emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this.element!;
  }

  private _removeEvents() {
    const { events } = this.props;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  private _addEvents() {
    const { events } = this.props;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  private _compile(): DocumentFragment {
    const fragment = document.createElement('template');

    const template = Handlebars.compile(this.render());

    fragment.innerHTML = template({
      ...this.props,
      children: this.children,
      refs: this.refs,
    });

    Object.entries(this.children).forEach(([id, component]) => {
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }

      const stubChilds = stub.childNodes.length ? stub.childNodes : [];

      const content = component.getContent();
      stub.replaceWith(content);

      const layoutContent = content.querySelector('[data-layout="1"]');

      if (layoutContent && stubChilds.length) {
        layoutContent.append(...stubChilds);
      }
    });

    return fragment.content;
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}

export interface BlockClass<P extends Record<string, unknown>> extends Function {
  new (props: P): Block<P>;
  componentName?: string;
}
