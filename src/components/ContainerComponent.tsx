import {Container} from "../models";
import "./GamesOverview.css"
import ChickenComponent from "./ChickenComponent";
import {useEffect, useState} from "react";
import {Box} from "@mui/material";

interface ContainerComponentProps {
    id: number;
    container: Container;
    setClickedContainer: (index: number)=>string;
    rerender: boolean;
}

export default function ContainerComponent(props: ContainerComponentProps){

    const [borderColor, setBorderColor] = useState('#000000');

    useEffect(()=>{
        setBorderColor('#000000')
    },[props.rerender]);

    function containerClicked() {
        console.log("container id: " + props.id);
        const clickOption = props.setClickedContainer(props.id);
        if(clickOption==="first"){
            setBorderColor("#EE70FF")
        }else if(clickOption==="cancelFirst"){
            setBorderColor("#000")
        }
    }

    function getDummyContainers() {
        let dummies = [];
        for(let i = props.container.colorList.length; i<props.container.height; i++){
            dummies.push(<ChickenComponent key={i} color="WHITE" dummy={true}/>);
        }
        return dummies;
    }

    return (
        <Box className="container" sx={{border: {borderColor}}} onClick={()=>containerClicked()}>
            {
                props.container.colorList.map(
                    (c, i)=> (
                    <ChickenComponent key={i} color={c} dummy={false}/> ))
            }
            {
                getDummyContainers()
            }
        </Box>
    )
}