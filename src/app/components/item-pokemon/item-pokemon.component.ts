import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-pokemon',
  templateUrl: './item-pokemon.component.html',
  styleUrls: ['./item-pokemon.component.scss']
})
export class ItemPokemonComponent implements OnInit {

  @Input() name: string;
  @Input() id: number;
  @Input() img: string;
  @Input() types: any[];

  constructor() { }

  ngOnInit() {
  }

}
