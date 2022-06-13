import {Container} from "../models";
import "./GamesOverview.css"
import ChickenComponent from "./ChickenComponent";
import { useEffect, useState } from "react";

interface ContainerComponentProps {
    id: number;
    container: Container;
    setClickedContainer: (index: number)=>void;
}

export default function ContainerComponent(props: ContainerComponentProps){

    const [rerender, setRerender] = useState(false);

    useEffect(()=>{
        console.log("container: " + props.container.colorList.length + "/" + props.container.height);
        for(let i = props.container.colorList.length; i<props.container.height; i++){
            props.container.colorList.push("WHITE")
        }
        setRerender(!rerender);
    }, [props.container])

    function containerClicked() {
        console.log("container id: " + props.id);
        props.setClickedContainer(props.id);
    }

    return (
        <div className="container" onClick={()=>containerClicked()}>
            {
                props.container.colorList.map(
                    (c, i)=> (
                    <ChickenComponent key={i} color={c} dummy={false}/> ))
            }
        </div>
    )
}