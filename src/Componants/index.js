import React from "react";
import { Partner } from "./Partner";
import { Plist } from "./PList";

export default class Index extends React.Component {
    constructor(props){
        super(props);
        this.state={
            Partner: this.props.Partner
        }
        this.setPartner = this.setPartner.bind(this);
    }

    setPartner(poke){
        this.setState({Partner: poke});
    }

    render(){
        console.log('Ren',this.state.Partner)
        return(
            <div className='container'>
        <div className='row'>
          <div className='col'>
              {
                  this.state.Partner === undefined ? <>No Partner Set</> : <Partner Partner={this.state.Partner}/>
              }
          </div>
          <div className='col'>
            <Plist setPartner={this.setPartner}/>
          </div>
        </div>
      </div>
        )
    }
}