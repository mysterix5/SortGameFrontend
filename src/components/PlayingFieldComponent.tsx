import {Container} from "../models";
import ContainerComponent from "./ContainerComponent";

interface PlayingFieldComponentProps{
    playingField: Array<Container>
    setClickedContainer: (index: number)=>void
}

export default function PlayingFieldComponent (props: PlayingFieldComponentProps) {

    return (
        <div className="playingfield">
            {
                props.playingField.map((c, i) => <ContainerComponent key={i} container={c} id={i} setClickedContainer={props.setClickedContainer}/>)
            }
        </div>
    )
}