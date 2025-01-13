import { MotionEmptyStats } from '@/components/motion-empty-stats';
import { StatisticsList } from '@/components/statistics-list';
import { isWeb } from '@/constants';
import tw from '@/lib/tailwind';
import { languageStore$, paletteStore$, statisticsFStore$ } from "@/store";
import { observer, Show, useObservable } from '@legendapp/state/react';
import { useMemo } from 'react';
import { useWindowDimensions, View } from 'react-native';



const Forced = observer(function Statistics() {    
    const statistics = statisticsFStore$.get() || {};
    const language = languageStore$.language.peek();
    const palette = paletteStore$.palette.peek();
    const statArr$ = useObservable(() => Object.entries(statistics));
    const { height: h, width: w } = useWindowDimensions();

    const total = useMemo(() => Object.values(statistics).reduce((acc, curr) => acc + curr, 0), []);

    
    return (
        <View style={tw.style(`flex-1 pt-5 gap-y-[5px] landscape:pt-10`, { 'pb-1 items-center': isWeb })}>
            <Show
                if={Object.keys(statistics).length}
                else={<MotionEmptyStats language={language} w={w} h={h} />}
            >
                <StatisticsList
                    statArr$={statArr$}
                    total={total}
                    language={language}
                    palette={palette}
                    w={w}
                    h={h}
                />
            </Show>
        </View>
    )
})

export default Forced;

