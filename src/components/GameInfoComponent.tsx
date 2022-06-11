import {GameInfo} from "../models";
import "./GamesOverview.css"
import PlayingFieldComponent from "./PlayingFieldComponent";

interface GameInfoProps {
    gameInfo: GameInfo;
}


export default function GameInfoComponent(props: GameInfoProps) {

    return (
        <div className="gameinfo">
            <div className="text">
                <p>
                Total cages: {props.gameInfo.totalContainers}
                <br/>
                Different colors: {props.gameInfo.colors}
                </p>
                <div>
                    {
                        <PlayingFieldComponent key="playingField" playingField={props.gameInfo.playingField}/>
                    }
                </div>
            </div>
        </div>
    )
}