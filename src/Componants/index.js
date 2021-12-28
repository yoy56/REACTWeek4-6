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
import { Modal } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { Wp } from "./WP";
import { Button, ModalBody, ModalDialog, ModalFooter, ModalTitle } from "react-bootstrap";
import { AjaxApi } from "./Ajax";

export default class Index extends React.Component {
    constructor(props){
        super(props);
        this.state={
            Partner: dataCalc.getpartner(),
            PList: ['null'],
            Bag: dataCalc.getbag(),
            Wp: dataCalc.getwp(),
            Show: false,
            NameChange: '',
            Dp: {}
        }
        this.setPartner = this.setPartner.bind(this);
        this.Home = this.Home.bind(this);
        this.Battle = this.Battle.bind(this);
        this.updatenp = this.updatenp.bind(this);
        this.handelChange = this.handelChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.setup = this.setup.bind(this); 
        this.removePoke = this.removePoke.bind(this);
    }

    setPartner(poke){
        dataCalc.setpartner(poke);
        this.setState({...this.state, Partner: poke});
    }

    newPoke() {
        

        console.log('np');
        this.setState({...this.state, Show: true})
        
    }

    updatenp(np){
        console.log('update2',this.state)
        if (np == true) {
            this.newPoke();
        }
    }

    removePoke(poke){
        console.log('rp');
        this.setState({...this.state, Show: true, Dp: poke})
    }

    handleClose = async (e) =>{

        let plistg = await dataCalc.getplist();
        let cpoke = dataCalc.getwp();
        if (e.target.id === "Yes" && this.state.NameChange != "") {
            cpoke.Name = this.state.NameChange;
        }
        cpoke.lid = plistg[0].PList.length
        console.log(cpoke);
        plistg[0].PList.push(cpoke);
        delete plistg[0]._id;
        delete plistg[0].lid;
        console.log(plistg[0]);
        await AjaxApi.setlist(plistg[0]);

        this.setState({...this.state,PList: plistg[0].PList});

        const npoke = await Jsoninter.Wgrab();
        console.log(npoke);
        dataCalc.setwp(npoke);
        let poke = dataCalc.getwp();
        
        console.log(poke);
        console.log('close');
        this.setState({...this.state, Show: false, Wp: poke, NameChange: ""})
    }

    handleCloser = async (e) =>{

        if (e.target.id === "No") {
            return false;
        } 

        console.log(this.state.Dp.lid,this.state.PList);
        this.state.PList.splice(this.state.Dp.lid,1);

        console.log('del', this.state.PList);

        await AjaxApi.setlist({PList: this.state.PList})
        
        console.log('close');
        this.setState({...this.state, Show: false, Dp: {}})
    }

    handelChange(e){
        this.setState({...this.state, NameChange: e.target.value});
    }

    componentDidUpdate = async () =>{
        // let plistg = await dataCalc.getplist();
        // if (this.state.PList != plistg) {
        //     console.log('update',this.state);
        //     console.log(plistg);
        //     this.setState({...this.state, PList: plistg})
        // }
    }

    componentDidMount = async() => {
        this.setup();
        console.log('mount',this.state);
        if (this.state.Wp.Spec === undefined) {
            const poke = await Jsoninter.Wgrab();
            if (this.state.Partner === undefined) {
                const par = await dataCalc.getplist()[0];
                this.setState({...this.state, Partner: par});
            }
            this.setState({...this.state, Wp: poke});
            dataCalc.setwp(poke);
            console.log('Mount',this.state)
        }
        
    }


    setup = async () => {
        //AjaxApi.setup();
        
        console.log(this.state.PList[0] == 'null');
        if (this.state.PList[0] == 'null') {
            console.log('setup',this.state);
            let Plistg = await dataCalc.getplist();
            console.log('list',Plistg[0].PList);
            this.setState({...this.state, PList: Plistg[0].PList});
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
                <Partner Partner={this.state.Partner}/>
          </div>
          <div className='col'>
                <Modal show={this.state.Show} onHide={this.handleClose}>
                    <ModalHeader>
                        <ModalTitle>
                        Release {this.state.Dp.Name === null ? this.state.Dp.Spec : this.state.Dp.Name}?
                        </ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col">
                                Are you Sure you want to Release {this.state.Dp.Name === null ? `your ${this.state.Dp.Spec}` : this.state.Dp.Name}?
                            </div>
                            <div className="col">
                                <Wp Wp={this.state.Dp}/>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                    <Button variant="secondary" onClick={this.handleCloser} id="No">
                        No
                    </Button>
                    <Button variant="primary" onClick={this.handleCloser} id="Yes">
                        Yes
                    </Button>
                    </ModalFooter>
                </Modal>
            <Plist setPartner={this.setPartner} Plist={this.state.PList} removePoke={this.removePoke}/>
          </div>
        </div>
        )
    }

    Battle(){
        return(
            <div>
                <Modal show={this.state.Show} onHide={this.handleClose}>
                    <ModalHeader>
                        <ModalTitle>
                            You Caught A Pokemon!
                        </ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col">
                                Would you like to Name your Pokemon?
                            </div>
                            <div className="col">
                                <Wp Wp={this.state.Wp}/>
                            </div>
                        </div>
                        <div className="row">
                            <input type='text' placeholder="Name" onChange={this.handelChange} value={this.state.NameChange}/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                    <Button variant="secondary" onClick={this.handleClose} id="No">
                        No
                    </Button>
                    <Button variant="primary" onClick={this.handleClose} id="Yes">
                        Yes
                    </Button>
                    </ModalFooter>
                </Modal>
                <BattleScreen Bag={dataCalc.getbag()} Wp={dataCalc.getwp()} Partner={dataCalc.getpartner()} updatenp={this.updatenp}/>
            </div>
        
        )
    }
}