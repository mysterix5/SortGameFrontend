import {useEffect, useState} from "react";
import {Game, Move} from "../models";
import PlayingFieldComponent from "./PlayingFieldComponent";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, Grid, Typography} from "@mui/material";
import {blueGrey} from "@mui/material/colors";
import {apiServiceExecuteMove, apiServiceFetchGameById, apiServiceGetHint, apiServiceResetGame} from "../apiService";

export default function GameComponent() {

    const [game, setGame] = useState<Game>();
    const [containerFrom, setContainerFrom] = useState<number>(-1);
    const [moveHint, setMoveHint] = useState<Move>()

    const [rerenderAllContainers, setRerenderAllContainers] = useState(false);

    const {id} = useParams();
    const nav = useNavigate();

    useEffect(()=>{
        setTimeout(()=>setMoveHint(undefined), 5000);
    }, [moveHint])

    useEffect(() => {
        console.log(id);
        fetchGameById(id!);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    function fetchGameById(id: string) {
        console.log(`fetch game by id: ${id}`);
        apiServiceFetchGameById(id)
            .then((g: Game) => {
                setGame(g);
                console.log(g);
            })
            .catch(() => {
                nav("/");
            });
    }

    const executeMove = (containerFrom: number, containerTo: number) => {

        console.log(`execute move: from ${containerFrom} to ${containerTo}`);
        apiServiceExecuteMove(id!, {from: containerFrom, to: containerTo})
            .then(() => {
                fetchGameById(id!);
            });
    }


    const resetGame = (id: string) => {
        console.log(`reset game ${id}`);
        apiServiceResetGame(id)
            .then(() => {
                fetchGameById(id);
            });
    }

    function getHint() {
        apiServiceGetHint(id!)
            .then(setMoveHint)
    }

    const setClickedContainer = (index: number) => {
        if (containerFrom === -1) {
            setContainerFrom(index);
            return "first";
        } else if (containerFrom === index) {
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
        <Box margin={"15px"} borderRadius={"15px"} sx={{backgroundColor: blueGrey}}>
            {game?.playingField &&
                <Grid container justifyContent={"center"}>
                    <Grid item>
                        <PlayingFieldComponent key="playingField" playingField={game.playingField}
                                               setClickedContainer={setClickedContainer}
                                               rerenderAllContainers={rerenderAllContainers}/>
                    </Grid>
                    <Grid item>
                        <Button variant={"contained"} sx={{margin: 2}} onClick={() => resetGame(id!)}>Reset game</Button>
                    </Grid>
                    <Grid item>
                        <Button variant={"contained"} sx={{margin: 2}} onClick={() => getHint()}>get Hint</Button>
                    </Grid>
                    <Grid item>
                        {
                            moveHint &&
                            <Typography>
                                `${moveHint.from} ${moveHint.to}`
                            </Typography>
                        }
                    </Grid>
                </Grid>
            }

        </Box>
    )
}