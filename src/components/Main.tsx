import { Grid } from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Game} from "../models";
import MiniPlayingField from "./thumbnail/MiniPlayingField";


export default function Main() {

    const [id, setId] = useState<string>("");
    const [savedGames, setSavedGames] = useState<Game[]>();

    useEffect(fetchSavedGames, [])
    const nav = useNavigate();

    function fetchSavedGames() {
        console.log(`fetch saved games`);
        fetch(`http://localhost:8080/api/game`)
            .then(response => response.json())
            .then((games: Game[]) => {
                setSavedGames(games);
                console.log(games);
            });
    }
    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }
    function chooseRandomGame() {
        let rnd = getRandomInt(savedGames!.length);
        savedGames!.map((game, i)=>{
            if(rnd===i){
                setId(game.id);
            }
            return true;
        });
    }

    function submit() {

        nav(`/game/${id}`);
    }

    return (
        <div>
            {/*<button onClick={() => chooseRandomGame()}>Choose random game</button>*/}
            {/*<label htmlFor="id">Game id: </label>*/}
            {/*<input id="id" type="text" value={id}*/}
            {/*       onChange={ev => {*/}
            {/*           setId(ev.target.value)*/}
            {/*           console.log(`set game id to ${ev.target.value}`)*/}
            {/*       }}/>*/}
            {/*<button onClick={() => submit()}>Get game</button>*/}
            <Grid container>
            {
                savedGames?.map((g)=><MiniPlayingField key={g.id} game={g}/>)
            }
            </Grid>
        </div>
    )
}
