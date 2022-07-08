import {useEffect, useState } from "react";
import {Game} from "../models";
import "./GamesOverview.css"
import PlayingFieldComponent from "./PlayingFieldComponent";


interface GameProps {
    id: string;
}

export default function GameComponent(props: GameProps) {

    const [game, setGame] = useState<Game>();
    const [containerFrom, setContainerFrom] = useState<number>(-1);

    const [rerenderAllContainers, setRerenderAllContainers] = useState(false);

    useEffect(()=>{
        console.log(props.id);
        fetchGameById(props.id);
    }, [props])

    function fetchGameById(id: string) {
        console.log(`fetch game by id: ${id}`);
        fetch(`http://localhost:8080/api/game/${id}`)
            .then(response => response.json())
            .then((g: Game) => {
                setGame(g);
                console.log(g);
            });
    }

    const executeMove = (containerFrom: number, containerTo: number) => {

        console.log(`execute move: from ${containerFrom} to ${containerTo}`);
        fetch(`http://localhost:8080/api/game/move`,
            {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id: game!.id, move: {from: containerFrom, to: containerTo}})
            }
        )
            .then(() => {
                fetchGameById(props.id);
            });
    }


    const resetGame = (id: string) => {
        console.log(`reset game ${id}`);
        fetch(`http://localhost:8080/api/game/reset`,
            {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id: props.id})
            }
        )
            .then(() => {
                fetchGameById(props.id);
            });
    }

    const setClickedContainer = (index: number) => {
        if(containerFrom === -1) {
            setContainerFrom(index);
            return "first";
        }else if(containerFrom === index){
            setContainerFrom(-1);
            return "cancelFirst"
        } else {
            executeMove(containerFrom, index);
            setContainerFrom(-1);
            setRerenderAllContainers(!rerenderAllContainers);
            return "executeMoveSuccess"
        }
    }


    return (
        <div className="gameinfo">
            {game?.playingField &&
                <div>
                    <PlayingFieldComponent key="playingField" playingField={game.playingField}
                                           setClickedContainer={setClickedContainer} rerenderAllContainers={rerenderAllContainers}/>
                    <button onClick={() => resetGame(props.id)}>Reset game</button>
                </div>
            }

        </div>
    )
}