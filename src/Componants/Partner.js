import React from "react";
import { Card } from "react-bootstrap";

export class Partner extends React.Component {
    constructor(props){
        super(props)
        this.state={
            Partner: props.Partner
        }
    }


    componentDidUpdate(){
        console.log('PUpdate',this.props.Partner)
        if (this.props.Partner != this.state.Partner){
            console.log(this.props.Partner,this.state.Partner)
            this.setState({Partner: this.props.Partner})
        }
    }

    render(){
        let Spec
        if (this.state.Partner.Spec !== undefined) {
            Spec = this.state.Partner.Spec.charAt(0).toUpperCase() + this.state.Partner.Spec.slice(1);
        }
            return(
                
                this.state.Partner === undefined ? <>Loading...</> : 
                <Card>
                    <Card.Body>
                        <div>
                            {this.state.Partner.Name === null ? <Card.Title>{Spec}</Card.Title> : <div>
                                <Card.Title>{this.state.Partner.Name}</Card.Title>
                                <Card.Subtitle>{Spec}</Card.Subtitle>
                                </div>}
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.state.Partner.Id}.png`}/>
                        </div>
                        <span>
                            <img src={`./Types/64px-${this.state.Partner.Type1}IC.png`}/>
                            {this.state.Partner.Type2 === null ? <></> : <img src={`./Types/64px-${this.state.Partner.Type2}IC.png`}/>}
                        </span>
                    </Card.Body>
                </Card>
                
                
            )
    }
}