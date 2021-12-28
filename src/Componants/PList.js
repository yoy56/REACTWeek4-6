import React, {Component} from "react";
import { Pinfo } from "./PInfo";

const ptemp = [{Name: "Test",Type1: "Ground",Type2: null, Spec: "Diglett", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/50.png"}
,{Name: null,Type1: "Ghost",Type2: "Flying", Spec: "Drifblim", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/426.png"}]


export const Plist = (props) => {

    if (props.Plist[0] != 'null') {
        console.log('plist',props.Plist)
        return(
            <div className="Plist">
                <ul>
                    {props.Plist.map((e,i) => {
                        console.log('plist',i,e)
                        return(
                            <li key={i}>
                                <Pinfo Name={e.Name} Type1={e.Type1} Type2={e.Type2} Spec={e.Spec} setPartner={props.setPartner} img={e.img} lid={e.lid} removePoke={props.removePoke}/>
                            </li>
                        )
                    })}
                </ul>
            </div>
        ) 
    } else {
        return(
            <></>
        )
    }

    
}