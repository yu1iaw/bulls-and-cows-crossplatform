import { MotionEmptyStats } from '@/components/motion-empty-stats';
import { StatisticsHeader } from '@/components/statistics-header';
import { StatisticsList } from '@/components/statistics-list';
import { isWeb } from '@/constants';
import tw from '@/lib/tailwind';
import { hp } from '@/lib/utils';
import { languageStore$, paletteStore$, statisticsFStore$, statisticsNStore$ } from "@/store";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Computed, observer, Show, useObservable } from '@legendapp/state/react';
import { useMemo } from 'react';
import { Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Modal from 'react-native-modal';



const Normal = observer(function Statistics() {    
    const statistics = statisticsNStore$.get() || {};
    const language = languageStore$.language.peek();
    const palette = paletteStore$.palette.peek();
    const statArr$ = useObservable(() => Object.entries(statistics));
    const isModalVisible$ = useObservable(false);
    const { height: h, width: w } = useWindowDimensions();

    const total = useMemo(() => Object.values(statistics).reduce((acc, curr) => acc + curr, 0), []);


    return (
        <>
            <StatisticsHeader isModalVisible$={isModalVisible$} />
            
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
            <Computed>
                {() => (
                    <Modal
                        isVisible={isModalVisible$.get()}
                        onBackdropPress={() => isModalVisible$.set(false)}
                        backdropColor="dimgray"
                        supportedOrientations={["landscape", "portrait"]}
                    >
                        <View style={tw`bg-rose-50 p-4 gap-y-4 items-center`}>
                            <Ionicons name="warning-outline" size={26} color="orangered" />
                            <Text style={tw.style(`font-caveatSemi text-darkGray text-center text-[${hp(4, h)}px] landscape:text-4xl`, { fontSize: isWeb && hp(5.5, h) })}>
                                {language === "en"
                                    ? 'Clean up statistics? '
                                    : 'Видалити статистику? '}
                            </Text>
                            <View style={tw`flex-row justify-between items-center gap-x-3 landscape:w-full`}>
                                <TouchableOpacity onPress={() => isModalVisible$.set(false)} style={tw`p-3`}>
                                    <Text style={tw.style(`text-gray-500 font-ibm text-base landscape:text-[22px]`, { fontSize: isWeb && hp(3.8, h) })}>{language === "en" ? 'Cancel' : 'Скасувати'}</Text>
                                </TouchableOpacity>
                                <View style={tw`flex-row gap-x-[10px] landscape:gap-x-8`}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            statisticsNStore$.delete();
                                            isModalVisible$.set(false);
                                        }}
                                        style={tw`p-3`}
                                    >
                                        <Text style={tw.style(`text-darkGray font-ibm text-base landscape:text-[22px]`, { fontSize: isWeb && hp(4, h) })}>{language === "en" ? 'Normal' : 'Безліміт'}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            statisticsFStore$.delete();
                                            isModalVisible$.set(false);
                                        }}
                                        style={tw`p-3`}
                                    >
                                        <Text style={tw.style(`text-darkGray font-ibm text-base landscape:text-[22px]`, { fontSize: isWeb && hp(4, h) })}>{language === "en" ? 'Forced' : 'Ліміт'}</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </Modal>
                )}
            </Computed>
        </>
    )
})

export default Normal;
