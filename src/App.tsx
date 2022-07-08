import React from 'react';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import GameComponent from "./components/GameComponent";
import Main from "./components/Main";
import Header from "./components/Header";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/game/:id" element={<GameComponent/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
        ;
}

export default App;
