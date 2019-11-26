import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../../services/pokeapi/pokeapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: any;
  result: any;
  pokemons: any = [];
  nextPage: any;
  prevPage: any;

  constructor( private _pokeApi: PokeapiService) { }

  ngOnInit() {
    this.allPokemons();
  }

  manipulateData (data) {
    this.data = data;
    this.prevPage = this.data.previous;
    this.nextPage = this.data.next;
    this.result = this.data.results;

    this.pokemons = [];

    this.result.forEach( pokemon => {
      this._pokeApi.getPokemon(pokemon)
        .then((poke) => {
          this.pokemons.push(poke);
        });
    });
  }

  allPokemons () {
    this._pokeApi.getPokemons()
        .then( (res) => {
          console.log(res)
          this.manipulateData (res);
        });
  }

  searchPokemon( terms: string ) {
    console.log( terms );
    this._pokeApi.getPokemonName(terms)
      .then( resp => {
        console.log(resp)
        this.pokemons = [];
        this.pokemons.push(resp);
      })
      .catch( err => {
        console.log(err);

        this._pokeApi.getPokemonTypes(terms)
            .then( res => {
              this.data = res;
              this.result = this.data.pokemon;
              this.pokemons = [];
              this.result.forEach( pokemon => {
                this._pokeApi.getPokemon(pokemon.pokemon)
                  .then((poke) => {
                    console.log(poke);
                    this.pokemons.push(poke);
                  });
              });
            });
      });
  }

  prev() {
      console.log(this.prevPage)
      this._pokeApi.getpagination(this.prevPage)
          .then( res => {
            console.log(res);
            this.manipulateData (res);
          });
  }
  next() {
    console.log(this.nextPage)
    this._pokeApi.getpagination(this.nextPage)
          .then( res => {
            console.log(res);
            this.manipulateData (res);
          });
  }

}
