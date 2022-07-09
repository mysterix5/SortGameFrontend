
export interface Container {
    height: number;
    colorList: string[]
}

export interface Game {
    id: string;
    playingField: Array<Container>;
}

export interface Move{
    from: number,
    to: number
}
