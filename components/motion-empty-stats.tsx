import tw from '@/lib/tailwind';
import { LanguageStore } from '@/lib/types';
import { hp, wp } from '@/lib/utils';
import { Motion } from '@legendapp/motion';
import { View } from 'react-native';


type MotionEmptyStatsProps = {
    language: LanguageStore["language"];
    w: number;
    h: number;
}

export const MotionEmptyStats = ({ language, w, h }: MotionEmptyStatsProps) => {
    return (
        <View style={tw`flex-1 flex-center`}>
            <Motion.Text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "tween", duration: 200, delay: 100 }}
                style={tw.style(`text-[${wp(8, w)}px] landscape:text-[${hp(5.5, h)}px] text-darkGray font-caveatSemi`)}
            >
                {language === "en" ? 'Get started from scratch' : 'Колись тут була статистика'}
            </Motion.Text>
        </View>
    )
}