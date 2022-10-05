import Block from 'core/Block';
import './profile.scss';

export interface UserProps {
  title: string;
  data: string;
  type: string;
}

export interface ProfileProps {
  userData: UserProps[];
}

export default class Profile extends Block<ProfileProps> {
  constructor({ userData }: ProfileProps) {
    super();
    this.setProps({
      userData,
    });
  }
  render() {
    // language=hbs
    return `
        <main class="main">
            <div class='profile'>
              <div class="profile__aside">
                {{{ArrowRoundButton path="./main.hbs" class="arrow"}}}
              </div>
            
              <section class='profile__container'>
                 {{{ User userData=this.props }}}
              </section>
            </div>
        </main>
        `;
  }
}
