import {Box, Button, Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {GameCreationData, LevelsOverview} from "../models";
import MiniPlayingField from "./thumbnail/MiniPlayingField";
import {apiServiceCreateNewLevel, apiServiceFetchAllLevels} from "../apiService";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../usermanagement/AuthProvider";


export default function Main() {

    const [levels, setLevels] = useState<LevelsOverview>({finishedLevels: [], newLevels: [], startedLevels: []});

    const {username} = useAuth();

    const nav = useNavigate();

    useEffect(() => {
            if (!username) {
                nav("/login")
            }
        }
        , [username, nav]);

    useEffect(fetchLevels, [])

    function fetchLevels() {
        console.log(`fetch saved games`);
        apiServiceFetchAllLevels()
            .then((levels: LevelsOverview) => {
                setLevels(levels);
                console.log(levels);
            });
    }

    function createNewLevel() {
        const gameCreationData: GameCreationData = {colors: 10, empty: 2, height: 4};
        apiServiceCreateNewLevel(gameCreationData)
            .then(() => fetchLevels())
            .then(() => console.log("new level created"));
    }

    return (
        <div>
            {levels && <>
                {levels.startedLevels.length === 0 && levels.newLevels.length === 0 &&
                    <Box>
                        <Typography>You solved all levels and are now allowed to create a new one for all players!</Typography>
                        <Button onClick={createNewLevel}>create new level</Button>
                    </Box>
                }
                <Typography variant={"h4"}>started levels</Typography>
                <Grid container>
                    {
                        levels.startedLevels.map((g) => <MiniPlayingField key={g.id} game={g}/>)
                    }
                </Grid>
                <Typography variant={"h4"}>new levels</Typography>
                <Grid container>
                    {
                        levels.newLevels.map((g) => <MiniPlayingField key={g.id} game={g}/>)
                    }
                </Grid>
                <Typography variant={"h4"}>finished levels</Typography>
                <Grid container>
                    {
                        levels.finishedLevels.map((g) => <MiniPlayingField key={g.id} game={g}/>)
                    }
                </Grid>
            </>}
        </div>
    )
}
