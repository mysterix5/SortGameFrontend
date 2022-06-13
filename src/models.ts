
export interface Container {
    height: number;
    colorList: string[]
}

export interface Game {
    id: string;
    playingField: Array<Container>;
}