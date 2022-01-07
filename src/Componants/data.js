import { ItemsUses } from './ItemsUse';
import { AjaxApi } from "./Ajax";





class data {
    constructor(){
        this.wp = {};
        this.partner = {};
        this.bag = [];
        this.plist = {};

        this.tempBag = [];
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
        this.bag = [{...this.bag[0],PList: bag}];
        this.pushbag(this.bag);
    }

    pullbag = async () => {
        this.bag = await AjaxApi.getbag();
        this.bag[0].PList.map((e) => {
            e.Use = (function(){return(e.ITy == 'Status' ? ItemsUses.StatusItem(e.Ival) : e.ITy == 'Pokeball' ? ItemsUses.Pokeball(e.Ival) : console.error('Non Proper Use-Type:',e.ITy))})
        })
        return(this.bag);
    }

    pushbag = async (bag) => {
        delete bag[0]._id;
        await AjaxApi.setbag(bag[0]);
    }

    getplist(){
        return(this.plist)
    }

    setplist(plist){
        plist.map((e,i) => {
            e.lid = i
        })
        this.plist = plist;
        this.pushplist(plist);
    }

    pullplist = async () => {
        this.plist = await AjaxApi.getlist();
        this.plist[0].PList.map((e,i) => {
            e.lid = i
        })
        return(this.plist);
    }

    pushplist = async (plist) => {
        await AjaxApi.setlist(plist);
    }

    addItem(name,type,amount,use,bag){
        let idx
        let ele = bag.find((e,index) => {
            idx = index
            return e.Name == name
        });

        if (ele === undefined) {
            bag.push({Name:name,Use:use,Type:type,Amount: amount})
        } else {
            bag[idx].Amount += amount;
        }
    }

    bagReward(cr){
        let crAmount = 265 - cr;

        while (crAmount > 10) {
            if (crAmount > 15) {
                let ran = Math.floor(Math.random() * (7  - 1) + 1);
                switch (ran) {
                    case 1:
                        this.addItem('Freeze Powder','Battle',1,function(){return(ItemsUses.StatusItem('Freeze'))},this.tempBag);
                        crAmount -= 15;
                        break;
                    case 2:
                        this.addItem('Sleep Powder','Battle',1,function(){return(ItemsUses.StatusItem('Sleep'))},this.tempBag);
                        crAmount -= 15;
                        break;
                    default:
                        this.addItem('Ultraball','Battle',1,function(){return(ItemsUses.Pokeball(2))},this.tempBag);
                        crAmount -= 15;
                        break;
                }
            } 
            if (crAmount > 10) {
                let ran = Math.floor(Math.random() * (6  - 1) + 1);
                switch (ran) {
                    case 1:
                        //Paralysis
                        this.addItem('Paralysis Powder','Battle',1,function(){return(ItemsUses.StatusItem('Paralysis'))},this.tempBag);
                        crAmount -= 10;
                        break;
                    case 2:
                        //Burn
                        this.addItem('Burn Powder','Battle',1,function(){return(ItemsUses.StatusItem('Burn'))},this.tempBag);
                        crAmount -= 10;
                        break;
                    case 3: 
                        // poison
                        this.addItem('Poison Powder','Battle',1,function(){return(ItemsUses.StatusItem('Poison'))},this.tempBag);
                        break;
                    default:
                        // Great
                        this.addItem('Greatball','Battle',1,function(){return(ItemsUses.Pokeball(1.5))},this.tempBag);
                        crAmount -= 10;
                        break;
                }
            }
        }
        //Pokeball = crAmount
        this.addItem('Pokeball','Battle',crAmount,function(){return(ItemsUses.Pokeball(1))},this.tempBag);

        return this.tempBag

    }

// Capture Rate = (( 1 + 260 × CatchRate × BallRate × Status# ) ÷ 300 ) ÷ 256
// B = 1048560 ÷ √(√(16711680 ÷ Capture Rate))
// Freeze : 2
// Sleep : 2
// Paralysis : 1.5
// Burn : 1.5
// poison : 1.5
// None : 1

