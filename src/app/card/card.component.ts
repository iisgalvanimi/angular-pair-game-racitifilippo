import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {


  @Input()  cardData:{ cardID: number , status:string , path:string }
  @Output() fromFiglioEvnt = new EventEmitter<{ cardID: number , status:string , path:string }>();

  constructor() { }

  ngOnInit(): void {
    console.log("-----------------nuova istanza--------------------------")
  }

  flipCard() { 
    console.log("sono la carta "+this.cardData.cardID+" e cambio stato")
    // gestione dell'evento da inviare al padre
    this.fromFiglioEvnt.emit( this.cardData )
  }


}
