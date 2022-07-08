import MiniContainer from "./MiniContainer";
import {Container, Game} from "../../models";
import {Box, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface PlayingFieldComponentProps {
    game: Game
}

export default function MiniPlayingField(props: PlayingFieldComponentProps) {
    const nav = useNavigate();
    return (
        <Grid item onClick={()=>nav(`/game/${props.game.id}`)}>
            <Box margin={1} maxWidth={"150px"} display={"flex"} flexDirection={"row"} border={"5px indigo solid"}>
                {
                    props.game.playingField.map((c: Container, i: number) => <MiniContainer key={i} container={c}/>)
                }
            </Box>
        </Grid>
    )
}