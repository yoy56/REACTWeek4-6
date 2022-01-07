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
import { Badge, Card, ListGroup, Modal, Nav, Navbar, NavItem } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { Wp } from "./WP";
import { Button, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { AjaxApi } from "./Ajax";
import { Bag } from "./Bag";

export default class Index extends React.Component {
    constructor(props){
        super(props);
        this.state={
            Partner: dataCalc.getpartner(),
            PList: [],
            Bag: [],
            Wp: {},
            Show: false,
            NameChange: '',
            Dp: {},
            Showb: false,
            Ab: []
        }
        this.setPartner = this.setPartner.bind(this);
        this.Home = this.Home.bind(this);
        this.Battle = this.Battle.bind(this);
        this.Baglist = this.Baglist.bind(this);
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
        

        this.setState({...this.state, Show: true})
        
    }

    updatenp(np){
        if (np == true) {
            this.newPoke();
        }
        this.setState({...this.state, Wp: dataCalc.getwp()})
    }

    removePoke(poke){
        this.setState({...this.state, Show: true, Dp: poke})
    }

    handleClose = async (e) =>{

        let plistg = await dataCalc.getplist();
        let cpoke = dataCalc.getwp();
        if (e !== undefined) {
            if (e.target.id === "Yes" && this.state.NameChange != "") {
                cpoke.Name = this.state.NameChange;
            }
        }
        cpoke.lid = plistg[0].PList.length
        plistg[0].PList.push(cpoke);
        delete plistg[0]._id;
        delete plistg[0].lid;
        await AjaxApi.setlist(plistg[0]);

        this.setState({...this.state,PList: plistg[0].PList});

        const npoke = await Jsoninter.Wgrab();
        dataCalc.setwp(npoke);
        let poke = dataCalc.getwp();
        
        this.setState({...this.state, Show: false, Wp: poke, NameChange: ""})
    }

    handleCloser = async (e) =>{

        if (e === undefined) {
            this.setState({...this.state, Show: false, Dp: {}})
            return false;
        }

        if (e.target.id !== "Yes") {
            this.setState({...this.state, Show: false, Dp: {}})
            return false;
        } 

        this.state.PList.splice(this.state.Dp.lid,1);

        await AjaxApi.setlist({PList: this.state.PList})

        let tempb = dataCalc.bagReward(this.state.Dp.capture_rate);
        
        this.setState({...this.state, Show: false, Dp: {}, Showb: true, Ab: tempb})
    }

    handleCloseb = async (e)=>{
        let tempbag = [...dataCalc.getbag()[0].PList];
        this.state.Ab.forEach(el => {
            dataCalc.addItem(el.Name,el.Type,el.Amount,el.Use,tempbag);
        });
        dataCalc.setbag(tempbag);
        this.setState({...this.state, Showb: false, Ab: [], Bag: tempbag});
    }

    handelChange(e){
        this.setState({...this.state, NameChange: e.target.value});
    }

   

    componentDidMount = async() => {
        this.setup();
        
        
    }


    setup = async () => {
        await AjaxApi.setup();
        if (this.state.PList[0] == undefined) {
            let Plistg = await dataCalc.pullplist();
            let Bagg = await dataCalc.pullbag();
            this.setState({...this.state, PList: Plistg[0].PList, Bag: Bagg[0].PList});
        }


        if (this.state.Wp.Spec === undefined) {
            const poke = await Jsoninter.Wgrab();
            this.setState({...this.state, Wp: poke});
            dataCalc.setwp(poke);
        }
        if (this.state.Partner.Spec === undefined) {
            const par = dataCalc.getplist();
            this.setPartner(par[0].PList[0])
        }
    }

    render(){
        return(

            <Router>
                <div>
                <Navbar>
                    <Nav>
                        <NavItem eventkey={1} href="/">
                        <Nav.Link as={Link} to="/" >Pokemon</Nav.Link>
                        </NavItem>
                    </Nav>
                    <Nav>
                        <NavItem eventkey={1} href="/">
                        <Nav.Link as={Link} to="/battle" >Battle</Nav.Link>
                        </NavItem>
                    </Nav>
                    <Nav>
                        <NavItem eventkey={1} href="/">
                        <Nav.Link as={Link} to="/bag" >Bag</Nav.Link>
                        </NavItem>
                    </Nav>
                </Navbar>
                </div>
                <div>
                <Switch>
                    <Route exact path="/">
                        <this.Home/>
                    </Route>
                    <Route path="/battle">
                        <this.Battle />
                    </Route>
                    <Route path="/bag">
                        <this.Baglist />
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
                <Modal show={this.state.Show} onHide={this.handleCloser}>
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
                <Modal show={this.state.Showb} onHide={this.handleCloseb}>
                    <ModalHeader>
                        <ModalTitle>
                        Bag
                        </ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col">
                                New Items:
                            </div>
                            <div className="col">
                                {this.state.Ab.map((item,index) => <ListGroup.Item key={`${index}`}>
                                <Card>
                                    <Card.Header>
                                        <h5>{item.Name} <Badge pill bg="primary">x{item.Amount}</Badge></h5>
                                    </Card.Header>
                                </Card>
                                </ListGroup.Item>)}
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                    <Button variant="primary" onClick={this.handleCloseb} id="OK">
                        OK
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
                <BattleScreen Bag={this.state.Bag} Wp={this.state.Wp} Partner={this.state.Partner} updatenp={this.updatenp}/>
            </div>
        
        )
    }

    Baglist(){
        return(
            <div>
                <Bag Type='All' Bag={this.state.Bag}/>
            </div>
        )
    }
}