import React from "react";
import { ListGroup } from "react-bootstrap";
import { Item } from "./Item";


export class Bag extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Bag: this.props.Bag,
            Type: this.props.Type,
            np: this.props.np

        }
    }

    componentDidUpdate(){
        if (this.props.Bag.length != this.state.Bag.length) {
            this.setState({...this.state, Bag: this.props.Bag});
        }
    }


    render(){
        return(
            <div>
                <ListGroup>
                    {this.state.Bag.filter((item) => (this.state.Type == 'All' ? true : item.Type === this.state.Type)).map((item,index) => <ListGroup.Item key={`${index}`}><Item Item={item} Type={this.state.Type} updatenp={this.props.updatenp} Id={index}/></ListGroup.Item>)}
                </ListGroup>
            </div>
        )
    }
}