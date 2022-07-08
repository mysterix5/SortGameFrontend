import {Container} from "../models";
import ContainerComponent from "./ContainerComponent";
import {Box} from "@mui/material";

interface PlayingFieldComponentProps{
    playingField: Array<Container>
    setClickedContainer: (index: number)=>string;
    rerenderAllContainers: boolean;
}

export default function PlayingFieldComponent (props: PlayingFieldComponentProps) {

    return (
        <Box display={"flex"} flexDirection={"row"} border={"5px indigo solid"}>
            {
                props.playingField.map((c, i) => <ContainerComponent key={i} container={c} id={i} setClickedContainer={props.setClickedContainer} rerender={props.rerenderAllContainers}/>)
            }
        </Box>
    )
}