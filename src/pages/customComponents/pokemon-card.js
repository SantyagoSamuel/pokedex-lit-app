import { LitElement, html, css } from 'lit';
import { PokemonButton } from './pokemon-button';

export class PokemonCard extends LitElement {
  static properties = {
    pokemon: { type: Array },
    buttonTag: { type: String }
  };

  constructor() {
    super();
    this.pokemon = []; 
    this.buttonTag = '';
  }

  render() {
    return html`
       <div class="card">
            <img src="${this.pokemon.image}" class="card-img-top" alt="${this.pokemon.name}">
            <div class="card-body">
                <h5 class="card-title">${this.pokemon.name}</h5>
                <p class="card-text">${this.pokemon.type}</p>
                <pokemon-button 
                .tag=${this.buttonTag}
                @button-click=${() => this._showEvolutions(this.pokemon)}>
                </pokemon-button>
            </div>
        </div>
    `;
  }

  _showEvolutions(pokemon) {
    this.dispatchEvent(new CustomEvent('show-evolutions', {
      detail: { pokemon },
      bubbles: true,
      composed: true
    }));
  }
  
  static styles = css`
    .card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 100%;
    max-width: 300px;
    text-align: center;
    padding: 15px 0;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
  }

  .card-img-top {
    box-sizing: border-box;
    width: 100%;
    height: 200px;  
    object-fit: contain;  
    object-position: center; 
    padding: 15px 15px 0 15px;
  }

  .card-body {
    padding: 0 15px 15px 15px;
  }

  .card-title {
    font-size: 1.25rem;
    margin: 10px;
    color: #333;
  }

  .card-text {
    font-size: 1rem;
    color: #666;
    margin-bottom: 15px;
  }
`;
}

customElements.define('pokemon-card', PokemonCard);