    calcCatch(multi){
        const statusrate = (this.wp.status === undefined ? 1 : this.wp.status === 'Freeze' || this.wp.status === 'Sleep' ? 2 : 1.5);
        let trTemp;
        if (this.partner === undefined) {
            trTemp = 1
        } else {
            trTemp = this.calcTypeRate(this.wp.Type1,this.partner.Type1);
            if (this.wp.Type2 !== null) {
                trTemp = trTemp * this.calcTypeRate(this.wp.Type2,this.partner.Type1);
            }
            if (this.partner.Type2 !== null) {
                trTemp = trTemp * this.calcTypeRate(this.wp.Type1,this.partner.Type2);
            }
            if (this.wp.Type2 !== null && this.partner.Type2 !== null) {
                trTemp = trTemp * this.calcTypeRate(this.wp.Type2,this.partner.Type2);
            }
        }
        
        const typerate = trTemp;
        const catrat = ((110 * this.wp.capture_rate * multi * statusrate * typerate ) / 300) / 256;
        const b = 1048560 / Math.sqrt(Math.sqrt(16711680 / catrat));
        let ran = (Math.random() * (65536  - 0) + 0);
        return(ran >= b ? false : true);
    }


    calcTypeRate(t1,t2){
        switch (t1) {
            case 'normal':
                switch (t2) {
                    case 'fighting':
                        return(2);
                    case 'ghost':
                        return(0.1);
                    default:
                        return(1);
                }
            case 'fire':
                switch (t2) {
                    case 'fire':
                        return(0.5)
                    case 'water':
                        return(2);
                    case 'grass':
                        return(0.5)
                    case 'ice':
                        return(0.5)
                    case 'ground':
                        return(2)
                    case 'bug':
                        return(0.5)
                    case 'rock':
                        return(2)
                    case 'steel':
                        return(0.5)
                    case 'fairy':
                        return(0.5)
                    default:
                        return(1);
                }
            case 'water':
                switch (t2) {
                    case 'fire':
                        return(0.5)
                    case 'water':
                        return(0.5)
                    case 'electric':
                        return(2)
                    case 'grass':
                        return(2)
                    case 'ice':
                        return(0.5)
                    case 'steel':
                        return(0.5)
                    default:
                        return(1);
                }
            case 'electric':
                switch (t2) {
                    case 'electric':
                        return(0.5)
                    case 'ground':
                        return(2)
                    case 'flying':
                        return(0.5)
                    case 'steel':
                        return(0.5)
                    default:
                        return(1);
                }
            case 'grass':
                switch (t2) {
                    case 'fire':
                        return(2)
                    case 'water':
                        return(0.5)
                    case 'electric':
                        return(0.5)
                    case 'grass':
                        return(0.5)
                    case 'ice':
                        return(2)
                    case 'poison':
                        return(2)
                    case 'ground':
                        return(0.5)
                    case 'flying':
                        return(2)
                    case 'bug':
                        return(2)
                    default:
                        return(1);
                }
            case 'ice':
                switch (t2) {
                    case 'Fire':
                        return(2)
                    case 'ice':
                        return(0.5)
                    case 'fighting':
                        return(2)
                    case 'rock':
                        return(2)
                    case 'steel':
                        return(2)
                    default:
                        return(1);
                }
            case 'fighting':
                switch (t2) {
                    case 'flying':
                        return(2)
                    case 'psychic':
                        return(2)
                    case 'bug':
                        return(0.5)
                    case 'rock':
                        return(0.5)
                    case 'dark':
                        return(0.5)
                    case 'fairy':
                        return(2)
                    default:
                        return(1);
                }
            case 'poison':
                switch (t2) {
                    case 'grass':
                        return(0.5)
                    case 'fighting':
                        return(0.5)
                    case 'poison':
                        return(0.5)
                    case 'ground':
                        return(2)
                    case 'psychic':
                        return(2)
                    case 'bug':
                        return(0.5)
                    case 'fairy':
                        return(2)
                    default:
                        return(1);
                }
            case 'ground':
                switch (t2) {
                    case 'water':
                        return(2)
                    case 'electric':
                        return(0.1)
                    case 'grass':
                        return(2)
                    case 'ice':
                        return(2)
                    case 'poison':
                        return(0.5)
                    case 'rock':
                        return(0.5)
                    default:
                        return(1);
                }
            case 'flying':
                switch (t2) {
                    case 'electric':
                        return(2)
                    case 'grass':
                        return(0.5)
                    case 'ice':
                        return(2)
                    case 'fighting':
                        return(0.5)
                    case 'ground':
                        return(0.1)
                    case 'bug':
                        return(0.5)
                    case 'rock':
                        return(2)
                    default:
                        return(1);
                }
            case 'psychic':
                switch (t2) {
                    case 'fighting':
                        return(0.5)
                    case 'psychic':
                        return(0.5)
                    case 'bug':
                        return(2)
                    case 'Ghost':
                        return(2)
                    case 'dark':
                        return(2)
                    default:
                        return(1);
                }
            case 'bug':
                switch (t2) {
                    case 'Fire':
                        return(2)
                    case 'grass':
                        return(0.5)
                    case 'fighting':
                        return(0.5)
                    case 'ground':
                        return(0.5)
                    case 'flying':
                        return(2)
                    case 'rock':
                        return(2)
                    default:
                        return(1);
                }
            case 'rock':
                switch (t2) {
                    case 'Normal':
                        return(0.5)
                    case 'Fire':
                        return(0.5)
                    case 'water':
                        return(2)
                    case 'grass':
                        return(2)
                    case 'fighting':
                        return(2)
                    case 'poison':
                        return(0.5)
                    case 'ground':
                        return(2)
                    case 'flying':
                        return(0.5)
                    case 'steel':
                        return(2)
                    default:
                        return(1);
                }
            case 'Ghost':
                switch (t2) {
                    case 'Normal':
                        return(0.1)
                    case 'fighting':
                        return(0.1)
                    case 'poison':
                        return(0.5)
                    case 'bug':
                        return(0.5)
                    case 'Ghost':
                        return(2)
                    case 'dark':
                        return(2)
                    default:
                        return(1);
                }
            case 'dragon':
                switch (t2) {
                    case 'Fire':
                        return(0.5)
                    case 'water':
                        return(0.5)
                    case 'electric':
                        return(0.5)
                    case 'grass':
                        return(0.5)
                    case 'ice':
                        return(2)
                    case 'dragon':
                        return(2)
                    case 'fairy':
                        return(2)
                    default:
                        return(1);
                }
            case 'dark':
                switch (t2) {
                    case 'fighting':
                        return(2)
                    case 'psychic':
                        return(0.1)
                    case 'bug':
                        return(2)
                    case 'Ghost':
                        return(0.5)
                    case 'dark':
                        return(0.5)
                    case 'fairy':
                        return(2)
                    default:
                        return(1);
                }
            case 'steel':
                switch (t2) {
                    case 'Normal':
                        return(0.5)
                    case 'Fire':
                        return(2)
                    case 'grass':
                        return(0.5)
                    case 'ice':
                        return(0.5)
                    case 'fighting':
                        return(2)
                    case 'poison':
                        return(0.1)
                    case 'ground':
                        return(2)
                    case 'flying':
                        return(0.5)
                    case 'psychic':
                        return(0.5)
                    case 'bug':
                        return(0.5)
                    case 'rock':
                        return(0.5)
                    case 'dragon':
                        return(0.5)
                    case 'steel':
                        return(0.5)
                    case 'fairy':
                        return(0.5)
                    default:
                        return(1);
                }
            case 'fairy':
                switch (t2) {
                    case 'fighting':
                        return(0.5)
                    case 'poison':
                        return(2)
                    case 'bug':
                        return(0.5)
                    case 'dragon':
                        return(0.1)
                    case 'dark':
                        return(0.5)
                    case 'steel':
                        return(2)
                    default:
                        return(1);
                }
            default:
                return(1);
        }
    }

}


export const dataCalc = new data();