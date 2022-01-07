import { dataCalc } from "./data";



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