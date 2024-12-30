import { isWeb } from "@/constants";
import tw from "@/lib/tailwind";
import { languageStore$, paletteStore$, switcherStore$ } from "@/store";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { ImageBackground, Text, TouchableOpacity, useWindowDimensions } from "react-native";


export default function Result() {
    const { title } = useLocalSearchParams();
    const language = languageStore$.language.peek();
    const palette = paletteStore$.palette.peek();
    const { height } = useWindowDimensions();


    const onBtnPress = () => {
        switcherStore$.set(prev => prev === "off" ? "on" : "off");
        router.back();
    }

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: title as string,
                }}
            />
            <ImageBackground
                source={require("@/assets/images/rodeo-bull-riding.png")}
                resizeMode="contain"
                style={tw`w-full h-full`}
            >
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onBtnPress}
                    style={tw.style(`absolute bg-primary-darkPrimary left-5 w-[45%] landscape:w-1/3 items-center py-2 border-[3px] border-white rounded-md shadow-sm z-10`, { 'bg-secondary-darkPrimary': palette === "alternative" }, { top: isWeb ? height / 1.4 : height / 1.7 })}
                >
                    <Text style={tw.style('text-[17px] landscape:text-[21px] font-ibmBold text-primary-tint', { 'text-secondary-lightSlateGray': palette === "alternative" })}>{language === "ukr" ? "Грати знову" : "New Game"}</Text>
                </TouchableOpacity>
            </ImageBackground>
        </>
    )
}