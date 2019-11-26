import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  pokeApiUrl = 'https://pokeapi.co/api/v2';
  limitOffset = '?limit=50&offset=0';

  constructor( private _http: HttpClient ) { }

  getPokemons () {
    const data = this._http.get(`${this.pokeApiUrl}/pokemon${ this.limitOffset }`).toPromise();
    return data;
  }
  getPokemon ( item ) {
    const pokemon = this._http.get(item.url).toPromise();
    return pokemon;
  }
  getPokemonInfo ( id ) {
    return this._http.get(`${this.pokeApiUrl}/pokemon/${id }`)
        .pipe(map ( poke => {
          return poke;
        }));
  }
  getEvolutionChain ( id ) {
    return this._http.get(`${this.pokeApiUrl}/evolution-chain/${id }`)
        .pipe(map ( chain => {
          return chain;
        }));
  }
  getPokemonName( name ) {
    console.log(name.length);
    if ( name.length ) {
      return this._http.get(`${this.pokeApiUrl}/pokemon/${ name.toLowerCase() }`).toPromise();
    }
  }
  getPokemonTypes( type ) {
    console.log(type.length);
    if ( type.length ) {
      return this._http.get(`${this.pokeApiUrl}/type/${ type.toLowerCase() }${ this.limitOffset }`).toPromise();
    }
  }
  getpagination (url) {
    if ( url ){
      return this._http.get(url).toPromise();
    }
  }
}
