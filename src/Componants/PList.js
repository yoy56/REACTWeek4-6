import { ListGroup } from "react-bootstrap";
import { Pinfo } from "./PInfo";


export const Plist = (props) => {

    if (props.Plist[0] != undefined) {
        return(
            <div className="Plist">
                <ListGroup>
                    {props.Plist.map((e,i) => {
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