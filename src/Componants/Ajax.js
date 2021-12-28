

class item {
    constructor(PList){
        this.PList = PList;
    }
}

class Ajax {
    constructor(){
        this.urlBase = 'https://pokeapi.co/api/v2'
        this.urlid = '425410022e87455189faeb0e1b0d9d2c'
    }

    get = async (add) =>{
        console.log(`${this.urlBase}/${add}`)
        try {
            const resp = await fetch(`${this.urlBase}/${add}`);
            const data = await resp.json();
            return(data);
        } catch (e) {
            console.log('Error',e);
        }
    }

    getlist = async () => {
        console.log(`https://crudcrud.com/api/${this.urlid}/PList`)
        try {
            const resp = await fetch(`https://crudcrud.com/api/${this.urlid}/PList`,{
                method: 'GET'
            });
            const data = await resp.json();
            return(data);
        } catch (e) {
            console.log('Error',e);
        }
    } 

    setlist = async (list) => {
        console.log(`https://crudcrud.com/api/${this.urlid}/PList`,list)
        try {
            const resp = await fetch(`https://crudcrud.com/api/${this.urlid}/PList/61cb71e497069d03e8492fc3`, 
            {method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(list)});
            return await resp.json();
        } catch (e) {
            console.log('Error',e);
        }
    } 

    setup = async () =>{
        let defval = new item([{ Id: 50, Name: "Test",Type1: "ground",Type2: null, Spec: "Diglett", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/50.png"}
            ,{Id: 426, Name: null,Type1: "ghost",Type2: "flying", Spec: "Drifblim", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/426.png"}]
        )

        try {
            const resp = await fetch(`https://crudcrud.com/api/${this.urlid}/PList`, 
            {method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // dataType: 'json',
            'dataType': 'json',
            body: JSON.stringify(defval)});
            return await resp.json();
        } catch (e) {
            console.log('Error',e);
        }

    }
}





export const AjaxApi = new Ajax();