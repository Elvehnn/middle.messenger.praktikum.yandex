import Block from 'core/Block';
import Router from 'core/Router';
import { WithRouter } from 'utils/HOCS/WithRouter';
import './Avatar.scss';

type AvatarProps = {
  router: Router;
  imageSrc: string;
  name: string;
  isEditable: boolean;
  image?: HTMLImageElement;
  showChangeAvatarForm: () => void;
};

class Avatar extends Block<AvatarProps> {
  static componentName = 'Avatar';

  constructor(props: AvatarProps) {
    super(props);

    this.setProps({
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

export default WithRouter(Avatar);
