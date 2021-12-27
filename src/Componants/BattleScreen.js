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
            Wp: this.props.Wp,
            Partner: this.props.Partner,
            Bag: this.props.Bag
        }
        this.handleClick = this.handleClick.bind(this);
    }

    

    componentDidUpdate(){
        console.log('Update',this.state);
        if (this.props.Wp != this.state.Wp){
            this.setState({Wp: this.props.Wp})
        }
    }

    componentDidMount = async() =>{
        // const poke = await Jsoninter.Wgrab();
        // this.setState({Wp: poke});
        // dataCalc.setwp(poke);
        console.log('Mount',this.state)
    }

    handleClick = async() =>{
        console.log('new');
        const poke = await Jsoninter.Wgrab();
        console.log(poke);
        dataCalc.setwp(poke);
        this.props.updatenp(true);
    }

    render(){
        return(
            <div className="row">
                <div className="col">
                    <Wp Wp={this.state.Wp} />
                    <button onClick={this.handleClick}>Find New Pokemon</button>
                </div>
                <div className="col">
                    <Partner Partner={this.state.Partner}/>
                    <Bag Bag={this.state.Bag} Type='Battle' updatenp={this.props.updatenp}/>
                </div>
            </div>
        )
    }
}