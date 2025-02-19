import { LitElement, html, css } from 'lit';
import { PokemonHeader } from './pages/customComponents/pokemon-header';
import { PokemonListTemplate } from './pages/pokemon-list-template';
import { PokemonEvolutionsTemplate } from './pages/pokemon-evolutions-template';
import { PokemonEditTemplate } from './pages/pokemon-edit-template';
import { pokemonManager } from './data-manager/data-manager';

class MyElement extends LitElement {
  static properties = {
    pokemon: { type: Array },
    showingEvolutions: { type: Boolean },
    currentPokemon: { type: Object },
    isEditing: { type: Boolean },
    evolutionToEdit: { type: Object }
  };

  constructor() {
    super();
    this.pokemon = [];
    this.showingEvolutions = false;
    this.isEditing = false;
    this.currentPokemon = {};
    this.evolutionToEdit = null;
  }

  async firstUpdated() {
    this.pokemon = await pokemonManager.fetchPokemon();
  }

  render() {
    return html`
      <pokemon-header></pokemon-header>
      <div class="template-container">
      ${this.showingEvolutions
        ? this.isEditing
          ? html`<pokemon-edit-template .evolution="${this.evolutionToEdit}" @save-edit="${this._saveEdit}" @cancel-edit="${this._cancelEdit}"></pokemon-edit-template>`
          : html`
          <pokemon-evolutions-template 
          .evolutions="${this.currentPokemon.evolutions || []}" 
          @go-back="${this._goBackToList}" 
          @edit-evolution="${this._editEvolution}">
          </pokemon-evolutions-template>`
        : html`
        <pokemon-list-template 
        .dataPokemon="${this.pokemon}" 
        @show-evolutions="${this._showEvolutions}">
        </pokemon-list-template>`
      }
      </div>
      
    `;
  }
  
  _showEvolutions(e) {
    this.currentPokemon = e.detail.pokemon;
    this.showingEvolutions = true;
    this.requestUpdate();
  }
  
  _goBackToList() {
    this.showingEvolutions = false;
    this.requestUpdate();
  }

  _editEvolution(e) {
    this.evolutionToEdit = e.detail.evolution;
    this.isEditing = true;
  }
  
  _saveEdit(e) {
    const editedEvolution = e.detail.evolution;
    const index = this.currentPokemon.evolutions.findIndex(ev => ev.name === editedEvolution.name);
    if (index !== -1) {
      this.currentPokemon.evolutions[index] = editedEvolution;
    }
    this.isEditing = false;
  }

  _cancelEdit() {
    this.isEditing = false;
  }
  
  static styles = css`
    .template-container {
      padding: 40px;
    }
`;
}


customElements.define('my-element', MyElement);