import Block from 'core/Block';
import 'pages/start/start.scss';
import { validateForm, ValidateType } from 'utils/validateForm';
import { inputs } from 'constants/inputs';

type SignupPageProps = {
  inputs: Array<{ text: string; type: string }>;
};

export default class SignupPage extends Block {
  constructor() {
    super({ inputs });

    this.setProps({
      onSubmit: () => {
        const refs = Object.entries(this.refs).reduce((acc, [key, value]) => {
          acc[key.toLowerCase()] = value.refs[key].getContent() as HTMLInputElement;
          return acc;
        }, {} as { [key: string]: HTMLInputElement });

        console.log(this.refs);

        const { login, password, email, first_name, second_name, phone } = refs;
        // console.log(login, password, email, first_name, second_name, phone);

        const errors = validateForm([
          { type: ValidateType.Login, value: login.value },
          { type: ValidateType.Password, value: password.value },
          { type: ValidateType.Email, value: email.value },
          { type: ValidateType.Phone, value: phone.value },
          { type: ValidateType.FirstName, value: first_name.value },
          { type: ValidateType.SecondName, value: second_name.value },
        ]);

        if (Object.keys(errors).length !== 0) {
          for (let key in errors) {
            const capitalizedKey = key[0].toUpperCase() + key.slice(1);

            this.refs[capitalizedKey].refs.errorRef.setProps({ error: errors[key] });
          }
        } else {
          console.log({
            login: login.value,
            password: password.value,
            first_name: first_name.value,
            second_name: second_name.value,
            email: email.value,
            phone: phone.value,
          });

          for (let key in errors) {
            this.refs[key].refs.errorRef.setProps({ error: '' });
          }
        }
      },
      onInput: (event: FocusEvent) => {
        const target = event.target as HTMLInputElement;

        const errors = validateForm([
          { type: target.name.toLowerCase() as ValidateType, value: target.value },
        ]);

        this.refs[target.name].refs.errorRef.setProps({ error: errors[target.name.toLowerCase()] });
      },
      onFocus: (event: FocusEvent) => {
        console.log('onFocus!');
        const target = event.target as HTMLInputElement;
        const errors = validateForm([
          { type: target.name.toLowerCase() as ValidateType, value: target.value },
        ]);

        this.refs[target.name].refs.errorRef.setProps({ error: errors[target.name.toLowerCase()] });
      },
    });
  }
  render() {
    // console.log(this.props);
    // language=hbs
    return `
        <main class="main">
            <h1>Chatterbox</h1>
            <form class="login-form" action="./main.html">
                <div class="login-form__group">
                    <h3>Sign up</h3>
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
                    {{{Link class="link" text="Sign in" path="/"}}}
                </div>
            </form>
        </main>
        `;
  }
}
