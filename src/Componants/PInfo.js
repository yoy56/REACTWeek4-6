import React from "react";
import { Card } from "react-bootstrap";
import { dataCalc } from "./data";

export class Pinfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            poke: this.props.poke
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClickR = this.handleClickR.bind(this)
        this.act = false;
    }

    handleClick(e){
        e.preventDefault();
        this.props.setPartner(this.state.poke);
    }

    handleClickR(e){
        this.props.removePoke(this.state.poke);
    }

    componentDidUpdate(){
        
        if (this.state.poke.Spec != this.props.poke.Spec) {
            this.setState({
                poke: this.props.poke
            });
        }
    }

    render(){
        let Spec
        if (this.state.poke.Spec !== undefined) {
            Spec = this.state.poke.Spec.charAt(0).toUpperCase() + this.state.poke.Spec.slice(1);
        }
        return(
            <Card>
                <Card.Body>
                    <div>
                        {this.state.poke.Name === null ? <Card.Title>{Spec}</Card.Title> : <div>
                            <Card.Title>{this.state.poke.Name}</Card.Title>
                            <Card.Subtitle>{Spec}</Card.Subtitle>
                            </div>}
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.state.poke.Id}.png`}/>
                    </div>
                    <div>
                        <span>
                            <img src={`./Types/64px-${this.state.poke.Type1}IC.png`}/>
                            {this.state.poke.Type2 === null ? <></> : <img src={`./Types/64px-${this.state.poke.Type2}IC.png`}/>}
                        </span>
                    </div>
                    <Card.Footer>
                        {this.act = (dataCalc.getpartner() === undefined ? false : this.state.poke.lid == dataCalc.getpartner().lid)}
                        <button disabled={this.act} onClick={this.handleClick}>Partner</button>
                        <button disabled={this.act} onClick={this.handleClickR}>Release</button>
                    </Card.Footer> 
                </Card.Body>
            </Card>
        )
    }
}