import React from "react";
import { Bag } from "./Bag";
import { dataCalc } from "./data";
import { Jsoninter } from "./JsonInterpret";
import { Partner } from "./Partner";
import { Wp } from "./WP";

export class BattleScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Wp: props.Wp,
            Partner: props.Partner,
            Bag: props.Bag
        }
        this.updatenp = this.updatenp.bind(this);
    }

    newPoke = async() => {
        console.log('np');
        let poke = await dataCalc.getwp();
        console.log(poke);
        this.setState({...this.state, Wp: poke})
    }

    updatenp(np){
        console.log('update2',this.state)
        if (np == true) {
            this.newPoke();
        }
    }

    componentDidUpdate(){
        console.log('Update',this.state)
    }

    componentDidMount = async() =>{
        const poke = await Jsoninter.Wgrab();
        this.setState({Wp: poke});
        dataCalc.setwp(poke);
        console.log('Mount',this.state)
    }

    render(){
        return(
            <div className="row">
                <div className="col">
                    <Wp Wp={this.state.Wp} />
                </div>
                <div className="col">
                    <Partner Partner={this.state.Partner}/>
                    <Bag Bag={this.state.Bag} Type='Battle' updatenp={this.updatenp}/>
                </div>
            </div>
        )
    }
}