import axios, {AxiosResponse} from "axios";
import {Game, Move} from "./models";


export function apiServiceFetchAllGames() {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/game`)
        .then((r: AxiosResponse<Game[]>)  => r.data);
}

export function apiServiceFetchGameById(id: string) {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/game/${id}`)
        .then((r: AxiosResponse<Game>)  => r.data);
}

export function apiServiceExecuteMove(id: string, move: Move) {
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/game/${id}/move`, move)
        .then((r: AxiosResponse<Game>)  => r.data);
}

export function apiServiceResetGame(id: string) {
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/game/${id}/reset`);
}

export function apiServiceGetHint(id: string) {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/game/${id}/hint`)
        .then((r: AxiosResponse<Move>)  => r.data);
}
