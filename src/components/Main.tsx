import {useEffect, useState} from "react";
import {Game} from "../models";
import GameComponent from "./GameComponent";
import "./GamesOverview.css"


export default function Main() {

    const [id, setId] = useState<string>("");
    const [submitId, setSubmitId] = useState<string>();
    const [savedGames, setSavedGames] = useState<string[]>();

    useEffect(fetchSavedGames, [])

    function fetchSavedGames() {
        console.log(`fetch saved games`);
        fetch(`http://localhost:8080/api/game`)
            .then(response => response.json())
            .then((games: string[]) => {
                setSavedGames(games);
                console.log(games);
            });
    }
    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }
    function chooseRandomGame() {
        let rnd = getRandomInt(savedGames!.length);
        savedGames!.map((id, i)=>{
            if(rnd===i){
                setId(id);
            }
        })
    }

    return (
        <div className="mainview">
            <button onClick={() => chooseRandomGame()}>Choose random game</button>
            <label htmlFor="id">Game id: </label>
            <input id="id" type="text" value={id}
                   onChange={ev => {
                       setId(ev.target.value)
                       console.log(`set game id to ${ev.target.value}`)
                   }}/>
            <button onClick={() => setSubmitId(id)}>Get game</button>
            {
                submitId &&
                <GameComponent key={"thegame"} id={submitId}/>
            }
        </div>
    )
}
