
export interface Container {
    height: number;
    colorList: string[]
}

export interface Game {
    id: string;
    playingField: Array<Container>;
}

export interface LevelsOverview {
    newLevels: Game[],
    startedLevels: Game[],
    finishedLevels: Game[]
}

export interface Move{
    from: number,
    to: number
}

export interface GameCreationData {
    empty: number,
    colors: number,
    height: number
}

export interface MyError {
    message: string,
    subMessages: string[]
}
