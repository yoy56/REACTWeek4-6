import React from "react";
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


    render(){
        return(
            <div>
                <ul>
                    {this.state.Bag.filter((item) => (item.Type === this.state.Type)).map((item,index) => <li key={`${index}`}><Item Item={item} np={this.state.np}/></li>)}
                </ul>
            </div>
        )
    }
}