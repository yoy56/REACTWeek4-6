import React from "react";
import { Bag } from "./Bag";
import { dataCalc } from "./data";
import { Partner } from "./Partner";
import { Wp } from "./WP";

export class BattleScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Wp: props.Wp,
            Partner: props.Partner,
            Bag: props.Bag,
            np: false
        }
    }

    newPoke = async() => {
        console.log('np');
        let poke = await dataCalc.getwp();
        console.log(poke);
        this.setState({...this.state, Wp: poke})
    }

    componentDidUpdate(){
        if (this.state.np == true) {
            this.newPoke();
            this.setState({...this.state,np: false})
        }
    }

    render(){
        return(
            <div className="row">
                <div className="col">
                    <Wp Wp={this.state.Wp} />
                </div>
                <div className="col">
                    <Partner Partner={this.state.Partner}/>
                    <Bag Bag={this.state.Bag} Type='Battle' np={this.state.np}/>
                </div>
            </div>
        )
    }
}