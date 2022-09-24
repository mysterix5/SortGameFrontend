import axios, {AxiosResponse} from "axios";
import {Game, GameCreationData, LevelsOverview, Move} from "./models";
import {LoginDTO, LoginResponse, RegisterDTO} from "./usermanagement/AuthModels";


function createHeaders() {
    return {
        headers: {Authorization: `Bearer ${localStorage.getItem('jwt')}`}
    }
}

export function apiServiceCreateNewLevel(gameCreationData: GameCreationData) {
    return axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/game/create`,
        gameCreationData,
        createHeaders()
    )
}
//
// export function apiServiceDeleteAllLevels() {
//     return axios.delete(
//         `${process.env.REACT_APP_BACKEND_URL}/api/game/deleteall`,
//         createHeaders()
//     )
// }

export function apiServiceFetchAllLevels() {
    return axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/game/getall`,
        createHeaders()
    )
        .then((r: AxiosResponse<LevelsOverview>) => r.data);
}

export function apiServiceFetchGameById(id: string) {
    return axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/game/${id}`,
        createHeaders()
    )
        .then((r: AxiosResponse<Game>) => r.data);
}

export function apiServiceExecuteMove(id: string, move: Move) {
    return axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/game/${id}/move`,
        move,
        createHeaders()
    )
        .then((r: AxiosResponse<Game>) => r.data);
}

export function apiServiceResetGame(id: string) {
    return axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/game/${id}/reset`,
        null,
        createHeaders()
    );
}

export function apiServiceGetHint(id: string) {
    return axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/game/${id}/hint`,
        createHeaders()
    )
        .then((r: AxiosResponse<Move>) => r.data);
}

export function sendRegister(user: RegisterDTO) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/auth/register`;
    console.log(`post: ${url}: user=${user}`);
    return axios.post(url, user)
        .then(r => r.data);
}

export function sendLogin(user: LoginDTO) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`;
    console.log(`post: ${url}: user=${user.username}`);
    return axios.post(url, user)
        .then((response: AxiosResponse<LoginResponse>) => response.data)
}


