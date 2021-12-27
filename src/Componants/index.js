import React from "react";
import { Partner } from "./Partner";
import { Plist } from "./PList";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { dataCalc } from "./data";
import { BattleScreen } from "./BattleScreen";
import { Jsoninter } from "./JsonInterpret";

export default class Index extends React.Component {
    constructor(props){
        super(props);
        this.state={
            Partner: this.props.Partner,
            PList: this.props.PList,
            Bag: this.props.Bag,
            Wp: this.props.Wp
        }
        this.setPartner = this.setPartner.bind(this);
        this.Home = this.Home.bind(this);
        this.Battle = this.Battle.bind(this);
        this.updatenp = this.updatenp.bind(this);
    }

    setPartner(poke){
        dataCalc.setpartner(poke);
        this.setState({...this.state, Partner: poke});
    }

    newPoke = async() => {
        console.log('np');
        let poke = await dataCalc.getwp();
        console.log(poke);
        this.setState({...this.state, Wp: poke})
    }

    updatenp(np){
        console.log('update2',this.state)
        if (np == true) {
            this.newPoke();
        }
    }

    componentDidUpdate(){
        if (this.state.PList != dataCalc.getplist()) {
            console.log('update',this.state);
            console.log(dataCalc.getplist());
            //this.setState({...this.state, PList: dataCalc.getplist()})
        }
    }

    componentDidMount = async() => {
        console.log('mount',this.state);
        if (this.state.Wp.Spec === undefined) {
            const poke = await Jsoninter.Wgrab();
            this.setState({...this.state, Wp: poke});
            dataCalc.setwp(poke);
            console.log('Mount',this.state)
        }
    }

    render(){
        console.log('Ren',this.state)
        return(
            <Router>
                <div className='container'>
                    <div>
                        <ul>
                            <li>
                                <Link to="/">Pokemon</Link>
                            </li>
                            <li>
                                <Link to="/battle">Battle</Link>
                            </li>
                        </ul>
                    </div>
                    <Switch>
                        <Route exact path="/">
                            <this.Home/>
                        </Route>
                        <Route path="/battle">
                            <this.Battle />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }

    Home(){
        return(
        <div className='row'>
          <div className='col'>
              {
                  this.state.Partner === undefined ? <>No Partner Set</> : <Partner Partner={this.state.Partner}/>
              }
          </div>
          <div className='col'>
            <Plist setPartner={this.setPartner} Plist={this.state.PList}/>
          </div>
        </div>
        )
    }

    Battle(){
        return(
        <BattleScreen Bag={dataCalc.getbag()} Wp={dataCalc.getwp()} Partner={dataCalc.getpartner()} updatenp={this.updatenp}/>
        )
    }
}