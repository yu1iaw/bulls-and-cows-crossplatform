import { isWeb, numsArr } from '@/constants';
import tw from '@/lib/tailwind';
import { LanguageStore } from '@/lib/types';
import { hp, wp } from '@/lib/utils';
import { observer, Show, useObservable } from '@legendapp/state/react';
import { Image, Text, TouchableOpacity, View } from 'react-native';


type DraftRowProps = {
    language: LanguageStore["language"];
    w: number;
    h: number;
}

export const DraftRow = ({ w, h, language }: DraftRowProps) => {
    return (
        <>
            <View style={tw.style(`flex-row landscape:justify-center`)}>
                {numsArr.map(i => <NumItem key={i} item={i} w={w} h={h} />)}
            </View>
            <View style={tw`mx-2 mb-1 landscape:-mt-4`}>
                <Text style={tw`text-[11px] text-gray-600`}>
                    *{language === "en" ? 'tap - cross out a digit' : 'тап - викреслити цифру'}
                </Text>
                <Text style={tw`text-[11px] text-gray-600`}>
                    *{language === "en" ? 'long tap - choose a digit' : 'довгий тап - обрати цифру'}
                </Text>
                <Text style={tw.style(`text-[11px] text-gray-600 landscape:hidden`, { 'hidden': h < 600 })}>
                    *{language === "en" ? 'code lock to break the number' : 'кодовий замок для злому числа'} &#8595;
                </Text>
            </View>
        </>
    )
}


type NumItemProps = Omit<DraftRowProps, 'language'> & {
    item: number;
}

const NumItem = observer(({ item, w, h }: NumItemProps) => {
    const showRing$ = useObservable(false);
    const showCross$ = useObservable(false);


    const onPress = () => {
        showCross$.toggle();
        showRing$.set(false);
    }

    const onLongPress = () => {
        showRing$.toggle();
        showCross$.set(false);
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={tw.style(`flex-center w-[${wp(100, w) / 10}px] landscape:w-[${isWeb ? 1000 / 10 : wp(70, w) / 10}px]`)}
            delayLongPress={300}
        >
            <Text style={tw.style(`font-ibm text-[38px] leading-[45px] landscape:text-[60px] landscape:leading-[74px] text-darkGray`, { fontSize: isWeb && hp(9, h) })}>{item}</Text>
            <Show if={showRing$.get()}>
                <Image
                    source={require('@/assets/images/available.png')}
                    style={tw`w-full h-full absolute`}
                />
            </Show>
            <Show if={showCross$.get()}>
                <Image
                    source={require('@/assets/images/close.png')}
                    style={tw`w-full h-full absolute`}
                    tintColor="orangered"
                />
            </Show>
        </TouchableOpacity>
    )
})