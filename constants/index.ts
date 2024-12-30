import { Platform } from "react-native";

export default {
    primary: {
        darkPrimary: "#d2691e",
        darkSecondary: "#ffdab9",
        tint: "floralwhite",
        sandyBrown: "#f4a460"
    },
    secondary: {
        darkPrimary: "#c6d8d3",
        darkSecondary: "#f5f5dc",
        tint: "#568e8f",
        lightSlateGray: "#778899"
    },
    danger: "#992b00",
    darkGray: "#030712"
} as const;

export const numsArr = Array.from({ length: 10 }, (_, i) => i);

export const isWeb = Platform.OS === "web";