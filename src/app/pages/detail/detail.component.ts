import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../../services/pokeapi/pokeapi.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  idPokemon: number;
  pokemon: any;
  moves: any[];
  chain: any;
  evolutions: any[];

  constructor( private _pokeApi: PokeapiService, private _router: Router, private _route: ActivatedRoute) { 

    this._route.params.subscribe( params => {
      console.log(params);
      this.idPokemon = params['id'];

      this._pokeApi.getPokemonInfo(this.idPokemon)
          .subscribe( resp => {
            console.log(resp);
            this.pokemon = resp;
            this.moves = this.pokemon.moves;

            console.log(this.moves)
          });

      this._pokeApi.getEvolutionChain(this.idPokemon)
          .subscribe( resp => {
            console.log(resp);
            this.chain = resp;
            this.evolutions = this.chain.chain.evolves_to;

            if ( this.evolutions[0].evolves_to.length ) {
              this.evolutions.push(this.evolutions[0].evolves_to[0]);
            }

            console.log(this.evolutions)
          });
    });

  }

  ngOnInit() {
  }
}
