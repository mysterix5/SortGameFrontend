import {useNavigate} from "react-router-dom";
import {Button, Grid, Typography} from "@mui/material";
import React from "react";


export default function Header() {
    const nav = useNavigate();
    return (
        <Grid container justifyContent={"center"}>
            <Grid item>
                <Button onClick={() => nav("/")}>
                    <Typography variant={"h3"}>Chicken Sort</Typography>
                </Button>
            </Grid>
        </Grid>
    )
}