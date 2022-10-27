import Block from 'core/Block';
import Router from 'core/Router';
import { signout } from 'services/authorization';
import { Store } from 'store/Store';
import { getUserDataArray } from 'utils/getUserDataArray';
import { WithRouter } from 'utils/HOCS/WithRouter';
import { WithStore } from 'utils/HOCS/WithStore';
import { navigateTo } from 'utils/navigateTo';
import { stringToCamelCase } from 'utils/stringToCamelCase';
import './User.scss';

export type UserProps = {
  router: Router;
  store: Store<AppState>;
  user: Nullable<UserType>;
  userData: Array<any>;
  navigateTo: (event: PointerEvent) => void;
  signout: () => void;
};

class User extends Block<UserProps> {
  static componentName: string = 'User';
  userData: any;

  constructor(props: UserProps) {
    super(props);

    const data = props.user ? getUserDataArray(props.user) : [];

    this.setProps({
      userData: data,
      navigateTo: (event: PointerEvent) => {
        const path = (event.target as HTMLButtonElement).textContent || '';
        navigateTo(`${stringToCamelCase(path)}`);
      },
      signout: () => this.props.store.dispatch(signout),
    });
  }

  render() {
    // language=hbs
    return `
        <div class='user'>
				  {{{Avatar name="Vadim" imageSrc="./images/avatar_template.jpg" isEditable=true}}}

          <div class='user__data'>
					  {{#each userData}}
              {{#with this}}
                {{{UserDataItem title="{{title}}" data="{{data}}"}}}
              {{/with}}
            {{/each}}
				</div>

				<div class='user__actions'>
					<div class='action-item'>
						{{{Button class='action-item__title' title='Change user data' onClick=navigateTo}}} 
					</div>
					<div class='action-item'>
            {{{Button class='action-item__title' title='Change user password' onClick=navigateTo}}} 
					</div>
					<div class='action-item'>
            {{{Button class='action-item__title action-item__title_warning' title='Log out' onClick=signout}}} 
					</div>
				</div>
			</div>

        `;
  }
}

export default WithStore(WithRouter(User));
