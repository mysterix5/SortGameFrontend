import { Grid } from "@mui/material";
import {useEffect, useState} from "react";
import {Game} from "../models";
import MiniPlayingField from "./thumbnail/MiniPlayingField";
import {apiServiceFetchAllGames} from "../apiService";


export default function Main() {

    const [savedGames, setSavedGames] = useState<Game[]>();

    useEffect(fetchSavedGames, [])

    function fetchSavedGames() {
        console.log(`fetch saved games`);
        apiServiceFetchAllGames()
            .then((games: Game[]) => {
                setSavedGames(games);
                console.log(games);
            });
    }
    return (
        <div>
            <Grid container>
            {
                savedGames?.map((g)=><MiniPlayingField key={g.id} game={g}/>)
            }
            </Grid>
        </div>
    )
}
