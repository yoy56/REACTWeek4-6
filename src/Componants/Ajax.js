

class Ajax {
    constructor(){
        this.urlBase = 'https://pokeapi.co/api/v2'
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
}




export const AjaxApi = new Ajax();