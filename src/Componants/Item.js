import React from "react";


export class Item extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Name: this.props.Item.Name,
            Use: this.props.Item.Use,
            Amount: this.props.Item.Amount
        }
        this.handelClick = this.handelClick.bind(this);
    }

    componentDidUpdate(){
        console.log('didupdate',this.state);
    }

    handelClick = async() =>{
        let test = await this.state.Use();
        console.log('test',test);
        this.props.updatenp(test);
        console.log('State',this.state);
    }

    render(){
        return(
            <div>
                <h5>{this.state.Name}-{this.state.Amount}</h5>
                <button onClick={this.handelClick}>Use</button>
            </div>
        )
    }
}