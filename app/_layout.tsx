import { AnimatedSplash } from '@/components/animated-splash';
import colors from '@/constants';
import tw from "@/lib/tailwind";
import { languageStore$, paletteStore$ } from "@/store";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { observer } from "@legendapp/state/react";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useDeviceContext } from 'twrnc';



export default function RootLayout() {
    const [animationLoopEnded, setAnimationLoopEnded] = useState(false);
    const [loaded] = useFonts({
        IBM: require("../assets/fonts/IBMPlexMono-Regular.ttf"),
        IBM_bold: require("../assets/fonts/IBMPlexMono-Bold.ttf"),
        playfair: require("../assets/fonts/PlayfairDisplay-Medium.ttf"),
        caveat_semi: require("../assets/fonts/Caveat-SemiBold.ttf"),
    });


    return loaded && animationLoopEnded
        ? <RootLayoutNav />
        : <AnimatedSplash setAnimationLoopEnded={setAnimationLoopEnded} />
}


const RootLayoutNav = observer(function RootLayoutNav() {
    const palette = paletteStore$.palette.get();
    const language = languageStore$.language.get();
    useDeviceContext(tw);

    return (
        <>
            <StatusBar backgroundColor={palette === "default" ? colors.primary.darkPrimary : colors.secondary.darkPrimary} />
            <Stack
                screenOptions={{
                    headerStyle: { backgroundColor: palette === "default" ? colors.primary.darkPrimary : colors.secondary.darkPrimary },
                    contentStyle: { backgroundColor: palette === "default" ? colors.primary.darkSecondary : colors.secondary.darkSecondary },
                    headerTintColor: palette === "default" ? colors.primary.tint : colors.secondary.tint,
                    headerTitleAlign: "center",
                }}>
                <Stack.Screen
                    name="result"
                    options={{
                        headerTitleStyle: {
                            fontFamily: "IBM_bold",
                            fontSize: 35,
                        },
                        headerLeft: ({ tintColor }) => (
                            <TouchableOpacity
                                style={tw`p-[10px] z-50`}
                                onPress={router.back}
                            >
                                <FontAwesome
                                    name="mail-reply"
                                    size={24}
                                    color={tintColor}
                                />
                            </TouchableOpacity>
                        ),
                        headerRight: ({ tintColor }) => (
                            <TouchableOpacity
                                style={tw`p-[10px] z-50`}
                                onPress={() => router.navigate('/statistics')}
                            >
                                <Ionicons
                                    name="stats-chart-sharp"
                                    size={24}
                                    color={tintColor}
                                />
                            </TouchableOpacity>
                        )
                    }}
                />
                <Stack.Screen
                    name="settings"
                    options={{
                        headerTitle: language === "ukr" ? "Налаштування" : "Settings",
                        headerTitleStyle: { fontFamily: "IBM_bold", fontSize: 27 },
                        headerLeft: ({ tintColor }) => (
                            <TouchableOpacity
                                style={tw`p-[10px] z-50`}
                                onPress={router.back}
                            >
                                <FontAwesome
                                    name="mail-reply"
                                    size={24}
                                    color={tintColor}
                                />
                            </TouchableOpacity>
                        )
                    }}
                />
                <Stack.Screen
                    name="statistics"
                    options={{
                        headerTitle: language === "ukr" ? "Статистика" : "Statistics",
                        headerTitleStyle: { fontFamily: "IBM_bold", fontSize: 30 },
                        headerLeft: ({ tintColor }) => (
                            <TouchableOpacity
                                style={tw`p-[10px] z-50`}
                                onPress={router.dismissAll}
                            >
                                <FontAwesome
                                    name="fort-awesome"
                                    size={27}
                                    color={tintColor}
                                />
                            </TouchableOpacity>
                        ),
                    }}
                />
            </Stack>
        </>
    );
})

