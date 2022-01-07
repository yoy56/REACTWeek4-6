import React, {Component} from "react";
import { ListGroup } from "react-bootstrap";
import { Pinfo } from "./PInfo";

const ptemp = [{Name: "Test",Type1: "Ground",Type2: null, Spec: "Diglett", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/50.png"}
,{Name: null,Type1: "Ghost",Type2: "Flying", Spec: "Drifblim", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/426.png"}]


export const Plist = (props) => {

    if (props.Plist[0] != undefined) {
        console.log('plist',props.Plist)
        return(
            <div className="Plist">
                <ListGroup>
                    {props.Plist.map((e,i) => {
                        console.log('plist',i,e)
                        return(
                            <ListGroup.Item key={i}>
                                <Pinfo poke={e} setPartner={props.setPartner} removePoke={props.removePoke}/>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </div>
        ) 
    } else {
        return(
            <></>
        )
    }

    
}