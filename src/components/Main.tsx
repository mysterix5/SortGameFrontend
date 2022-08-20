import { Grid } from "@mui/material";
import {useEffect, useState} from "react";
import {Game} from "../models";
import MiniPlayingField from "./thumbnail/MiniPlayingField";
import {apiServiceFetchAllGames} from "../apiService";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../usermanagement/AuthProvider";


export default function Main() {

    const [savedGames, setSavedGames] = useState<Game[]>();

    const {username} = useAuth();

    const nav = useNavigate();

    useEffect(() => {
            if (!username) {
                nav("/login")
            }
        }
        , [username, nav]);

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
