import React from 'react';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import GameComponent from "./components/GameComponent";
import Main from "./components/Main";
import Header from "./components/Header";
import AuthProvider from "./usermanagement/AuthProvider";
import LoginPage from "./usermanagement/LoginPage";
import RegisterPage from "./usermanagement/RegisterPage";

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
                <AuthProvider>
                    <Header/>
                    <Routes>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/" element={<Main/>}/>
                        <Route path="/game/:id" element={<GameComponent/>}/>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    )
        ;
}

export default App;
