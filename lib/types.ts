export type Attempt = {
    id: number;
    value: string;
    result: string;
}

export type LanguageStore = {
    language: "ukr" | "en";
}

export type GameModeStore = {
    mode: "standard" | "advanced";
}

export type PaletteStore = {
    palette: "default" | "alternative";
}

export type SpeedLevelStore = {
    level: "normal" | "forced";
}

export type StatisticsStore = {
    [key: string]: number;
}

export type SwitcherStore = "on" | "off";

