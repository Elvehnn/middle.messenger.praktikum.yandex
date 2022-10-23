import Block from 'core/Block';
import Router from 'core/Router';
import { getUserDataArray } from 'utils/getUserDataArray';
import { WithRouter } from 'utils/HOCS/WithRouter';
import { stringToCamelCase } from 'utils/stringToCamelCase';
import './User.scss';

export type UserProps = {
  router: Router;
  user: Nullable<UserType>;
  userData: Array<any>;
  navigateTo: (event: PointerEvent) => void;
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
        this.props.router.go(`/${stringToCamelCase(path)}`);
      },
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
						{{{Button class='action-item__title' path='./changeUserData' title='Change user data' onClick=navigateTo}}} 
					</div>
					<div class='action-item'>
            {{{Link class='action-item__title' path='./changeUserPassword' text='Change password'}}} 
					</div>
					<div class='action-item'>
            {{{Link class='action-item__title action-item__title_warning' path='/' text='Log out'}}} 
					</div>
				</div>
			</div>

        `;
  }
}

export default WithRouter(User);
