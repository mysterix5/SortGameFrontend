import React from 'react';
import './App.css';
import SavedGamesOverview from "./components/Main";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";

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
                <Routes>
                    <Route path="/" element={<SavedGamesOverview/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
        ;
}

export default App;
