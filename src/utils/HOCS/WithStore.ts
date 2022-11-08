import { BlockClass } from 'core/Block';
import { Store } from 'store/Store';
import { deepEqual } from 'utils/checkers and validators/deepEqual';

type WithStateProps = { store: Store<AppState> };

export type MapStateToProps<S> = (state: AppState) => S;

export function WithStore<P extends WithStateProps, S = Indexed<unknown>>(
  WrappedBlock: BlockClass<P>,
  mapStateToProps?: MapStateToProps<S>
) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;
    public static mapStateToProps = (state: AppState) => {
      return state;
    };

    constructor(props: P) {
      // TODO: прокидывать свойства через mapStateToProps
      super({ ...props, store: window.store });
    }

    private __onChangeStoreCallback = (prev: AppState, next: AppState) => {
      if (typeof mapStateToProps === 'function') {
        const prevPropFromState = mapStateToProps(prev) as Indexed<unknown>;
        const nextPropFromState = mapStateToProps(next) as Indexed<unknown>;

        if (deepEqual(prevPropFromState, nextPropFromState)) {
          return;
        }

        // @ts-expect-error this is not typed
        this.setProps(nextPropFromState);
        return;
      }
      // @ts-expect-error this is not typed
      this.setProps({ ...this.props, store: window.store });
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on('updated', this.__onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off('updated', this.__onChangeStoreCallback);
    }
  } as BlockClass<Omit<P, 'store'>>;
}
