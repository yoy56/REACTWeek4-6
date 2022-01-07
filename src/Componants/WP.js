import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { dataCalc } from "./data";
import { Jsoninter } from "./JsonInterpret";

export class Wp extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            Wp: this.props.Wp
        }
    }

    componentDidUpdate(){
        if (this.props.Wp.Spec != this.state.Wp.Spec){
            this.setState({Wp: this.props.Wp})
        }
    }

    render(){
        let Spec
        if (this.state.Wp.Spec !== undefined) {
            Spec = this.state.Wp.Spec.charAt(0).toUpperCase() + this.state.Wp.Spec.slice(1);
        }
        return(
                <div>
                     <div>
                        {this.state.Wp.Name === null ? <Card.Title>{Spec}</Card.Title> : <div>
                            <Card.Title>{this.state.Wp.Name}</Card.Title>
                            <Card.Subtitle>{Spec}</Card.Subtitle>
                            </div>}
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.state.Wp.Id}.png`}/>
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