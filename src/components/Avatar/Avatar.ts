import Block from 'core/Block';
import Router from 'core/Router';
import { Store } from 'store/Store';
import { WithRouter } from 'utils/HOCS/WithRouter';
import { WithStore } from 'utils/HOCS/WithStore';
import './Avatar.scss';

type AvatarProps = {
  store: Store<AppState>;
  router: Router;
  imageSrc: string;
  name: string;
  isEditable: boolean;
  showChangeAvatarForm: () => void;
};

class Avatar extends Block<AvatarProps> {
  static componentName = 'Avatar';

  constructor(props: AvatarProps) {
    super(props);

    const { user } = this.props.store.getState();

    const { avatar, login } = user || {};

    this.setProps({
      imageSrc: avatar,
      name: login,
      showChangeAvatarForm: () => {
        document.querySelector('#changeAvatar')?.classList.add('form-container_shown');
      },
    });
  }

  render() {
    // language=hbs
    return `
		<div class='avatar'>
      {{#if isEditable}}
        {{{Button class='avatar__change' title='Change avatar' onClick=showChangeAvatarForm}}}
      {{/if}}
			
			<img src="{{imageSrc}}" class="avatar__image" alt="avatar" />
            
			<h3>{{name}}</h3>
		</div>
    `;
  }
}

export default WithStore(WithRouter(Avatar));
