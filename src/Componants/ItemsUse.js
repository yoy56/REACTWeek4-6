import { BattleScreen } from "./BattleScreen";
import { dataCalc } from "./data";
import { Jsoninter } from "./JsonInterpret";
import { Wp } from "./WP";



class ItemUse {
    constructor(){

    }


    Pokeball = async(multi) =>{
        if (dataCalc.calcCatch(multi)) {
            return(true)
        }
        return(false)
        
    }

    StatusItem(Status){
        dataCalc.setwp(({...dataCalc.getwp(), status: Status}));
    }
}


export const ItemsUses = new ItemUse();