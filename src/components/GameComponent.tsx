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

    //
    //
    // fetch('http://localhost:8080/api/kanban', {
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({task: task, description: description, status: status, id: props.editId}),
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('Success:', data);
    //         props.fetchAll();
    //         props.setEditMode("view");// TODO bessere Möglichkeit
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });

    const setClickedContainer = (index: number) => {
        if(containerFrom === -1) {
            setContainerFrom(index);
        }else if(containerFrom === index){
            setContainerFrom(-1);
        } else {
            executeMove(containerFrom, index);
            setContainerFrom(-1);
        }
    }


    return (
        <div className="gameinfo">
            {game?.playingField &&
                <div>
                    <PlayingFieldComponent key="playingField" playingField={game.playingField}
                                           setClickedContainer={setClickedContainer}/>
                    <button onClick={() => resetGame(props.id)}>Reset game</button>
                </div>
            }

        </div>
    )
}