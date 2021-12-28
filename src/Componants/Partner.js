import React from "react";

export class Partner extends React.Component {
    constructor(props){
        super(props)
        this.state={
            Partner: props.Partner
        }
    }


    componentDidUpdate(){
        if (this.props.Partner != this.state.Partner){
            this.setState({Partner: this.props.Partner})
        }
    }

    render(){
            return(
                
                    this.state.Partner === undefined ? <>No Partner Set</> : <div>
                    <div>
                        {this.state.Partner.Name === null ? <h3>{this.state.Partner.Spec}</h3> : <div>
                            <h3>{this.state.Partner.Name}</h3>
                            <h6>{this.state.Partner.Spec}</h6>
                            </div>}
                        <img src={this.state.Partner.img}/>
                    </div>
                    <span>
                        <img src={`./Types/64px-${this.state.Partner.Type1}IC.png`}/>
                        {this.state.Partner.Type2 === null ? <></> : <img src={`./Types/64px-${this.state.Partner.Type2}IC.png`}/>}
                    </span>
                </div>
                
                
            )
    }
}