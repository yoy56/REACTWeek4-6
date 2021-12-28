import React from "react";

export class Pinfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: props.Name,
            Spec: props.Spec,
            Type1: props.Type1,
            Type2: props.Type2,
            img: props.img,
            lid: props.lid
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClickR = this.handleClickR.bind(this)
    }

    handleClick(e){
        e.preventDefault();
        console.log(this.props);
        this.props.setPartner({Name: this.state.Name,
            Spec: this.state.Spec,
            Type1: this.state.Type1,
            Type2: this.state.Type2,
            img: this.state.img,
            lid: this.state.lid});
    }

    handleClickR(e){
        this.props.removePoke({Name: this.state.Name,
            Spec: this.state.Spec,
            Type1: this.state.Type1,
            Type2: this.state.Type2,
            img: this.state.img,
            lid: this.state.lid});
    }

    componentDidUpdate(){
        
        if (this.state.Spec != this.props.Spec) {
            this.setState({
                Name: this.props.Name,
                Spec: this.props.Spec,
                Type1: this.props.Type1,
                Type2: this.props.Type2,
                img: this.props.img,
                lid: this.props.lid
            });
        }
    }

    render(){
        console.log('Pinfo',this.state.lid,this.state)
        return(
            <div>
                <div>
                    {this.state.Name === null ? <h3>{this.state.Spec}</h3> : <div>
                        <h3>{this.state.Name}</h3>
                        <h6>{this.state.Spec}</h6>
                        </div>}
                    <img src={this.state.img}/>
                </div>
                <div>
                    <span>
                        <img src={`./Types/64px-${this.state.Type1}IC.png`}/>
                        {this.state.Type2 === null ? <></> : <img src={`./Types/64px-${this.state.Type2}IC.png`}/>}
                    </span>
                </div>
                <button onClick={this.handleClick}>Partner</button>
                <button onClick={this.handleClickR}>Release</button>
            </div>
        )
    }
}