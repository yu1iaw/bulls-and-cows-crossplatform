import { GameModeStore, LanguageStore, PaletteStore, SpeedLevelStore, StatisticsStore, SwitcherStore } from "@/lib/types";
import { observable } from "@legendapp/state";
import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv';
import { configureSynced, synced } from "@legendapp/state/sync";


const langSynced = configureSynced(synced, {
    persist: {
        plugin: ObservablePersistMMKV,
        name: "language",
    },
})

const levelSynced = configureSynced(synced, {
    persist: {
        plugin: ObservablePersistMMKV,
        name: "level"
    }
})

const speedSynced = configureSynced(synced, {
    persist: {
        plugin: ObservablePersistMMKV,
        name: "speed"
    }
})

const paletteSynced = configureSynced(synced, {
    persist: {
        plugin: ObservablePersistMMKV,
        name: "palette"
    }
})

export const switcherStore$ = observable<SwitcherStore>("off");

export const languageStore$ = observable<LanguageStore>({
    language: langSynced({
        initial: "ukr",
    })
})

export const gameModeStore$ = observable<GameModeStore>({
    mode: levelSynced({
        initial: "standard"
    })
})

export const speedLevelStore$ = observable<SpeedLevelStore>({
    level: speedSynced({
        initial: "normal"
    })
})

export const paletteStore$ = observable<PaletteStore>({
    palette: paletteSynced({
        initial: "default"
    })
})

export const statisticsStore$ = observable<StatisticsStore>(synced({
    persist: {
        plugin: ObservablePersistMMKV,
        name: "statistics",
    },
    initial: {}
}));


// syncObservable(languageStore$, {
//     persist: {
//         name: 'lang',
//         plugin: ObservablePersistMMKV,
//         retrySync: true
//     }
// })


