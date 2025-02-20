import { LitElement, html, css } from 'lit';
import { PokemonButton } from '../customComponents/pokemon-button';
import { PokemonCard } from '../customComponents/pokemon-card';


export class PokemonListTemplate extends LitElement {
  static properties = {
    dataPokemon: { type: Array },
    buttonTag: { type: String}
  };

  constructor() {
    super();
    this.dataPokemon = [];
    this.buttonTag = 'Evolución';
  }

  render() {
    return html`
      <div class="pokemon-container">
        ${this.dataPokemon.length === 0
          ? html`<p>No hay pokemons para mostrar.</p>`
          : html`
              <div class="pokemon-grid">
                ${this.dataPokemon.pokemon.map(pokemon =>
                  html`
                    <div class="card-wrapper">
                      <pokemon-card 
                      .pokemon=${pokemon} 
                      .buttonTag=${this.buttonTag}
                      @click-button=${() => this._showEvolutions()}>
                      </pokemon-card>
                    </div>
                  `)}
              </div>
            `
        }
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
  .pokemon-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    text-align: center;
  }

  .pokemon-grid {
    display: grid;
    gap: 30px;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    width: 100%;
    max-width: 1200px;
    justify-items: center;
    padding-top: 20px;
  }

  .card-wrapper {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 100%;
    max-width: 300px;
    text-align: center;
  }
`;
}

customElements.define('pokemon-list-template', PokemonListTemplate);
