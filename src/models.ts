
export interface GameInfo {
    id: string;
    totalContainers: number;
    colors: number;
    playingField: Array<Container>;
}

export interface Container {
    colorList: string[]
}