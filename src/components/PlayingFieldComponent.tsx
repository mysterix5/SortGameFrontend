import {Container} from "../models";
import ContainerComponent from "./ContainerComponent";

interface PlayingFieldComponentProps{
    playingField: Array<Container>
}

export default function PlayingFieldComponent (props: PlayingFieldComponentProps) {

    return (
        <div className="playingfield">
            {
                props.playingField.map((c, i) => <ContainerComponent key={i} container={c} id={i}/>)
            }
        </div>
    )
}