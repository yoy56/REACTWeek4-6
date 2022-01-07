import { AjaxApi } from "./Ajax";


class JsonInterpret {
    constructor(){

    }

    pokegrab = async(name) => {
        const data = await AjaxApi.get(name);
        let poke = {Id: data.id, Name: null,Type1: data.types[0].type.name,Type2: data.types.length == 1 ? null : data.types[1].type.name, Spec: data.species.name}
        return(poke);
    }

    Wgrab = async() =>{
        let ran = Math.floor(Math.random() * (899 - 1) + 1)
        const data = await AjaxApi.get(`pokemon/${ran}`);
        const data2 = await AjaxApi.get(`pokemon-species/${ran}`);
        let poke = {Id: data.id, Name: null,Type1: data.types[0].type.name,Type2: data.types.length == 1 ? null : data.types[1].type.name, Spec: data.species.name, capture_rate: data2.capture_rate}
        return(poke);
    }
}


export const Jsoninter = new JsonInterpret();