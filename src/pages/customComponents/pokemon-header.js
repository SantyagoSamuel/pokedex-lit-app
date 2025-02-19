import { LitElement, html, css } from 'lit';

export class PokemonHeader extends LitElement {
  static properties = {
  };

  constructor() {
    super();
  }

  render() {
    return html`
    <header class="pokedex-header">
        <div class="pokedex-title">
            <p>Lit Pokedex</p>
        </div>
        <div class="pokedex-description">
            <p>A Lit Pokedex Demo Application</p>
        </div>
    </header>
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
  .pokedex-header {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: #fff;
    background-color: #e34043;
    display: flex;
    aling-items: center;
    justify-content: space-between;
  }
  .pokedex-title {
    margin-left: 50px;
    font-size: 1.6rem;
  }
  .pokedex-description {
    display: flex;
    align-items: center;
    margin-right: 50px;
  }

`;
}

customElements.define('pokemon-header', PokemonHeader);