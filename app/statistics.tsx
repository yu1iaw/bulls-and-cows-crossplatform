import { MotionEmptyStats } from '@/components/motion-empty-stats';
import { StatisticsList } from '@/components/statistics-list';
import { isWeb } from '@/constants';
import tw from '@/lib/tailwind';
import { hp } from '@/lib/utils';
import { languageStore$, paletteStore$, statisticsStore$ } from "@/store";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Computed, observer, Show, useObservable } from '@legendapp/state/react';
import { Stack } from 'expo-router';
import { useMemo } from 'react';
import { Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Modal from 'react-native-modal';


const Statistics = observer(function Statistics() {
    const statistics = statisticsStore$.get() || {};
    const language = languageStore$.language.peek();
    const palette = paletteStore$.palette.peek();
    const statArr$ = useObservable(() => Object.entries(statistics));
    const isModalVisible$ = useObservable(false);
    const { height: h, width: w } = useWindowDimensions();
    

    const total = useMemo(() => Object.values(statistics).reduce((acc, curr) => acc + curr, 0), []);


    return (
        <>
            <Stack.Screen
                options={{
                    headerRight: ({ tintColor }) => (
                        <TouchableOpacity
                            style={tw`p-[10px] z-50`}
                            onPress={() => isModalVisible$.set(true)}
                        >
                            <MaterialIcons
                                name="cleaning-services"
                                size={29}
                                color={tintColor}
                            />
                        </TouchableOpacity>
                    )
                }}
            />
            <View style={tw.style(`flex-1 pt-5 gap-y-[5px]`, { 'pt-10 pb-1 items-center': isWeb })}>
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
                            <View style={tw`flex-row self-end gap-x-4`}>
                                <TouchableOpacity onPress={() => isModalVisible$.set(false)} style={tw`p-3`}>
                                    <Text style={tw.style(`text-darkGray font-ibm text-[17px]`, { fontSize: isWeb && hp(3.8, h) })}>{language === "en" ? 'No' : 'Скасувати'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        statisticsStore$.delete();
                                        isModalVisible$.set(false);
                                    }}
                                    style={tw`p-3`}
                                >
                                    <Text style={tw.style(`text-darkGray font-ibm text-[17px]`, { fontSize: isWeb && hp(3.8, h) })}>{language === "en" ? 'Yes' : 'Видалити'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                )}
            </Computed>
        </>
    )
})

export default Statistics;