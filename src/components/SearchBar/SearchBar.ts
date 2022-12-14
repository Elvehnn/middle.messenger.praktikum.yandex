import Block from 'core/Block';
import { AnyProps } from 'core/RegisterComponent';
import './SearchBar.scss';

export default class SearchBar extends Block<AnyProps> {
  static componentName = 'SearchBar';

  render() {
    // language=hbs
    return `
        <form class='search'>
            <input name='search' placeholder='Search...' class='search__input' />
        
            <button type='submit' class='search__submit-button'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 450 450'><defs><style
                        >.cls-1{fill:#fff;}</style></defs><g id='Слой_2' data-name='Слой 2'><g
                            id='Layer_1'
                            data-name='Layer 1'
                        ><path
                                id='_Составной_контур_'
                                data-name='&lt;Составной контур&gt;'
                                class='cls-1'
                                d='M325.61,304.39,223.33,202.12a125.12,125.12,0,1,0-21.21,21.21L304.39,325.61a15,15,0,0,0,21.22-21.22ZM30,125a95,95,0,1,1,95,95A95.11,95.11,0,0,1,30,125Z'
                            ></path></g></g></svg>
        
            </button>
        </form>`;
  }
}
