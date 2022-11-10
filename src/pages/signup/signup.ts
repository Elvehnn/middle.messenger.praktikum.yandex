import Block from 'core/Block';
import 'pages/start/start.scss';
import ControlledInput from 'components/ControlledInput/ControlledInput';
import { getChildInputRefs } from 'utils/getChildInputRefs';
import { getErrorsObject } from 'utils/getErrorsObject';
import { setChildErrorsProps } from 'utils/setChildErrorsProps';
import { WithRouter } from 'utils/HOCS/WithRouter';
import Router from 'core/Router';
import { WithStore } from 'utils/HOCS/WithStore';
import { Store } from 'store/Store';
import { stringToCamelCase } from 'utils/transformers/stringToCamelCase';
import { signup } from 'services/authorization';
import { transformRefsToUser } from 'utils/transformers/transformRefsToUser';
import { SignupData, UserKeys } from 'API/typesAPI';
import { INPUTS } from '../../constants/inputs';

type SignupProps = {
  router: Router;
  store: Store<AppState>;
  events: Record<string, unknown>;
  inputs: Array<Record<string, string>>;
  navigateToSignin?: () => void;
};

type SignupRefs = Record<string, ControlledInput>;

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

class SignupPage extends Block<SignupProps, SignupRefs> {
  static componentName = 'SignupPage';

  constructor(props: SignupProps) {
    super({
      ...props,
      events: {
        submit: (event: SubmitEvent) => this.onSubmit(event),
      },
    });

    this.setProps({
      inputs: INPUTS,

      navigateToSignin: () => {
        this.props.store.setState({ errorMessage: '' });
        this.props.router.go('/signin');
      },
    });
  }

  async onSubmit(event: SubmitEvent) {
    event.preventDefault();

    const refs = getChildInputRefs(this.refs);
    const errors = getErrorsObject(refs);

    setChildErrorsProps(errors, this.refs);

    if (Object.keys(errors).length === 0) {
      const signupData = Object.entries(refs).reduce((acc, [key, input]) => {
        acc[stringToCamelCase(key) as Partial<UserKeys>] = input.value;
        return acc;
      }, {} as Partial<SignupData>);

      signup(this.props.store, transformRefsToUser(signupData));
    }
  }

  render() {
    const { errorMessage } = this.props.store.getState();

    // language=hbs
    return `
        <main class="main">
          {{{Preloader}}}
       
            <h1>Chatterbox</h1>

            <form class="login-form">
                  <div class="login-form__group">
                      <h2>Sign up</h2>
                      {{#each inputs}}
                          {{#with this}}
                            {{{ControlledInput
                              onInput=../onInput
                              onFocus=../onFocus 
                              type=type
                              inputName=text
                              ref=text
                              childInputRef=text
                              error=error
                              value=''
                              placeholder=text
                            }}}
                          {{/with}}
                      {{/each}}
                  </div>

                  <div class="login-form__bottom">
                    <p class='form-submit__warning'>${errorMessage}</p>
                 
                    {{{Button title="Sign up"}}}
                    {{{Button class="button button_redirect" title="Sign in" onClick=navigateToSignin}}}
                  </div>
            </form>
    
        </main>
        `;
  }
}

export default WithStore(WithRouter(SignupPage));
