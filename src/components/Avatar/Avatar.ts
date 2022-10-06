import Block from 'core/Block';
import './Avatar.scss';

type IncomingAvatarProps = {
  imageSrc: string;
  name: string;
  isEditable: boolean;
};

type AvatarProps = IncomingAvatarProps & {
  image?: HTMLImageElement;
};

export default class Avatar extends Block<AvatarProps> {
  static componentName: string = 'Avatar';

  constructor({ imageSrc, name, isEditable }: IncomingAvatarProps) {
    super({ imageSrc, name, isEditable });
  }

  render() {
    // language=hbs
    return `
		<div class='avatar'>
      {{#if isEditable}}
        {{{Link class='avatar__change' path='./changeUserAvatar' text='Change avatar'}}}
      {{/if}}
			
			<img src="{{imageSrc}}" class="user__image" alt="avatar" />
            
			<h3>{{name}}</h3>
		</div>
    `;
  }
}
