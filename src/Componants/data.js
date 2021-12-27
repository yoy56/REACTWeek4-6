import { Jsoninter } from "./JsonInterpret";
import { ItemsUses } from './ItemsUse';





class data {
    constructor(){
        this.wp = {};
        this.partner = {Name: "Test",Type1: "Ground",Type2: null, Spec: "Diglett", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/50.png"};
        this.bag = [{Name:'TestItem',Use:(function(){console.log('Click')}),Type:'Battle',Amount: 5},{Name:'Pokeball',Use:(function(){return(ItemsUses.Pokeball(1))}),Type:'Battle',Amount: 5},{Name:'Ultraball',Use:(function(){return(ItemsUses.Pokeball(2))}),Type:'Battle',Amount: 5}];
    }

    getwp(){
        return(this.wp);
    }

    setwp(wp){
        this.wp = wp;
    }

    getpartner(){
        return(this.partner);
    }

    setpartner(partner){
        this.partner = partner;
    }

    getbag(){
        return(this.bag);
    }

    setbag(bag){
        this.bag = bag;
    }

// Capture Rate = (( 1 + 260 × CatchRate × BallRate × Status# ) ÷ 300 ) ÷ 256
// B = 1048560 ÷ √(√(16711680 ÷ Capture Rate))

    calcCatch(multi){
        const catrat = ((1 + 260 * this.wp.capture_rate * multi * 1 ) / 300) / 256
        const b = 1048560 / Math.sqrt(Math.sqrt(16711680 / catrat));
        let ran = (Math.random() * (65536  - 0) + 0);
        return(ran >= b ? false : true)
    }

}


export const dataCalc = new data();