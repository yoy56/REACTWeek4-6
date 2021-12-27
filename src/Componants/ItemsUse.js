import { BattleScreen } from "./BattleScreen";
import { dataCalc } from "./data";
import { Jsoninter } from "./JsonInterpret";
import { Wp } from "./WP";



class ItemUse {
    constructor(){

    }


    Pokeball = async(multi) =>{
        if (dataCalc.calcCatch(multi)) {
            console.log('catch');
            const poke = await Jsoninter.Wgrab();
            console.log(poke);
            dataCalc.setwp(poke);
            return(true)
        }
        console.log('fail');
        return(false)
        
    }
}


export const ItemsUses = new ItemUse();