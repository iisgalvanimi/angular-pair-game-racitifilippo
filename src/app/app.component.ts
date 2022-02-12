import { Component } from '@angular/core';
import * as math from 'mathjs';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-card-game';
  cards:{ cardID: number , status:string , path:string, check:boolean}[]=[ 
    { cardID:0 , status:'default' , path: './assets/default.png', check:false},
    { cardID:1 , status:'default' , path: './assets/default.png', check:false},
    { cardID:2 , status:'default' , path: './assets/default.png', check:false },
    { cardID:3 , status:'default' , path: './assets/default.png', check:false },
    { cardID:4 , status:'default' , path: './assets/default.png', check:false },
    { cardID:5 , status:'default' , path: './assets/default.png', check:false }
  ] 
  
  casCard:{coppia:number, carta:string}[] = [];
  contrCard = []
  punteggio:number = 0
  gira:number = 0
  cartaAdesso:number = 0
  giusto = false
  contr = false

  ngOnInit(): void {
    for (let i = 0; i < this.cards.length/2; i++) {
      this.contrCard.push(0)
      
    }
    
    for (let i of this.cards) {
      let loop = true;
      while (loop){
        let x:number = math.randomInt(0, this.cards.length/2)
        if (this.contrCard[x] != 2) {

          let numero: number = math.randomInt(0, 13)
          let tipo: number = math.randomInt(0, 4)

          let cartaTesto:string = "" + (numero+1)

          if (numero > 0 && numero < 10){
            cartaTesto = "" + (numero+1)
          }
          if (numero == 0){
            cartaTesto = "ace"
          }
          if (numero == 10){
            cartaTesto = "jack"
          }
          if (numero == 11){
            cartaTesto = "queen"
          }
          if (numero == 12){
            cartaTesto = "king"
          }

          console.log(numero)
          

          if (tipo == 0){
            cartaTesto += "_of_clubs.png"
          }
          if (tipo == 1){
            cartaTesto += "_of_diamonds.png"
          }
          if (tipo == 2){
            cartaTesto += "_of_hearts.png"
          }
          if (tipo == 3){
            cartaTesto += "_of_spades.png"
          }
          
          
          this.casCard.push({coppia: x, carta: cartaTesto})
          this.contrCard[x] += 1
          loop = false;
        }
      }

      for (let i = 0; i < this.casCard.length/2; i++){
        let cartaDopp:string = ""
        for (let ii of this.casCard){
          if (ii.coppia == i && cartaDopp == ""){
            cartaDopp = ii.carta
          }
          if (ii.coppia == i && cartaDopp != ""){
            ii.carta = cartaDopp
          }
        }
      }
      
    }

    console.log(this.casCard)
  }
  
  

  fromFiglioEvntHandlr( evntData: { cardID: number , status:string , path:string, check:boolean} ){

    

    if (this.gira == 0 || this.gira == 1){
      console.log("Sono il padre: dal figlio numero " + evntData.cardID+  " ho ricevuto status="+evntData.status )
      if (this.cards[evntData.cardID].status=='default') {
        this.cards[evntData.cardID].status='flipped'
        this.cards[evntData.cardID].path='./assets/' + this.casCard[evntData.cardID].carta
      } else {
        this.cards[evntData.cardID].status='default'
        this.cards[evntData.cardID].path='./assets/default.png'
      }
      

      if (this.gira == 0){
        this.cartaAdesso = this.casCard[evntData.cardID].coppia
      }
      if (this.gira == 1){
        if (this.casCard[evntData.cardID].coppia == this.cartaAdesso){
          this.giusto = true

          for (let i of this.cards){
            if(i.path == this.cards[evntData.cardID].path){
              i.check = true
              this.cards[evntData.cardID].check = true
            }
          }

          this.punteggio ++

          this.contr = true
          for (let i of this.cards){
            if (i.check == false){
              this.contr = false
            }
          }

          
          

        }else{
          this.giusto = false
        }
      }

      this.gira ++

    }
    if (this.gira == 2){
      if (this.giusto) {
        this.gira = 0
        setTimeout(()=>{
          if (this.contr) {
            alert("Hai vinto")
            for (let i of this.cards){
              i.status='default'
              i.path='./assets/default.png'
              i.check = false
              this.punteggio = 0
              this.gira = 0
              this.cartaAdesso = 0
              this.giusto = false
              this.contr = false
            }
          }
        },300)
      }else{
      setTimeout(()=>{
        for (let i of this.cards){
          if (i.check == false){
            i.status='default'
            i.path='./assets/default.png'
          }
        }
        this.gira = 0
      }, 800)
    }
      
    }
    
    
    console.log(evntData)
  }

  
}
