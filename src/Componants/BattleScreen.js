import React from "react";
import { Card } from "react-bootstrap";
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
        this.handleClick = this.handleClick.bind(this);
    }

    

    componentDidUpdate(){
        if (this.props.Wp != this.state.Wp){
            this.setState({...this.state, Wp: this.props.Wp})
        }
        if (this.props.Partner != this.state.Partner){
            this.setState({...this.state, Partner: this.props.Partner})
        }
        if (this.props.Bag.length != this.state.Bag.length){
            this.setState({...this.state, Bag: this.props.Bag})
        }
    }

    handleClick = async() =>{
        const poke = await Jsoninter.Wgrab();
        dataCalc.setwp(poke);
        this.props.updatenp(false);
    }

    render(){
        return(
            <div className="row">
                <div className="col">
                <Card>
                    <Card.Body>
                        <Wp Wp={this.state.Wp} />
                    </Card.Body>
                    <Card.Footer>
                        <button onClick={this.handleClick}>Find New Pokemon</button>
                    </Card.Footer>
                </Card>
                </div>
                <div className="col">
                    <Partner Partner={this.state.Partner}/>
                    <Bag Bag={this.state.Bag} Type='Battle' updatenp={this.props.updatenp}/>
                </div>
            </div>
        )
    }
}