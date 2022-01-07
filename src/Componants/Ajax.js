


class item {
    constructor(PList){
        this.PList = PList;
        
    }
}

class Ajax {
    constructor(){
        this.urlBase = 'https://pokeapi.co/api/v2'
        this.urlid = 'a93ffbf420f24d0c914adca385964e3b'
        //Put CrudCrud id here ^
        this.pid = '';
        this.bid = '';
    }

    get = async (add) =>{
        try {
            const resp = await fetch(`${this.urlBase}/${add}`);
            const data = await resp.json();
            return(data);
        } catch (e) {
            console.log('Error',e);
        }
    }

    getlist = async () => {
        try {
            const resp = await fetch(`https://crudcrud.com/api/${this.urlid}/PList`,{
                method: 'GET'
            });
            const data = await resp.json();
            this.pid = data[0]._id;
            return(data);
        } catch (e) {
            console.log('Error',e);
        }
    } 

    setlist = async (list) => {
        try {
            const resp = await fetch(`https://crudcrud.com/api/${this.urlid}/PList/${this.pid}`,
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

    getbag = async () => {
        try {
            const resp = await fetch(`https://crudcrud.com/api/${this.urlid}/IBag`,{
                method: 'GET'
            });
            const data = await resp.json();
            this.bid = data[0]._id;
            return(data);
        } catch (e) {
            console.log('Error',e);
        }
    } 

    setbag = async (list) => {
        try {
            const resp = await fetch(`https://crudcrud.com/api/${this.urlid}/IBag/${this.bid}`,
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
        let test1 = await this.getlist();
        let test2 = await this.getbag();
        if (test1 === undefined) {
            let defvalp = new item([{ Id: 50, Name: "Test",Type1: "ground",Type2: null, Spec: "Diglett", capture_rate:255}
                ,{Id: 426, Name: null,Type1: "ghost",Type2: "flying", Spec: "Drifblim", capture_rate:60}]
            )
            try {
                const resp = await fetch(`https://crudcrud.com/api/${this.urlid}/PList`, 
                {method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // dataType: 'json',
                'dataType': 'json',
                body: JSON.stringify(defvalp)});
                return await resp.json();
            } catch (e) {
                console.log('Error',e);
            }

            

        }

        if (test2 === undefined) {
            let defvalb = new item([{Name:'Pokeball',Ival:1,ITy:'Pokeball',Type:'Battle',Amount: 10},
            {Name:'Greatball',Ival:1.5,ITy:'Pokeball',Type:'Battle',Amount: 5},
            {Name:'Ultraball',Ival:2,ITy:'Pokeball',Type:'Battle',Amount: 3},
            {Name: 'Sleep Powder',Ival:'Sleep',ITy:'Status',Type:'Battle',Amount: 1},
            {Name: 'Paralysis Powder',Ival:'Paralysis',ITy:'Status',Type:'Battle',Amount: 3},
            {Name: 'Poison Powder',Ival:'Poison',ITy:'Status',Type:'Battle',Amount: 3},
            {Name: 'Freeze Powder',Ival:'Freeze',ITy:'Status',Type:'Battle',Amount: 1},
            {Name: 'Burn Powder',Ival:'Burn',ITy:'Status',Type:'Battle',Amount: 3}]);
            try {
                const resp = await fetch(`https://crudcrud.com/api/${this.urlid}/IBag`, 
                {method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // dataType: 'json',
                'dataType': 'json',
                body: JSON.stringify(defvalb)});
                return await resp.json();
            } catch (e) {
                console.log('Error',e);
            }
        }
    }
        
}





export const AjaxApi = new Ajax();