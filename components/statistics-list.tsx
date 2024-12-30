import tw from '@/lib/tailwind';
import { LanguageStore, PaletteStore } from '@/lib/types';
import { hp, wp } from '@/lib/utils';
import { Motion } from '@legendapp/motion';
import { Observable } from '@legendapp/state';
import { For } from '@legendapp/state/react';
import { Easing, Platform, Text, View } from 'react-native';


type StatisticsListProps = {
    statArr$: Observable<() => [string, number][]>;
    total: number;
    language: LanguageStore["language"];
    palette: PaletteStore["palette"];
    w: number;
    h: number;
}

export const StatisticsList = ({ statArr$, total, language, palette, w, h }: StatisticsListProps) => {
    return (
        <For
            each={statArr$}
            item={StatisticsRow as any}
            itemProps={{ total, language, palette, w, h }}
        />
    )
}

type StatisticsRowProps = Omit<StatisticsListProps, 'statArr$'> & {
    id: number;
    item$: StatisticsListProps["statArr$"][0];
}

const StatisticsRow = ({ id, item$, total, language, palette, w, h }: StatisticsRowProps) => {
    const key = item$[0].peek();
    const val = item$[1].peek();
    const barWidth = (val * 100 / total).toFixed(2) + '%';

    const enLabel = key === "1" ? 'shot' : 'shots';
    const ukrLabel = key === "1" ? 'спроба' : +key > 1 && +key < 5 ? 'спроби' : 'спроб';
    const label = language === "en" ? enLabel : ukrLabel;

    return (
        <View style={tw.style(`flex-row justify-between items-center gap-x-1`)}>
            <View style={tw.style(`w-[85px] pl-2 landscape:w-[150px]`)}>
                <Text style={tw.style(`font-caveatSemi text-darkGray text-[${language === "ukr" ? wp(6, w) : wp(6.3, w)}px] landscape:text-[${hp(4.3, h)}px]`)}>{key} {key.length < 3 && label}</Text>
            </View>
            <View style={tw.style(`flex-1 bg-primary-tint h-[${wp(8, w)}px] landscape:h-[${hp(6, h)}px]`, { 'bg-[ivory]': palette === "alternative" }, Platform.select({ web: { height: hp(6, h), width: wp(50, w) } }))}>
                <Motion.View
                    initial={{ width: "0%" }}
                    animate={{ width: barWidth }}
                    transition={{ type: "tween", duration: 700, easing: Easing.elastic(0.6), delay: ++id * 100 }}
                    style={tw.style(`flex-1 bg-primary-darkPrimary`, { 'bg-secondary-tint': palette === "alternative" })}
                />
            </View>
            <View style={tw.style(`w-16 items-center landscape:w-32`)}>
                <Text style={tw.style(`font-ibm text-darkGray text-[${wp(5, w)}px] landscape:text-[${hp(4, h)}px]`)}>{val}</Text>
            </View>
        </View>
    )
}