import {Container} from "../models";
import ChickenComponent from "./ChickenComponent";
import {useEffect, useState} from "react";
import {Box} from "@mui/material";

interface ContainerComponentProps {
    id: number;
    container: Container;
    setClickedContainer: (index: number)=>string;
    rerender: boolean;
}

const borderResetColor = '#3e972a'

export default function ContainerComponent(props: ContainerComponentProps){

    const [borderColor, setBorderColor] = useState(borderResetColor);

    useEffect(()=>{
        setBorderColor(borderResetColor)
    },[props.rerender]);

    function containerClicked() {
        console.log("container id: " + props.id);
        const clickOption = props.setClickedContainer(props.id);
        if(clickOption==="first"){
            setBorderColor("#EE70FF")
        }else if(clickOption==="cancelFirst"){
            setBorderColor(borderResetColor)
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
        <Box display={"flex"} flexDirection={"column-reverse"} minWidth={"30px"} border={`${borderColor} solid`} onClick={()=>containerClicked()}>
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