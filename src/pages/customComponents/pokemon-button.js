import { LitElement, html, css } from 'lit';

export class PokemonButton extends LitElement {
  static properties = {
    pokemon: { type: Array },
    tag: { type: String }
  };

  constructor() {
    super();
    this.pokemon = []; 
    this.tag = '';
  }

  render() {
    return html`
      <div class="pokemon-container">
        <a 
        href="#" 
        class="btn-primary" 
        @click="${ pokemon => this._clicked(pokemon)}">${this.tag}
        </a>
      </div>
    `;
  }

  _clicked(pokemon) {
    console.log('event in button')
    this.dispatchEvent(new CustomEvent('button-click', {
      detail: { pokemon },
      bubbles: true,
      composed: true
    }));
  }
  
  
  static styles = css`
  .btn-primary {
    display: inline-block;
    padding: 10px 15px;
    color: #fff;
    background-color: #e34043;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }

  .btn-primary:hover {
    background-color: #d13235;
  }
`;
}

customElements.define('pokemon-button', PokemonButton);