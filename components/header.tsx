import colors from '@/constants';
import tw from '@/lib/tailwind';
import { LanguageStore, PaletteStore } from '@/lib/types';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router, Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';


type HeaderProps = {
    gameTracking: { seekingValue: string; finished: boolean };
    noAttempts: boolean;
    timeIntervalTitle: string;
    language: LanguageStore["language"];
    palette: PaletteStore["palette"];
}

export const Header = ({ gameTracking, noAttempts, timeIntervalTitle, language, palette }: HeaderProps) => {
    const applyHeaderTitleColor = !timeIntervalTitle.includes("min") && !timeIntervalTitle.includes("хв") && +timeIntervalTitle.slice(-3, -1) <= 15;

    return (
        <Stack.Screen
            options={{
                headerTitle: timeIntervalTitle || (language === "ukr" ? "Бики і Корови" : "Bulls | Cows"),
                headerTitleStyle: { fontFamily: "IBM_bold", fontSize: 27, color: timeIntervalTitle && applyHeaderTitleColor ? colors.danger : palette === "default" ? colors.primary.tint : colors.secondary.tint },
                headerRight: ({ tintColor }) => (
                    <TouchableOpacity
                        style={tw`p-[10px] z-50`}
                        onPress={() => {
                            !gameTracking.finished
                                ? router.navigate({ pathname: "/settings", params: { settings: noAttempts ? "on" : "off" } })
                                : router.navigate({ pathname: "/result", params: { title: gameTracking.seekingValue } })
                        }}
                    >
                        {!gameTracking.finished ? (
                            <FontAwesome
                                name="gears"
                                size={25}
                                color={tintColor}
                            />
                        ) : (
                            <FontAwesome
                                name="mail-forward"
                                size={24}
                                color={tintColor}
                            />
                        )}
                    </TouchableOpacity>
                )
            }}
        />
    )
}