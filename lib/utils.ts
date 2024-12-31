import { GameModeStore, LanguageStore } from "./types";


export function generator(gameMode: GameModeStore["mode"]) {
    let strNum = '';
    let i = 0;

    while (i < 4) {
        let d = Math.floor(Math.random() * 10);

        if (gameMode === "standard" && i === 0 && d === 0) {
            while (d === 0) {
                d = Math.floor(Math.random() * 10);
            }
        }

        while (!strNum.includes(`${d}`)) {
            strNum += d;
            i++;
        }
    }
    
    return strNum;
}

export function guessNumber(inputValue: string, generatedNum: string, language: LanguageStore["language"]) {
    let bulls = 0,
        cows = 0;
    for (let i = 0; i < inputValue.length; i++) {
        if (generatedNum.includes(inputValue[i]) && inputValue[i] === generatedNum[i]) {
            bulls++;
        } else if (generatedNum.includes(inputValue[i])) {
            cows++;
        }
    }
    if (language === "en") {
        return `${bulls} ${bulls !== 1 ? 'bulls' : 'bull'}, ${cows} ${cows !== 1 ? 'cows' : 'cow'}`;
    }

    return `${bulls} ${bulls > 1 ? 'бика' : bulls == 1 ? 'бик' : 'биків'}, ${cows} ${cows > 1 ? 'корови' : cows == 1 ? 'корова' : 'корів'}`;
}

export const hp = (percents: number, height: number) => {
    return percents * height / 100;
}

export const wp = (percents: number, width: number) => {
    return percents * width / 100;
}

export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}