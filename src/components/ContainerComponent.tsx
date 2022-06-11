import {Container} from "../models";
import "./GamesOverview.css"
import ChickenComponent from "./ChickenComponent";

interface ContainerComponentProps {
    id: number;
    container: Container;
}

export default function ContainerComponent(props: ContainerComponentProps){

    function printId() {
        console.log("container id: " + props.id)
    }

    return (
        <div className="container" onClick={()=>printId()}>
            {
                props.container.colorList.map((c, i)=> <ChickenComponent key={i} color={c}/>)
            }
        </div>
    )
}