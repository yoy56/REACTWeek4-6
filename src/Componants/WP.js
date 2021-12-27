import React from "react";
import { dataCalc } from "./data";
import { Jsoninter } from "./JsonInterpret";

export class Wp extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            Wp: props.Wp
        }
    }

    componentDidMount = async() =>{
        const poke = await Jsoninter.Wgrab();
        this.setState({Wp: poke});
        dataCalc.setwp(poke);
    }

    render(){
        return(
            <div>
                <div>
                    {this.state.Wp.Name === null ? <h3>{this.state.Wp.Spec}</h3> : <div>
                        <h3>{this.state.Wp.Name}</h3>
                        <h6>{this.state.Wp.Spec}</h6>
                        </div>}
                    <img src={this.state.Wp.img}/>
                </div>
                <div>
                    <span>
                        <img src={`./Types/64px-${this.state.Wp.Type1}IC.png`}/>
                        {this.state.Wp.Type2 === null ? <></> : <img src={`./Types/64px-${this.state.Wp.Type2}IC.png`}/>}
                    </span>
                </div>
            </div>
    )}
}