import React from "react";
import { Badge, Card } from "react-bootstrap";
import { dataCalc } from "./data";


export class Item extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Name: props.Item.Name,
            Use: props.Item.Use,
            Amount: props.Item.Amount,
            Id: props.Id,
            Type: props.Type
        }
        this.handelClick = this.handelClick.bind(this);
        this.act = false;
    }


    handelClick = async() =>{
        let test = await this.state.Use();
        this.props.updatenp(test);
        this.setState({...this.state, Amount: this.state.Amount - 1})
        let tempbag = dataCalc.getbag()[0].PList;
        tempbag[this.state.Id].Amount = this.state.Amount;
        dataCalc.setbag(tempbag);
    }

    render(){
        return(
            <Card>
                <Card.Header>
                    <h5>{this.state.Name} <Badge pill bg="primary">x{this.state.Amount}</Badge></h5>
                </Card.Header>
                <Card.Body>
                    {this.act=(this.state.Amount == 0)}
                    {this.state.Type === 'All' ? <></> : <button disabled={this.act} onClick={this.handelClick}>Use</button>}
                </Card.Body>
            </Card>
        )
    }
}