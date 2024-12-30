import { isWeb } from '@/constants';
import tw from '@/lib/tailwind';
import { Attempt, LanguageStore, PaletteStore } from '@/lib/types';
import { hp, wp } from '@/lib/utils';
import { Motion } from '@legendapp/motion';
import { Observable } from '@legendapp/state';
import { For } from '@legendapp/state/react';
import { Text, View } from 'react-native';


type MotionListProps = {
    attempts$: Observable<Attempt[]>;
    language: LanguageStore["language"];
    palette: PaletteStore["palette"];
    w: number;
    h: number;
}

export const MotionList = ({ attempts$, language, palette, w, h }: MotionListProps) => {
    return (
        <For each={attempts$} item={Row} itemProps={{ language, palette, w, h }} />
    )
}

type RowProps = Omit<MotionListProps, 'attempts$'> & {
    item$: MotionListProps["attempts$"][0];
}

const Row = ({ item$, language, palette, w, h }: RowProps) => {
    const id = item$.id.peek();
    const result = item$.result.peek();
    const value = item$.value.peek();

    return (
        <Motion.View
            initial={{ rotateX: "90deg" }}
            animate={{ rotateX: "0deg" }}
            transition={{ type: "tween", duration: 250, delay: 200, ease: "circIn" }}
        >
            <View style={tw.style(`h-[${wp(15, w)}px] landscape:h-[${hp(8, h)}px] bg-[#ba9673] justify-center pl-2 rounded shadow android:landscape:self-center ios:landscape:self-center android:landscape:w-3/4 ios:landscape:w-3/4 landscape:pl-[${isWeb ? 0 : w * 75 / 100 / 5}]`, { 'bg-[#83b3a7]': palette === "alternative" }, { 'items-center': isWeb }, { height: isWeb && hp(9, h) })}>
                <Text style={tw.style(`text-darkGray landscape:text-[${hp(4, h)}px] text-[${language === "en" ? wp(5.5, w) : wp(5, w)}px]`)}>
                    {language === "en" ? "Attempt" : "Спроба"} {id} &#9658;{" "}
                    <Text style={tw.style(`font-ibm text-primary-tint text-[${language === "en" ? wp(6.5, w) : wp(6, w)}px] landscape:text-[${hp(5, h)}px]`,)}>{value}</Text> &#9658;<Text> {result}</Text>
                </Text>
            </View>
        </Motion.View>
    )
}