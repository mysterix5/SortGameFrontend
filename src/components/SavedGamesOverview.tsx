import {useEffect, useState} from "react";
import {GameInfo} from "../models";
import GameInfoComponent from "./GameInfoComponent";
import "./GamesOverview.css"


export default function SavedGamesOverview() {

    const [savedGames, setSavedGames] = useState<GameInfo[]>([]);

    useEffect(fetchSavedGames, [])

    function fetchSavedGames() {
        console.log(`fetch saved games`);
        fetch(`http://localhost:8080/api/game`)
            .then(response => response.json())
            .then((games: GameInfo[]) => {
                setSavedGames(games);
                console.log(games);
            });
    }

    return (
        <div className="gamesview">
            {
                savedGames.map(g => <GameInfoComponent key={g.id} gameInfo={g}/>)
            }
        </div>
    )
}