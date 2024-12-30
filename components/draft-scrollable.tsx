import { numsArr } from '@/constants';
import tw from '@/lib/tailwind';
import { PaletteStore } from '@/lib/types';
import { hp, wp } from '@/lib/utils';
import { useState } from 'react';
import { LayoutChangeEvent, ScrollView, Text, View } from 'react-native';


const nums = numsArr.slice(1, 5);

type DraftScrollableProps = {
    palette: PaletteStore["palette"];
    w: number;
    h: number;
}

export const DraftScrollable = ({ palette, w, h }: DraftScrollableProps) => {
    const [height, setHeight] = useState(0);

    const onLayout = (e: LayoutChangeEvent) => {
        setHeight(e.nativeEvent.layout.height);
    }

    return (
        <View
            onLayout={onLayout}
            style={tw.style(`flex-1 bg-primary-darkPrimary`, {'bg-secondary-tint': palette === "alternative"} )}
        >
            <View style={tw`flex-row`}>
                {nums.map(item => (
                    <View key={item} style={tw`flex-1`}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            decelerationRate="fast"
                            snapToAlignment="start"
                            snapToInterval={height}
                        >
                            {numsArr.map(i => (
                                <View key={i} style={tw.style(`flex-center`, { height })}>
                                    <Text style={tw`text-primary-tint font-bold text-[${wp(15, w)}px] landscape:text-[${hp(12, h)}px]`}>{i}</Text>
                                </View>
                            ))}
                        </ScrollView>
                        {item > 1 && (
                            <View
                                style={tw.style(`absolute w-2 h-2 rounded-full border border-primary-tint`, { top: height / 2 - 4 })}
                            />
                        )}
                    </View>
                ))}
            </View>
        </View>

    )
}