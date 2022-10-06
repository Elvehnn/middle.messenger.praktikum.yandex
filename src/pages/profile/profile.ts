import Block from 'core/Block';
import './profile.scss';

export interface UserProps {
  title: string;
  data: string;
  type: string;
}

export interface ProfileProps {
  userData: UserProps[];
  onClick: () => void;
}

export default class Profile extends Block<ProfileProps> {
  static componentName: string = 'Profile';

  constructor({ userData }: ProfileProps) {
    super();
    this.setProps({
      userData,
      onClick: () => {
        window.location.pathname = './main';
      },
    });
  }
  render() {
    // language=hbs
    return `
        <main class="main">
            <div class='profile'>
              <div class="profile__aside">
                {{{ArrowRoundButton class="arrow" onClick=onClick}}}
              </div>
            
              <section class='profile__container'>
                 {{{ User userData=this.props }}}
              </section>
            </div>
        </main>
        `;
  }
}
