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
            let cpoke = dataCalc.getwp();
            console.log(cpoke);
            console.log(dataCalc.getplist());
            dataCalc.getplist().push(cpoke);
            console.log(dataCalc.getplist());
            const poke = await Jsoninter.Wgrab();
            console.log(poke);
            dataCalc.setwp(poke);
            return(true)
        }
        console.log('fail');
        return(false)
        
    }

    StatusItem(Status){
        dataCalc.setwp(({...dataCalc.getwp(), status: Status}));
    }
}


export const ItemsUses = new ItemUse();