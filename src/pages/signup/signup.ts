import Block from 'core/Block';
import 'pages/start/start.scss';
import ControlledInput from 'components/ControlledInput/ControlledInput';
import { getChildInputRefs } from 'utils/getChildInputRefs';
import { getErrorsObject } from 'utils/getErrorsObject';
import { setChildErrorsProps } from 'utils/setChildErrorsProps';

type IncomingSignupProps = {
  inputs: Array<{ text: string; type: string }>;
};

type SignupProps = IncomingSignupProps & {
  onSubmit: (event: SubmitEvent) => void;
  onInput: (event: FocusEvent) => void;
  onFocus: (event: FocusEvent) => void;
};

type SignupRefs = Record<string, ControlledInput>;

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

export default class SignupPage extends Block<SignupProps, SignupRefs> {
  static componentName: string = 'SignupPage';

  constructor({ inputs }: IncomingSignupProps) {
    super();

    this.setProps({
      inputs: inputs,
      onSubmit: () => {
        const refs = getChildInputRefs(this.refs);
        const errors = getErrorsObject(refs);

        setChildErrorsProps(errors, this.refs);

        if (Object.keys(errors).length === 0) {
          const newData = Object.entries(refs).reduce((acc, [key, input]) => {
            acc[key] = input.value;
            return acc;
          }, {} as Record<string, string>);

          console.log(newData);
        }
      },
    });
  }
  render() {
    // language=hbs
    return `
        <main class="main">
            <h1>Chatterbox</h1>
            <form class="login-form" action="./main.html">
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
                    {{{Button title="Sign up" onClick=onSubmit}}}
                    {{{Link class="link" text="Sign in" path="/signin"}}}
                </div>
            </form>
        </main>
        `;
  }
}
