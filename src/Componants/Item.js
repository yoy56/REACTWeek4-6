import React from "react";


export class Item extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Name: this.props.Item.Name,
            Use: this.props.Item.Use,
            np: this.props.np
        }
        this.handelClick = this.handelClick.bind(this);
    }

    handelClick = async() =>{
        let test = await this.state.Use();
        console.log(test);
        this.setState({...this.state,np: test});
    }

    render(){
        return(
            <div>
                <h5>{this.state.Name}</h5>
                <button onClick={this.handelClick}>Use</button>
            </div>
        )
    }
}