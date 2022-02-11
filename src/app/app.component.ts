import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-card-game';
  cards:{ cardID: number , status:string , path:string }[]=[ 
    { cardID:0 , status:'default' , path: './assets/default.png' },
    { cardID:1 , status:'default' , path: './assets/default.png' },
  ] 
 

  fromFiglioEvntHandlr( evntData: { cardID: number , status:string , path:string } ){

    console.log("Sono il padre: dal figlio numero " + evntData.cardID+  " ho ricevuto status="+evntData.status )
    if (this.cards[evntData.cardID].status=='default') {
      this.cards[evntData.cardID].status='flipped'
      this.cards[evntData.cardID].path='./assets/3cuori.png'
    } else {
      this.cards[evntData.cardID].status='default'
      this.cards[evntData.cardID].path='./assets/default.png'
    }
    
    console.log(evntData)
  }
}
