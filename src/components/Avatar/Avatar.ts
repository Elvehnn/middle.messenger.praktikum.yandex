import Block from 'core/Block';
import './Avatar.scss';

type IncomingAvatarProps = {
  imageSrc: string;
  name: string;
};

type AvatarProps = IncomingAvatarProps & {
  image?: HTMLImageElement;
};

export default class Avatar extends Block<AvatarProps> {
  constructor({ imageSrc, name }: IncomingAvatarProps) {
    super({ imageSrc, name });
  }

  render() {
    // language=hbs
    return `
		<div class='avatar'>
			{{{Link class='avatar__change' path='./changeUserAvatar.hbs' text='Change avatar'}}}

			<img style="background: url('{{imageSrc}}') no-repeat center center;" class="user__image" alt="avatar" />
            
			<h3>{{name}}</h3>
		</div>
    `;
  }
}
