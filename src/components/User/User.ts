import Block from 'core/Block';
import Router from 'core/Router';
import { signout } from 'services/authorization';
import { Store } from 'store/Store';
import { getUserDataArray } from 'utils/getUserDataArray';
import { WithRouter } from 'utils/HOCS/WithRouter';
import { WithStore } from 'utils/HOCS/WithStore';
import { stringToCamelCase } from 'utils/transformers/stringToCamelCase';
import './User.scss';

export type UserProps = {
  router: Router;
  store: Store<AppState>;
  user: Nullable<UserType>;
  userData: Array<any>;
  userLogin: string;
  avatarSrc: string;
  navigateTo: (event: PointerEvent) => void;
  signout: () => void;
  getAvatarSrc: (path: string) => void;
};

class User extends Block<UserProps> {
  static componentName: string = 'User';
  avatarSrc: string = '';

  constructor(props: UserProps) {
    super(props);

    const data = props.user ? getUserDataArray(props.user) : [];
    const userLogin = props.user?.login;

    this.setProps({
      userData: data,
      userLogin: userLogin,
      avatarSrc: this.props.store.getState().user?.avatar,
      navigateTo: (event: PointerEvent) => {
        const path = (event.target as HTMLButtonElement).textContent || '';
        this.props.router.go(`/${stringToCamelCase(path)}`);
      },
      signout: () => signout(this.props.store),
    });
  }

  render() {
    // language=hbs
    return `
        <div class='user' data-testid='user'>
				  {{{Avatar name=userLogin imageSrc=avatarSrc isEditable=true}}}

          <div class='user__data' data-testid='user-data'>
					  {{#each userData}}
              {{#with this}}
                {{{UserDataItem title="{{title}}" data="{{data}}"}}}
              {{/with}}
            {{/each}}
				</div>

				<div class='user__actions'>
					{{{Button class='button button_navigate' title='Change user data' 
            onClick=navigateTo type='button' dataTestid='change-user-data-btn'}}} 

			    {{{Button class='button button_navigate' title='Change user password' 
          onClick=navigateTo dataTestid='change-user-password-btn'}}} 
          
	        {{{Button class='button button_navigate action-item__title_warning' 
          title='Log out' onClick=signout dataTestid='signout-btn'}}} 
				</div>
			</div>

        `;
  }
}

export default WithStore(WithRouter(User));
