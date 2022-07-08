import {Container} from "../models";
import ContainerComponent from "./ContainerComponent";

interface PlayingFieldComponentProps{
    playingField: Array<Container>
    setClickedContainer: (index: number)=>string;
    rerenderAllContainers: boolean;
}

export default function PlayingFieldComponent (props: PlayingFieldComponentProps) {

    return (
        <div className="playingfield">
            {
                props.playingField.map((c, i) => <ContainerComponent key={i} container={c} id={i} setClickedContainer={props.setClickedContainer} rerender={props.rerenderAllContainers}/>)
            }
        </div>
    )
}